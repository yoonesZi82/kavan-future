"use client"

import { useEffect } from "react"
import { useQueryClient, type QueryClient } from "@tanstack/react-query"
import {
  BITYCLE_MARKETS,
  chartTimeframeToBitycle,
  getBitycleMarket,
} from "@/features/market-pulse/bitycle-markets"
import {
  candleFromTuple,
  isMdMessage,
  isMpMessage,
  mergeLiveCandle,
} from "@/features/market-pulse/bitycle-live-parse"
import type { CandlePoint, ChartTimeframe, MarketPair } from "@/features/market-pulse/types"
import { queryKeys } from "@/lib/api/query-keys"

const WS_URL = "wss://streamer.bitycle.com/ws/market_data"

type SharedSocket = {
  socket: WebSocket
  subscribers: number
  chartKey: string | null
}

let shared: SharedSocket | null = null
let activeQueryClient: QueryClient | null = null

function sendJson(socket: WebSocket, payload: unknown): void {
  if (socket.readyState !== WebSocket.OPEN) return
  socket.send(JSON.stringify(payload))
}

function subscribeMarketPrices(socket: WebSocket): void {
  for (const market of BITYCLE_MARKETS) {
    sendJson(socket, {
      message_type: "subscribe_mp",
      data: { source: market.liveSource, market: market.ohlcSymbol },
    })
  }
}

function subscribeChartMd(
  socket: WebSocket,
  ohlcSymbol: string,
  timeframe: ChartTimeframe
): void {
  const config = getBitycleMarket(ohlcSymbol)
  if (!config) return
  sendJson(socket, {
    message_type: "subscribe_md",
    data: {
      market: config.ohlcSymbol,
      tf: chartTimeframeToBitycle(timeframe),
      source: config.liveSource,
    },
  })
}

function applyPrice(symbol: string, price: number): void {
  if (!activeQueryClient) return
  activeQueryClient.setQueryData<MarketPair[]>(
    queryKeys.marketPulse.markets(),
    (current) => {
      if (!current?.length) return current
      return current.map((market) => {
        if (market.ohlcSymbol !== symbol) return market
        return {
          ...market,
          latest: price,
          dayClose: price,
          bestBuy: price,
          bestSell: price,
        }
      })
    }
  )
}

function applyCandle(
  symbol: string,
  tf: string,
  candle: CandlePoint
): void {
  if (!activeQueryClient) return
  const config = getBitycleMarket(symbol)
  if (!config) return
  for (const chartTf of [
    "1m",
    "5m",
    "15m",
    "1h",
    "4h",
    "1D",
    "1W",
    "All",
  ] as ChartTimeframe[]) {
    if (chartTimeframeToBitycle(chartTf) !== tf) continue
    activeQueryClient.setQueryData<CandlePoint[]>(
      queryKeys.marketPulse.chart(config.ohlcSymbol, chartTf),
      (current) => {
        if (!current?.length) return current
        return mergeLiveCandle(current, candle)
      }
    )
  }
}

function handleMessage(raw: string): void {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return
  }
  if (isMpMessage(parsed)) {
    applyPrice(parsed.d.s, parsed.d.p)
    return
  }
  if (isMdMessage(parsed)) {
    applyCandle(parsed.d.s, parsed.d.t, candleFromTuple(parsed.d.c))
  }
}

function retainSocket(chart?: {
  ohlcSymbol: string
  timeframe: ChartTimeframe
}): void {
  const chartKey = chart
    ? `${chart.ohlcSymbol}:${chart.timeframe}`
    : null
  if (shared) {
    shared.subscribers += 1
    if (chart && shared.chartKey !== chartKey && shared.socket.readyState === WebSocket.OPEN) {
      subscribeChartMd(shared.socket, chart.ohlcSymbol, chart.timeframe)
      shared.chartKey = chartKey
    }
    return
  }
  const socket = new WebSocket(WS_URL)
  socket.addEventListener("open", () => {
    subscribeMarketPrices(socket)
    if (chart) subscribeChartMd(socket, chart.ohlcSymbol, chart.timeframe)
  })
  socket.addEventListener("message", (event) => {
    if (typeof event.data === "string") handleMessage(event.data)
  })
  shared = { socket, subscribers: 1, chartKey }
}

function releaseSocket(): void {
  if (!shared) return
  shared.subscribers -= 1
  if (shared.subscribers > 0) return
  shared.socket.close()
  shared = null
}

/** Live Bitycle market_data WS: mp for list prices, md for active chart. */
export function useBitycleLive(chart?: {
  ohlcSymbol: string | null
  timeframe: ChartTimeframe
}): void {
  const queryClient = useQueryClient()
  const ohlcSymbol = chart?.ohlcSymbol ?? null
  const timeframe = chart?.timeframe ?? "1D"

  useEffect(() => {
    activeQueryClient = queryClient
    const active =
      ohlcSymbol && getBitycleMarket(ohlcSymbol)
        ? { ohlcSymbol, timeframe }
        : undefined
    retainSocket(active)
    return () => {
      releaseSocket()
      if (!shared) activeQueryClient = null
    }
  }, [queryClient, ohlcSymbol, timeframe])
}

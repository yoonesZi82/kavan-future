"use client"

import { useEffect, useRef } from "react"
import {
  candleFromTuple,
  isMdMessage,
  isMpMessage,
} from "./bitycle-live-parse"
import {
  getMarketingMarket,
  MARKETING_MARKETS,
  resolveMarketingLiveSource,
  resolveMarketingTimeframe,
} from "./marketing-markets"
import type { CandlePoint, ChartTimeframe } from "./types"

const WS_URL = "wss://streamer.bitycle.com/ws/market_data"

type UseMarketingLiveArgs = {
  enabled: boolean
  ohlcSymbol: string | null
  timeframe: ChartTimeframe
  onPrice: (symbol: string, price: number) => void
  onCandle: (symbol: string, tf: string, candle: CandlePoint) => void
}

function sendJson(socket: WebSocket, payload: unknown): void {
  if (socket.readyState !== WebSocket.OPEN) return
  socket.send(JSON.stringify(payload))
}

/** Bitycle WS for marketing chart — mp prices + md candles for active symbol. */
export function useMarketingLive({
  enabled,
  ohlcSymbol,
  timeframe,
  onPrice,
  onCandle,
}: UseMarketingLiveArgs): void {
  const onPriceRef = useRef(onPrice)
  const onCandleRef = useRef(onCandle)
  onPriceRef.current = onPrice
  onCandleRef.current = onCandle

  useEffect(() => {
    if (!enabled) return
    const socket = new WebSocket(WS_URL)
    const chartKey = ohlcSymbol ? `${ohlcSymbol}:${timeframe}` : null

    socket.addEventListener("open", () => {
      for (const market of MARKETING_MARKETS) {
        sendJson(socket, {
          message_type: "subscribe_mp",
          data: {
            source: resolveMarketingLiveSource(market),
            market: market.ohlcSymbol,
          },
        })
      }
      if (!ohlcSymbol) return
      const config = getMarketingMarket(ohlcSymbol)
      if (!config) return
      sendJson(socket, {
        message_type: "subscribe_md",
        data: {
          market: config.ohlcSymbol,
          tf: resolveMarketingTimeframe(config, timeframe),
          source: resolveMarketingLiveSource(config),
        },
      })
    })

    socket.addEventListener("message", (event) => {
      if (typeof event.data !== "string") return
      let parsed: unknown
      try {
        parsed = JSON.parse(event.data)
      } catch {
        return
      }
      if (isMpMessage(parsed)) {
        onPriceRef.current(parsed.d.s, parsed.d.p)
        return
      }
      if (isMdMessage(parsed)) {
        onCandleRef.current(
          parsed.d.s,
          parsed.d.t,
          candleFromTuple(parsed.d.c)
        )
      }
    })

    return () => {
      socket.close()
      void chartKey
    }
  }, [enabled, ohlcSymbol, timeframe])
}

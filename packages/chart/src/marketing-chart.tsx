"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChartPanel } from "./chart-panel"
import { createDemoCandles } from "./demo-candles"
import { mergeLiveCandle } from "./bitycle-live-parse"
import {
  fetchMarketingChart,
  fetchMarketingMarkets,
} from "./marketing-api"
import {
  getMarketingMarket,
  getMarketingTimeframes,
  resolveMarketingTimeframe,
} from "./marketing-markets"
import type { CandlePoint, ChartMarketInfo, ChartMarketOption } from "./types"
import { useDemoChartControls } from "./use-demo-chart-controls"
import { useMarketingLive } from "./use-marketing-live"

type MarketingChartProps = {
  className?: string
}

function withLivePrice<T extends ChartMarketInfo>(market: T, price: number): T {
  const basis = market.latest - market.dayChange
  return { ...market, latest: price, dayChange: price - basis }
}

/** Self-contained interactive chart for marketing / hero — live Bitycle + WS. */
export function MarketingChart({ className }: MarketingChartProps) {
  const [markets, setMarkets] = useState<ChartMarketOption[]>([])
  const [marketsLoading, setMarketsLoading] = useState(true)
  const [candles, setCandles] = useState<CandlePoint[] | undefined>(undefined)
  const [chartLoading, setChartLoading] = useState(false)
  const controls = useDemoChartControls({ defaultTimeframe: "1h" })
  const marketRef = useRef(controls.market)
  const setMarketRef = useRef(controls.setMarket)
  const timeframeRef = useRef(controls.timeframe)
  marketRef.current = controls.market
  setMarketRef.current = controls.setMarket
  timeframeRef.current = controls.timeframe

  const timeframeOptions = useMemo(
    () =>
      getMarketingTimeframes(controls.market?.ohlcSymbol ?? "BTCUSDT"),
    [controls.market?.ohlcSymbol]
  )
  const panelControls = useMemo(
    () => ({ ...controls, timeframeOptions }),
    [controls, timeframeOptions]
  )

  useEffect(() => {
    let cancelled = false
    setMarketsLoading(true)
    void fetchMarketingMarkets()
      .then((list) => {
        if (cancelled) return
        setMarkets(list)
        const first = list[0]
        if (first) controls.setMarket(first)
      })
      .finally(() => {
        if (!cancelled) setMarketsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [controls.setMarket])

  useEffect(() => {
    const ohlc = controls.market?.ohlcSymbol
    if (!ohlc) return
    let cancelled = false
    setChartLoading(true)
    void fetchMarketingChart(ohlc, controls.timeframe)
      .then((rows) => {
        if (!cancelled) setCandles(rows)
      })
      .catch(() => {
        if (!cancelled) setCandles(createDemoCandles(80))
      })
      .finally(() => {
        if (!cancelled) setChartLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [controls.market?.ohlcSymbol, controls.timeframe])

  useEffect(() => {
    if (timeframeOptions.includes(controls.timeframe)) return
    const next = timeframeOptions[0]
    if (next) controls.setTimeframe(next)
  }, [timeframeOptions, controls.timeframe, controls.setTimeframe])

  const onPrice = useCallback((symbol: string, price: number) => {
    setMarkets((current) =>
      current.map((market) =>
        market.ohlcSymbol === symbol ? withLivePrice(market, price) : market
      )
    )
    const active = marketRef.current
    if (active?.ohlcSymbol === symbol) {
      setMarketRef.current(withLivePrice(active, price))
    }
  }, [])

  const onCandle = useCallback(
    (symbol: string, tf: string, candle: CandlePoint) => {
      const active = marketRef.current?.ohlcSymbol
      if (!active || symbol !== active) return
      const config = getMarketingMarket(active)
      if (!config) return
      if (resolveMarketingTimeframe(config, timeframeRef.current) !== tf) return
      setCandles((current) =>
        current?.length ? mergeLiveCandle(current, candle) : current
      )
    },
    []
  )

  useMarketingLive({
    enabled: markets.length > 0,
    ohlcSymbol: controls.market?.ohlcSymbol ?? null,
    timeframe: controls.timeframe,
    onPrice,
    onCandle,
  })

  const selectedId =
    markets.find((item) => item.ohlcSymbol === controls.market?.ohlcSymbol)
      ?.id ??
    markets[0]?.id ??
    null

  return (
    <ChartPanel
      controls={panelControls}
      data={candles}
      isLoading={chartLoading || marketsLoading}
      marketSelect={{
        markets,
        selectedId,
        onSelect: (market) => controls.setMarket(market),
        isLoading: marketsLoading,
      }}
      className={
        className ??
        "flex h-[min(420px,70vw)] w-full flex-col gap-0 overflow-hidden rounded-xl py-0 shadow-lg ring-inset"
      }
    />
  )
}

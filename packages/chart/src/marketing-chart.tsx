"use client"

import { useEffect, useMemo, useState } from "react"
import { ChartPanel } from "./chart-panel"
import { createDemoCandles } from "./demo-candles"
import {
  fetchMarketingChart,
  fetchMarketingMarkets,
} from "./marketing-api"
import { getMarketingTimeframes } from "./marketing-markets"
import type { CandlePoint, ChartMarketOption } from "./types"
import { useDemoChartControls } from "./use-demo-chart-controls"

type MarketingChartProps = {
  className?: string
}

/** Self-contained interactive chart for marketing / hero — live Bitycle data. */
export function MarketingChart({ className }: MarketingChartProps) {
  const [markets, setMarkets] = useState<ChartMarketOption[]>([])
  const [marketsLoading, setMarketsLoading] = useState(true)
  const [candles, setCandles] = useState<CandlePoint[] | undefined>(undefined)
  const [chartLoading, setChartLoading] = useState(false)

  const controls = useDemoChartControls({ defaultTimeframe: "1h" })

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

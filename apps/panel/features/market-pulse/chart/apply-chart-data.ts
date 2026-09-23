import type {
  IChartApi,
  ISeriesApi,
  CandlestickData,
  HistogramData,
  LineData,
  SeriesType,
  Time,
} from "lightweight-charts"
import { HistogramSeries, LineSeries } from "lightweight-charts"
import type {
  ChartType,
  IndicatorId,
  RangeKey,
} from "@/features/market-pulse/chart/chart-options"
import {
  computeSma,
  getVisibleLogicalRange,
  shiftSeries,
} from "@/features/market-pulse/chart/chart-helpers"
import type { CandlePoint } from "@/features/market-pulse/types"

type SeriesBag = {
  volume: ISeriesApi<"Histogram"> | null
  sma20: ISeriesApi<"Line"> | null
  sma50: ISeriesApi<"Line"> | null
  compare: ISeriesApi<"Line"> | null
}

type ApplyChartDataArgs = {
  chart: IChartApi
  mainSeries: ISeriesApi<SeriesType>
  data: CandlePoint[]
  chartType: ChartType
  indicators: IndicatorId[]
  compareSymbol: string | null
  range: RangeKey
  /** When false, keep the user's current zoom/scroll after setData. */
  resetVisibleRange: boolean
  extras: SeriesBag
}

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value)
}

function sanitizeCandles(data: CandlePoint[]): CandlePoint[] {
  return data.filter(
    (item) =>
      isFiniteNumber(item.time) &&
      isFiniteNumber(item.open) &&
      isFiniteNumber(item.high) &&
      isFiniteNumber(item.low) &&
      isFiniteNumber(item.close)
  )
}

function syncSma(
  chart: IChartApi,
  data: CandlePoint[],
  enabled: boolean,
  period: number,
  current: ISeriesApi<"Line"> | null,
  color: string
): ISeriesApi<"Line"> | null {
  if (!enabled) {
    if (current) chart.removeSeries(current)
    return null
  }
  const series =
    current ??
    chart.addSeries(LineSeries, {
      color,
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    })
  series.setData(
    computeSma(data, period).map((item) => ({
      time: item.time as Time,
      value: item.value,
    }))
  )
  return series
}

export function applyChartData({
  chart,
  mainSeries,
  data,
  chartType,
  indicators,
  compareSymbol,
  range,
  resetVisibleRange,
  extras,
}: ApplyChartDataArgs): SeriesBag {
  const candles = sanitizeCandles(data)
  if (candles.length === 0) {
    mainSeries.setData([])
    return extras
  }

  const timeScale = chart.timeScale()
  const preserved = resetVisibleRange
    ? null
    : timeScale.getVisibleLogicalRange()

  if (chartType === "candle") {
    const points: CandlestickData<Time>[] = candles.map((item) => ({
      time: item.time as Time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }))
    ;(mainSeries as ISeriesApi<"Candlestick">).setData(points)
  } else {
    const lines: LineData<Time>[] = candles.map((item) => ({
      time: item.time as Time,
      value: item.close,
    }))
    ;(mainSeries as ISeriesApi<"Line" | "Area">).setData(lines)
  }

  let volume = extras.volume
  if (indicators.includes("volume")) {
    if (!volume) {
      volume = chart.addSeries(HistogramSeries, {
        priceFormat: { type: "volume" },
        priceScaleId: "volume",
      })
      chart.priceScale("volume").applyOptions({
        scaleMargins: { top: 0.8, bottom: 0 },
      })
    }
    const volumes: HistogramData<Time>[] = candles.map((item) => ({
      time: item.time as Time,
      value: item.volume,
      color:
        item.close >= item.open
          ? "rgba(41, 157, 127, 0.45)"
          : "rgba(196, 90, 89, 0.45)",
    }))
    volume.setData(volumes)
  } else if (volume) {
    chart.removeSeries(volume)
    volume = null
  }

  const sma20 = syncSma(
    chart,
    candles,
    indicators.includes("sma20"),
    20,
    extras.sma20,
    "#DEAF3C"
  )
  const sma50 = syncSma(
    chart,
    candles,
    indicators.includes("sma50"),
    50,
    extras.sma50,
    "#5B8DEF"
  )

  let compare = extras.compare
  if (compareSymbol) {
    if (!compare) {
      compare = chart.addSeries(LineSeries, {
        color: "#9B59B6",
        lineWidth: 2,
        priceLineVisible: false,
      })
    }
    compare.setData(
      shiftSeries(candles, 0.92).map((item) => ({
        time: item.time as Time,
        value: item.close,
      }))
    )
  } else if (compare) {
    chart.removeSeries(compare)
    compare = null
  }

  if (resetVisibleRange) {
    const logical = getVisibleLogicalRange(candles, range)
    if (logical) {
      timeScale.setVisibleLogicalRange(logical)
    } else {
      timeScale.fitContent()
    }
  } else if (preserved) {
    // * Live ticks must not snap zoom back to the footer range preset
    timeScale.setVisibleLogicalRange(preserved)
  }

  return { volume, sma20, sma50, compare }
}

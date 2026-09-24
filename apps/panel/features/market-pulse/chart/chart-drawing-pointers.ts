import type { IChartApi, ISeriesApi, SeriesType, Time } from "lightweight-charts"
import type { Anchor, DrawingManager, IDrawing } from "lightweight-charts-drawing"
import {
  pointToAnchor,
  snapAnchorToCandle,
} from "@/features/market-pulse/chart/chart-drawing-snap"
import {
  applySlopeLineColor,
  commitDrawing,
  requiredAnchorsFor,
  syncPreviewDrawing,
} from "@/features/market-pulse/chart/chart-drawing-session"
import type { DrawingUndoStack } from "@/features/market-pulse/chart/chart-drawing-undo"
import type { CandlePoint } from "@/features/market-pulse/types"

type PointerParam = {
  point?: { x: number; y: number } | undefined
  time?: Time
}

type LiveDrawingState = {
  drawingPayload: string | null
  drawingAsIcon: boolean
  isLocked: boolean
  isMagnet: boolean
  drawingsVisible: boolean
  candles: CandlePoint[] | undefined
}

type BindDrawingPointersArgs = {
  chart: IChartApi
  series: ISeriesApi<SeriesType>
  manager: DrawingManager
  drawingType: string
  pendingRef: { current: Anchor[] }
  previewRef: { current: IDrawing | null }
  idCounterRef: { current: number }
  undoStack: DrawingUndoStack
  getLive: () => LiveDrawingState
}

export function bindDrawingPointers({
  chart,
  series,
  manager,
  drawingType,
  pendingRef,
  previewRef,
  idCounterRef,
  undoStack,
  getLive,
}: BindDrawingPointersArgs): () => void {
  const resolveAnchor = (param: PointerParam): Anchor | null => {
    if (!param.point) return null
    const raw = pointToAnchor(chart, series, param.point, param.time)
    if (!raw) return null
    const live = getLive()
    return snapAnchorToCandle(raw, live.candles, live.isMagnet)
  }

  const onClick = (param: PointerParam) => {
    const live = getLive()
    if (live.isLocked) return
    const anchor = resolveAnchor(param)
    if (!anchor) return
    pendingRef.current = [...pendingRef.current, anchor]
    if (pendingRef.current.length >= requiredAnchorsFor(drawingType)) {
      idCounterRef.current += 1
      const drawing = commitDrawing(
        manager,
        drawingType,
        pendingRef.current,
        `drawing-${idCounterRef.current}`,
        live.drawingPayload,
        live.isLocked,
        live.drawingsVisible,
        live.drawingAsIcon
      )
      pendingRef.current = []
      previewRef.current = null
      if (drawing) undoStack.push(drawing.id)
      return
    }
    previewRef.current = syncPreviewDrawing(
      manager,
      drawingType,
      pendingRef.current
    )
  }

  const onMove = (param: PointerParam) => {
    if (!previewRef.current || pendingRef.current.length === 0) return
    const anchor = resolveAnchor(param)
    if (!anchor) return
    previewRef.current.updateAnchor(pendingRef.current.length, anchor)
    applySlopeLineColor(previewRef.current, drawingType)
  }

  chart.subscribeClick(onClick)
  chart.subscribeCrosshairMove(onMove)
  return () => {
    chart.unsubscribeClick(onClick)
    chart.unsubscribeCrosshairMove(onMove)
  }
}

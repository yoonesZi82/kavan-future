"use client"

import { useEffect, useRef } from "react"
import type { IChartApi, ISeriesApi, SeriesType } from "lightweight-charts"
import {
  DrawingManager,
  type Anchor,
  type IDrawing,
} from "lightweight-charts-drawing"
import { bindDrawingPointers } from "./chart-drawing-pointers"
import {
  applySlopeLineColor,
  handleDrawingHotkey,
  PREVIEW_ID,
  removePreviewDrawing,
} from "./chart-drawing-session"
import { createDrawingUndoStack } from "./chart-drawing-undo"
import type { CandlePoint } from "./types"

type UseChartDrawingArgs = {
  chart: IChartApi | null
  series: ISeriesApi<SeriesType> | null
  container: HTMLElement | null
  drawingType: string | null
  drawingPayload: string | null
  drawingAsIcon: boolean
  isLocked: boolean
  isMagnet: boolean
  drawingsVisible: boolean
  drawingsVersion: number
  undoVersion: number
  candles: CandlePoint[] | undefined
  onCanUndoChange: (canUndo: boolean) => void
  onStatus?: (message: string) => void
}

export function useChartDrawing(args: UseChartDrawingArgs): void {
  const {
    chart,
    series,
    container,
    drawingType,
    drawingPayload,
    drawingAsIcon,
    isLocked,
    isMagnet,
    drawingsVisible,
    drawingsVersion,
    undoVersion,
    candles,
    onCanUndoChange,
    onStatus,
  } = args
  const managerRef = useRef<DrawingManager | null>(null)
  const pendingRef = useRef<Anchor[]>([])
  const previewRef = useRef<IDrawing | null>(null)
  const idCounterRef = useRef(0)
  const liveRef = useRef({
    drawingType,
    drawingPayload,
    drawingAsIcon,
    isLocked,
    isMagnet,
    drawingsVisible,
    candles,
    onCanUndoChange,
    onStatus,
  })
  Object.assign(liveRef.current, {
    drawingType,
    drawingPayload,
    drawingAsIcon,
    isLocked,
    isMagnet,
    drawingsVisible,
    candles,
    onCanUndoChange,
    onStatus,
  })
  const undoStack = useRef(
    createDrawingUndoStack((canUndo) => liveRef.current.onCanUndoChange(canUndo))
  ).current

  const performUndo = (): boolean => {
    const manager = managerRef.current
    const drawingId = undoStack.pop()
    if (!manager || !drawingId) return false
    manager.removeDrawing(drawingId)
    return true
  }

  useEffect(() => {
    if (!chart || !series || !container) return
    const manager = new DrawingManager()
    manager.attach(chart, series, container)
    managerRef.current = manager
    undoStack.clear()
    const unsubUpdated = manager.on("drawing:updated", (event) => {
      const drawing = event.drawing
      if (!drawing || drawing.id === PREVIEW_ID) return
      applySlopeLineColor(drawing, drawing.type)
    })
    return () => {
      unsubUpdated()
      manager.clearAll()
      manager.detach()
      managerRef.current = null
      pendingRef.current = []
      previewRef.current = null
      undoStack.clear()
    }
  }, [chart, series, container, undoStack])

  useEffect(() => {
    const manager = managerRef.current
    if (!manager) return
    for (const drawing of manager.getAllDrawings()) {
      if (drawing.id === PREVIEW_ID) continue
      drawing.updateOptions({ locked: isLocked, visible: drawingsVisible })
    }
  }, [isLocked, drawingsVisible])

  useEffect(() => {
    const manager = managerRef.current
    if (!manager || drawingsVersion === 0) return
    manager.clearAll()
    pendingRef.current = []
    previewRef.current = null
    undoStack.clear()
  }, [drawingsVersion, undoStack])

  useEffect(() => {
    if (undoVersion === 0) return
    performUndo()
  }, [undoVersion])

  useEffect(() => {
    pendingRef.current = []
    const manager = managerRef.current
    if (manager) {
      previewRef.current = removePreviewDrawing(manager, previewRef.current)
    }
    manager?.setActiveTool(drawingType)
    if (container) container.style.cursor = drawingType ? "crosshair" : ""
  }, [drawingType, container])

  useEffect(() => {
    if (!chart || !series || !drawingType) return
    const manager = managerRef.current
    if (!manager) return
    const unbind = bindDrawingPointers({
      chart,
      series,
      manager,
      drawingType,
      pendingRef,
      previewRef,
      idCounterRef,
      undoStack,
      getLive: () => liveRef.current,
    })
    return () => {
      unbind()
      previewRef.current = removePreviewDrawing(manager, previewRef.current)
      pendingRef.current = []
    }
  }, [chart, series, drawingType, undoStack])

  useEffect(() => {
    if (!chart) return
    const onKey = (event: KeyboardEvent) => {
      const manager = managerRef.current
      if (!manager) return
      handleDrawingHotkey(
        event,
        manager,
        liveRef.current.isLocked,
        () => {
          previewRef.current = removePreviewDrawing(manager, previewRef.current)
          pendingRef.current = []
        },
        () => {
          if (performUndo()) {
            liveRef.current.onStatus?.("آخرین رسم برگشت خورد")
          }
        },
        (drawingId) => undoStack.forget(drawingId)
      )
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [chart, undoStack])
}

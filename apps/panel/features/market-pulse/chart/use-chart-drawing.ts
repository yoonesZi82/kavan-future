"use client"

import { useEffect, useRef } from "react"
import type { IChartApi, ISeriesApi, SeriesType } from "lightweight-charts"
import {
  DrawingManager,
  getToolRegistry,
  type Anchor,
  type IDrawing,
} from "lightweight-charts-drawing"
import type { DrawingToolId } from "@/features/market-pulse/chart/chart-options"
import {
  DRAWING_TOOL_TYPE,
  getDrawingStyle,
} from "@/features/market-pulse/chart/chart-drawing-map"

const PREVIEW_ID = "__preview__"

type UseChartDrawingArgs = {
  chart: IChartApi | null
  series: ISeriesApi<SeriesType> | null
  container: HTMLElement | null
  activeTool: DrawingToolId
  isLocked: boolean
  drawingsVisible: boolean
  drawingsVersion: number
}

function pointToAnchor(
  chart: IChartApi,
  series: ISeriesApi<SeriesType>,
  container: HTMLElement,
  clientX: number,
  clientY: number
): Anchor | null {
  const rect = container.getBoundingClientRect()
  const x = clientX - rect.left
  const y = clientY - rect.top
  const time = chart.timeScale().coordinateToTime(x)
  const price = series.coordinateToPrice(y)
  if (time === null || price === null) return null
  return { time, price }
}

export function useChartDrawing({
  chart,
  series,
  container,
  activeTool,
  isLocked,
  drawingsVisible,
  drawingsVersion,
}: UseChartDrawingArgs): void {
  const managerRef = useRef<DrawingManager | null>(null)
  const pendingRef = useRef<Anchor[]>([])
  const previewRef = useRef<IDrawing | null>(null)
  const idCounterRef = useRef(0)
  const toolType = DRAWING_TOOL_TYPE[activeTool] ?? null

  useEffect(() => {
    if (!chart || !series || !container) return
    const manager = new DrawingManager()
    manager.attach(chart, series, container)
    managerRef.current = manager
    return () => {
      manager.clearAll()
      manager.detach()
      managerRef.current = null
      pendingRef.current = []
      previewRef.current = null
    }
  }, [chart, series, container])

  useEffect(() => {
    const manager = managerRef.current
    if (!manager) return
    for (const drawing of manager.getAllDrawings()) {
      if (drawing.id === PREVIEW_ID) continue
      drawing.updateOptions({ locked: isLocked })
    }
  }, [isLocked])

  useEffect(() => {
    const manager = managerRef.current
    if (!manager) return
    for (const drawing of manager.getAllDrawings()) {
      if (drawing.id === PREVIEW_ID) continue
      drawing.updateOptions({ visible: drawingsVisible })
    }
  }, [drawingsVisible])

  useEffect(() => {
    const manager = managerRef.current
    if (!manager || drawingsVersion === 0) return
    manager.clearAll()
    pendingRef.current = []
    previewRef.current = null
  }, [drawingsVersion])

  useEffect(() => {
    pendingRef.current = []
    const manager = managerRef.current
    if (manager && previewRef.current) {
      manager.removeDrawing(PREVIEW_ID)
      previewRef.current = null
    }
    manager?.setActiveTool(toolType)
  }, [toolType])

  useEffect(() => {
    if (!chart || !series || !container || !toolType) return
    const manager = managerRef.current
    if (!manager) return
    const registry = getToolRegistry()

    const removePreview = () => {
      if (!previewRef.current) return
      manager.removeDrawing(PREVIEW_ID)
      previewRef.current = null
    }

    const syncPreview = (anchors: Anchor[]) => {
      const required = registry.get(toolType)?.requiredAnchors ?? 2
      const previewAnchors = [...anchors]
      while (previewAnchors.length < required) {
        const last = previewAnchors[previewAnchors.length - 1]
        if (!last) break
        previewAnchors.push({ ...last })
      }
      removePreview()
      const drawing = registry.createDrawing(
        toolType,
        PREVIEW_ID,
        previewAnchors,
        getDrawingStyle(toolType)
      )
      if (!drawing) return
      manager.addDrawing(drawing)
      previewRef.current = drawing
    }

    const onClick = (event: MouseEvent) => {
      if (isLocked) return
      const anchor = pointToAnchor(chart, series, container, event.clientX, event.clientY)
      if (!anchor) return
      pendingRef.current = [...pendingRef.current, anchor]
      const required = registry.get(toolType)?.requiredAnchors ?? 2
      if (pendingRef.current.length >= required) {
        removePreview()
        idCounterRef.current += 1
        const drawing = registry.createDrawing(
          toolType,
          `drawing-${idCounterRef.current}`,
          pendingRef.current,
          getDrawingStyle(toolType),
          { locked: isLocked, visible: drawingsVisible }
        )
        pendingRef.current = []
        if (drawing) {
          manager.addDrawing(drawing)
          manager.selectDrawing(drawing.id)
        }
        return
      }
      syncPreview(pendingRef.current)
    }

    const onMove = (event: MouseEvent) => {
      if (!previewRef.current || pendingRef.current.length === 0) return
      const anchor = pointToAnchor(chart, series, container, event.clientX, event.clientY)
      if (!anchor) return
      previewRef.current.updateAnchor(pendingRef.current.length, anchor)
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        removePreview()
        pendingRef.current = []
        return
      }
      if (event.key !== "Delete" && event.key !== "Backspace") return
      if (isLocked) return
      const selected = manager.getSelectedDrawing()
      if (!selected || selected.id === PREVIEW_ID) return
      manager.removeDrawing(selected.id)
    }

    container.addEventListener("click", onClick)
    container.addEventListener("mousemove", onMove)
    window.addEventListener("keydown", onKey)
    return () => {
      container.removeEventListener("click", onClick)
      container.removeEventListener("mousemove", onMove)
      window.removeEventListener("keydown", onKey)
      removePreview()
      pendingRef.current = []
    }
  }, [chart, series, container, toolType, isLocked, drawingsVisible])
}

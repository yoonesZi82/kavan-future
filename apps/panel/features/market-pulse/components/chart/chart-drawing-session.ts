import {
  getToolRegistry,
  type Anchor,
  type DrawingManager,
  type IDrawing,
} from "lightweight-charts-drawing"
import {
  getDrawingCreateOptions,
  getDrawingStyle,
  isSlopeColoredTool,
  slopeLineColor,
} from "@/features/market-pulse/components/chart/chart-drawing-map"

export const PREVIEW_ID = "__preview__"

export function applySlopeLineColor(
  drawing: IDrawing,
  toolType: string
): void {
  if (!isSlopeColoredTool(toolType)) return
  const color = slopeLineColor(drawing.anchors)
  if (!color) return
  drawing.updateStyle({ lineColor: color, fillColor: `${color}33` })
}

export function removePreviewDrawing(
  manager: DrawingManager,
  preview: IDrawing | null
): null {
  if (!preview) return null
  manager.removeDrawing(PREVIEW_ID)
  return null
}

export function syncPreviewDrawing(
  manager: DrawingManager,
  toolType: string,
  anchors: Anchor[]
): IDrawing | null {
  const registry = getToolRegistry()
  const required = registry.get(toolType)?.requiredAnchors ?? 2
  const previewAnchors = [...anchors]
  while (previewAnchors.length < required) {
    const last = previewAnchors[previewAnchors.length - 1]
    if (!last) break
    previewAnchors.push({ ...last })
  }
  removePreviewDrawing(manager, manager.getDrawing(PREVIEW_ID) ?? null)
  const drawing = registry.createDrawing(
    toolType,
    PREVIEW_ID,
    previewAnchors,
    getDrawingStyle(toolType, previewAnchors)
  )
  if (!drawing) return null
  manager.addDrawing(drawing)
  return drawing
}

export function commitDrawing(
  manager: DrawingManager,
  toolType: string,
  anchors: Anchor[],
  id: string,
  payload: string | null,
  locked: boolean,
  visible: boolean,
  asIcon = false
): IDrawing | null {
  const options = getDrawingCreateOptions(
    toolType,
    payload,
    locked,
    visible,
    asIcon
  )
  if (toolType === "text-annotation" && !options.text) return null
  removePreviewDrawing(manager, manager.getDrawing(PREVIEW_ID) ?? null)
  const drawing = getToolRegistry().createDrawing(
    toolType,
    id,
    anchors,
    getDrawingStyle(toolType, anchors),
    options
  )
  if (!drawing) return null
  applySlopeLineColor(drawing, toolType)
  manager.addDrawing(drawing)
  manager.selectDrawing(drawing.id)
  return drawing
}

export function requiredAnchorsFor(toolType: string): number {
  return getToolRegistry().get(toolType)?.requiredAnchors ?? 2
}

export function isTypingTarget(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.isContentEditable)
  )
}

export function handleDrawingHotkey(
  event: KeyboardEvent,
  manager: DrawingManager,
  isLocked: boolean,
  onEscape: () => void,
  onUndo?: () => void,
  onDeleted?: (drawingId: string) => void
): void {
  if (event.key === "Escape") {
    onEscape()
    return
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
    event.preventDefault()
    onUndo?.()
    return
  }
  if (event.key !== "Delete" && event.key !== "Backspace") return
  if (isLocked || isTypingTarget(event.target)) return
  const selected = manager.getSelectedDrawing()
  if (!selected || selected.id === PREVIEW_ID) return
  const drawingId = selected.id
  manager.removeDrawing(drawingId)
  onDeleted?.(drawingId)
}

"use client"

import type { Dispatch, SetStateAction } from "react"
import type { DrawingToolId, RangeKey } from "./chart-options"
import { DRAWING_TOOL_TYPE } from "./chart-drawing-map"

type DrawingToolHandlerArgs = {
  setIsMagnet: Dispatch<SetStateAction<boolean>>
  setIsLocked: Dispatch<SetStateAction<boolean>>
  setDrawingsVisible: Dispatch<SetStateAction<boolean>>
  setDrawingsVersion: Dispatch<SetStateAction<number>>
  setUndoVersion: Dispatch<SetStateAction<number>>
  getCanUndo: () => boolean
  setRange: Dispatch<SetStateAction<RangeKey>>
  setDrawingTool: Dispatch<SetStateAction<DrawingToolId>>
  setDrawingType: Dispatch<SetStateAction<string | null>>
  setDrawingPayload: Dispatch<SetStateAction<string | null>>
  setDrawingAsIcon: Dispatch<SetStateAction<boolean>>
  setStatusMessage: Dispatch<SetStateAction<string | null>>
}

export function createDrawingToolHandler({
  setIsMagnet,
  setIsLocked,
  setDrawingsVisible,
  setDrawingsVersion,
  setUndoVersion,
  getCanUndo,
  setRange,
  setDrawingTool,
  setDrawingType,
  setDrawingPayload,
  setDrawingAsIcon,
  setStatusMessage,
}: DrawingToolHandlerArgs) {
  return (id: DrawingToolId, type?: string, payload?: string | null) => {
    if (id === "magnet") {
      setIsMagnet((value) => {
        setStatusMessage(value ? "مغناطیس خاموش شد" : "مغناطیس فعال شد")
        return !value
      })
      return
    }
    if (id === "lock") {
      setIsLocked((value) => {
        setStatusMessage(value ? "قفل برداشته شد" : "رسم‌ها قفل شد")
        return !value
      })
      return
    }
    if (id === "hide") {
      setDrawingsVisible((value) => {
        setStatusMessage(value ? "رسم‌ها مخفی شد" : "رسم‌ها نمایش داده شد")
        return !value
      })
      return
    }
    if (id === "undo") {
      if (!getCanUndo()) {
        setStatusMessage("چیزی برای برگشت نیست")
        return
      }
      setUndoVersion((value) => value + 1)
      setStatusMessage("آخرین رسم برگشت خورد")
      return
    }
    if (id === "trash") {
      setDrawingsVersion((value) => value + 1)
      setStatusMessage("رسم‌ها پاک شد")
      return
    }
    if (id === "zoom") {
      setRange("All")
      setStatusMessage("نمای کامل چارت")
      setDrawingTool("crosshair")
      setDrawingType(null)
      setDrawingPayload(null)
      setDrawingAsIcon(false)
      return
    }
    if (id === "text") {
      const text = window.prompt("متن روی چارت:", "متن")?.trim()
      if (!text) return
      setDrawingTool("text")
      setDrawingType("text-annotation")
      setDrawingPayload(text)
      setDrawingAsIcon(false)
      setStatusMessage("روی چارت کلیک کنید")
      return
    }
    const nextType =
      id === "crosshair" ? null : (type ?? DRAWING_TOOL_TYPE[id] ?? null)
    setDrawingTool(id)
    setDrawingType(nextType)
    setDrawingPayload(payload ?? null)
    setDrawingAsIcon(id === "emoji" && Boolean(payload) && payload !== "flag")
    const labels: Partial<Record<DrawingToolId, string>> = {
      crosshair: "نشانگر فعال شد",
      trend: "ابزار خط روند فعال شد",
      fib: "ابزار فیبوناچی فعال شد",
      shape: "اشکال هندسی فعال شد",
      text: "ابزار متن فعال شد",
      emoji: "آیکون‌ها فعال شد",
      measure: "اندازه‌گیری فعال شد",
    }
    if (labels[id]) setStatusMessage(labels[id] ?? null)
  }
}

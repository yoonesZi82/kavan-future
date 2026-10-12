import type { CSSProperties } from "react"
import type { Easing } from "framer-motion"

export type StrokeTextTrigger = "mount" | "hover" | "scroll" | "loop"
export type StrokeTextFillMode = "wipe" | "fade" | "none"
export type StrokeTextDirection = "ltr" | "rtl"
export type StrokeTextAlign = "start" | "center" | "center-mobile"

export interface StrokeTextProps {
  text?: string
  strokeColor?: string
  fillColor?: string
  strokeWidth?: number
  drawDuration?: number
  fillDelay?: number
  stagger?: number
  ease?: string
  trigger?: StrokeTextTrigger
  fillMode?: StrokeTextFillMode
  fontSize?: number
  fontWeight?: number | string
  letterSpacing?: number
  reverse?: boolean
  direction?: StrokeTextDirection
  align?: StrokeTextAlign
  lineHeight?: number
  className?: string
  style?: CSSProperties
}

export interface StrokeTextBox {
  x: number
  y: number
  width: number
  height: number
}

const EASE_MAP: Record<string, Easing> = {
  "power2.out": [0.215, 0.61, 0.355, 1],
  "power2.inOut": [0.645, 0.045, 0.355, 1],
  "power2.in": [0.55, 0.055, 0.675, 0.19],
  linear: "linear",
  easeOut: "easeOut",
  easeIn: "easeIn",
  easeInOut: "easeInOut",
}

export function mapEase(ease: string): Easing {
  return EASE_MAP[ease] ?? "easeOut"
}

/** * Arabic/Persian must stay as whole runs — per-glyph SVG tspans break joining on Safari */
export function needsJoinedGlyphs(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(
    text
  )
}

export function charDelay(
  index: number,
  total: number,
  stagger: number,
  reverse: boolean
): number {
  return (reverse ? total - 1 - index : index) * stagger
}

export function measureStrokeBox(
  node: SVGGraphicsElement,
  strokeWidth: number,
  fontSize: number
): StrokeTextBox | null {
  let bbox: DOMRect | undefined
  try {
    bbox = node.getBBox()
  } catch {
    return null
  }
  if (!bbox?.width && !bbox?.height) return null
  const pad = Math.max(Number(strokeWidth) || 1, fontSize * 0.1)
  return {
    x: bbox.x - pad,
    y: bbox.y - pad,
    width: Math.max(bbox.width + pad * 2, 1),
    height: Math.max(bbox.height + pad * 2, 1),
  }
}

export function wrapTextLines(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontWeight: number | string,
  letterSpacing: number
): string[] {
  const value = String(text ?? "").trim()
  if (!value) return [""]
  if (maxWidth <= 0 || typeof document === "undefined") return [value]

  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  if (!context) return [value]
  context.font = `${fontWeight} ${fontSize}px sans-serif`

  const measure = (line: string): number => {
    const base = context.measureText(line).width
    const extras = Math.max(line.length - 1, 0) * letterSpacing
    return base + extras
  }

  if (measure(value) <= maxWidth) return [value]

  const words = value.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ""

  for (const word of words) {
    const next = current ? `${current} ${word}` : word
    if (measure(next) <= maxWidth) {
      current = next
      continue
    }
    if (current) lines.push(current)
    if (measure(word) <= maxWidth) {
      current = word
      continue
    }
    let chunk = ""
    for (const char of Array.from(word)) {
      const trial = `${chunk}${char}`
      if (chunk && measure(trial) > maxWidth) {
        lines.push(chunk)
        chunk = char
      } else {
        chunk = trial
      }
    }
    current = chunk
  }
  if (current) lines.push(current)
  return lines.length > 0 ? lines : [value]
}

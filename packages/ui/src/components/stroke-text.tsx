"use client"

import {
  type CSSProperties,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion"
import { useStrokeTextAnimation } from "./stroke-text-animation"
import { StrokeTextLines } from "./stroke-text-lines"
import {
  type StrokeTextBox,
  type StrokeTextProps,
  mapEase,
  measureStrokeBox,
  wrapTextLines,
} from "./stroke-text-utils"

export type { StrokeTextDirection, StrokeTextFillMode, StrokeTextProps, StrokeTextTrigger } from "./stroke-text-utils"

const DEFAULT_TEXT = "Draw Attention"

const StrokeText = ({
  text = DEFAULT_TEXT,
  strokeColor = "#A78BFA",
  fillColor = "#F8FAFC",
  strokeWidth = 1.4,
  drawDuration = 1.6,
  fillDelay = 0.2,
  stagger = 0.05,
  ease = "power2.out",
  trigger = "mount",
  fillMode = "wipe",
  fontSize = 128,
  fontWeight = 800,
  letterSpacing = -4,
  reverse = false,
  direction = "ltr",
  lineHeight,
  className = "",
  style = {},
}: StrokeTextProps) => {
  const rootRef = useRef<HTMLSpanElement | null>(null)
  const strokeTextRef = useRef<SVGGElement | null>(null)
  const strokeControls = useAnimationControls()
  const fillControls = useAnimationControls()
  const wipeControls = useAnimationControls()
  const [box, setBox] = useState<StrokeTextBox | null>(null)
  const [maxWidth, setMaxWidth] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const isInView = useInView(rootRef, { once: true, margin: "0px 0px -18% 0px" })
  const wipeId = `stroke-text-wipe-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
  const rowHeight = lineHeight ?? fontSize * 1.2
  const lines = useMemo(
    () => wrapTextLines(text ?? "", maxWidth, fontSize, fontWeight, letterSpacing),
    [text, maxWidth, fontSize, fontWeight, letterSpacing]
  )
  const characters = useMemo(() => lines.flatMap((line) => Array.from(line)), [lines])
  const dash = Math.max(fontSize * 7, 200)
  const fillEnabled = fillMode !== "none"
  const useWipe = fillEnabled && fillMode === "wipe"
  const fillDuration = Math.max(0.4, drawDuration * 0.5)
  const motionEase = mapEase(ease)
  const isRtl = direction === "rtl"
  const fontStyle = useMemo<CSSProperties>(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
      direction,
      unicodeBidi: "plaintext",
    }),
    [fontSize, fontWeight, letterSpacing, direction]
  )

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const update = () => setMaxWidth(root.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (!strokeTextRef.current || maxWidth <= 0) return undefined
    let cancelled = false
    const measure = () => {
      if (cancelled || !strokeTextRef.current) return
      const next = measureStrokeBox(strokeTextRef.current, strokeWidth, fontSize)
      if (!next) return
      setBox((prev: StrokeTextBox | null) => {
        if (!prev) return next
        const near =
          Math.abs(prev.x - next.x) < 0.5 &&
          Math.abs(prev.y - next.y) < 0.5 &&
          Math.abs(prev.width - next.width) < 0.5 &&
          Math.abs(prev.height - next.height) < 0.5
        return near ? prev : next
      })
    }
    measure()
    document.fonts?.ready.then(measure).catch(() => {})
    return () => {
      cancelled = true
    }
  }, [lines, fontSize, fontWeight, letterSpacing, strokeWidth, maxWidth, direction])

  useStrokeTextAnimation({
    rootRef,
    box,
    charCount: characters.length,
    dash,
    drawDuration,
    fillDelay,
    fillDuration,
    fillEnabled,
    useWipe,
    stagger,
    reverse,
    direction,
    motionEase,
    trigger,
    isInView,
    prefersReducedMotion,
    strokeControls,
    fillControls,
    wipeControls,
  })

  const lineProps = {
    lines,
    direction,
    rowHeight,
    dash,
    strokeWidth,
    strokeColor,
    fillColor,
    useWipe,
    fontStyle,
    strokeControls,
    fillControls,
  }
  // * Reserve layout height before measure so mount/wipe does not jump the page
  const reservedLines =
    maxWidth > 0
      ? Math.max(lines.length, 1)
      : Math.max(2, Math.ceil(Array.from(text ?? "").length / 22))
  const reservedHeight = Math.ceil(rowHeight * reservedLines + fontSize * 0.15)

  return (
    <span
      ref={rootRef}
      className={`block w-full leading-[0] ${trigger === "hover" ? "cursor-pointer" : ""} ${className}`.trim()}
      style={{ ...style, minHeight: reservedHeight }}
      role="img"
      aria-label={String(text ?? "")}
    >
      <svg
        className={`block w-full ${box ? "opacity-100" : "opacity-0"}`}
        style={
          box
            ? { aspectRatio: `${box.width} / ${box.height}` }
            : { height: reservedHeight }
        }
        viewBox={box ? `${box.x} ${box.y} ${box.width} ${box.height}` : undefined}
        // * RTL start = right edge; avoid xMid letterboxing gap beside the title
        preserveAspectRatio={isRtl ? "xMaxYMid meet" : "xMinYMid meet"}
        aria-hidden="true"
      >
        {fillMode === "wipe" && box ? (
          <defs>
            <clipPath id={wipeId} clipPathUnits="userSpaceOnUse">
              <motion.rect
                y={box.y}
                height={box.height}
                initial={{
                  x: isRtl ? box.x + box.width : box.x,
                  width: 0,
                }}
                animate={wipeControls}
              />
            </clipPath>
          </defs>
        ) : null}
        <g ref={strokeTextRef}>
          <StrokeTextLines {...lineProps} mode="stroke" />
        </g>
        <g clipPath={fillMode === "wipe" && box ? `url(#${wipeId})` : undefined}>
          <StrokeTextLines {...lineProps} mode="fill" />
        </g>
      </svg>
    </span>
  )
}

export default StrokeText

"use client"

import type { CSSProperties } from "react"
import { motion, useAnimationControls } from "framer-motion"
import type { StrokeTextDirection } from "./stroke-text-utils"

type MotionControls = ReturnType<typeof useAnimationControls>

type StrokeTextLinesProps = {
  lines: string[]
  mode: "stroke" | "fill"
  direction: StrokeTextDirection
  rowHeight: number
  dash: number
  strokeWidth: number
  strokeColor: string
  fillColor: string
  useWipe: boolean
  fontStyle: CSSProperties
  strokeControls: MotionControls
  fillControls: MotionControls
}

export function StrokeTextLines({
  lines,
  mode,
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
}: StrokeTextLinesProps) {
  let charIndex = 0

  return lines.map((line, lineIndex) => {
    const chars = Array.from(line)
    const startIndex = charIndex
    charIndex += chars.length
    return (
      <text
        key={`${mode}-${lineIndex}`}
        className="select-none"
        x={0}
        y={lineIndex * rowHeight}
        direction={direction}
        unicodeBidi="plaintext"
        // * RTL: "start" is the right edge — keeps every wrapped line flush
        textAnchor="start"
        strokeWidth={mode === "stroke" ? strokeWidth : undefined}
        strokeLinejoin={mode === "stroke" ? "round" : undefined}
        strokeLinecap={mode === "stroke" ? "round" : undefined}
        style={{
          ...fontStyle,
          fill: mode === "stroke" ? "none" : fillColor,
          stroke: mode === "stroke" ? strokeColor : "none",
        }}
      >
        {chars.map((char, index) => {
          const custom = startIndex + index
          if (mode === "stroke") {
            return (
              <motion.tspan
                key={`s-${custom}`}
                custom={custom}
                initial={{ strokeDasharray: dash, strokeDashoffset: dash }}
                animate={strokeControls}
              >
                {char}
              </motion.tspan>
            )
          }
          return (
            <motion.tspan
              key={`f-${custom}`}
              custom={custom}
              initial={{ opacity: useWipe ? 1 : 0 }}
              animate={fillControls}
            >
              {char}
            </motion.tspan>
          )
        })}
      </text>
    )
  })
}

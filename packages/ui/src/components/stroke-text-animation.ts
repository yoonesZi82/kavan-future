import { type RefObject, useEffect } from "react"
import { type Easing, useAnimationControls } from "framer-motion"
import {
  type StrokeTextBox,
  type StrokeTextDirection,
  type StrokeTextTrigger,
  charDelay,
  mapEase,
} from "./stroke-text-utils"

type MotionControls = ReturnType<typeof useAnimationControls>

type UseStrokeTextAnimationArgs = {
  rootRef: RefObject<HTMLSpanElement | null>
  box: StrokeTextBox | null
  charCount: number
  dash: number
  drawDuration: number
  fillDelay: number
  fillDuration: number
  fillEnabled: boolean
  useWipe: boolean
  stagger: number
  reverse: boolean
  direction: StrokeTextDirection
  motionEase: Easing
  trigger: StrokeTextTrigger
  isInView: boolean
  prefersReducedMotion: boolean | null
  strokeControls: MotionControls
  fillControls: MotionControls
  wipeControls: MotionControls
}

function wipeStart(box: StrokeTextBox, direction: StrokeTextDirection) {
  if (direction === "rtl") {
    return { x: box.x + box.width, width: 0 }
  }
  return { x: box.x, width: 0 }
}

function wipeEnd(box: StrokeTextBox, enabled: boolean, direction: StrokeTextDirection) {
  if (!enabled) return wipeStart(box, direction)
  return { x: box.x, width: box.width }
}

export function useStrokeTextAnimation({
  rootRef,
  box,
  charCount,
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
}: UseStrokeTextAnimationArgs): void {
  useEffect(() => {
    if (!box || charCount === 0) return undefined
    let cancelled = false
    const setEnd = async () => {
      await Promise.all([
        strokeControls.set({ strokeDasharray: dash, strokeDashoffset: 0 }),
        fillControls.set({ opacity: fillEnabled ? 1 : 0 }),
        wipeControls.set(wipeEnd(box, fillEnabled, direction)),
      ])
    }
    const play = async () => {
      await Promise.all([
        strokeControls.set({ strokeDasharray: dash, strokeDashoffset: dash }),
        fillControls.set({ opacity: useWipe ? 1 : 0 }),
        wipeControls.set(wipeStart(box, direction)),
      ])
      if (cancelled) return
      const strokePlay = strokeControls.start((index: number) => ({
        strokeDashoffset: 0,
        transition: {
          duration: drawDuration,
          delay: charDelay(index, charCount, stagger, reverse),
          ease: motionEase,
        },
      }))
      const fillPlay = useWipe
        ? wipeControls.start({
            ...wipeEnd(box, true, direction),
            transition: {
              duration: fillDuration,
              delay: drawDuration + fillDelay,
              ease: mapEase("power2.inOut"),
            },
          })
        : fillEnabled
          ? fillControls.start((index: number) => ({
              opacity: 1,
              transition: {
                duration: fillDuration,
                delay:
                  drawDuration +
                  fillDelay +
                  charDelay(index, charCount, stagger, reverse),
                ease: "easeOut",
              },
            }))
          : Promise.resolve()
      await Promise.all([strokePlay, fillPlay])
    }

    if (prefersReducedMotion) {
      void setEnd()
      return undefined
    }
    if (trigger === "hover") {
      void setEnd()
      const root = rootRef.current
      if (!root) return undefined
      const onEnter = () => {
        void play()
      }
      root.addEventListener("pointerenter", onEnter)
      return () => root.removeEventListener("pointerenter", onEnter)
    }
    if (trigger === "scroll" && !isInView) return undefined
    if (trigger === "loop") {
      let timer: ReturnType<typeof setTimeout> | undefined
      const run = async () => {
        await play()
        if (cancelled) return
        timer = setTimeout(() => {
          void run()
        }, 900)
      }
      void run()
      return () => {
        cancelled = true
        if (timer) clearTimeout(timer)
      }
    }
    void play()
    return () => {
      cancelled = true
    }
  }, [
    box,
    charCount,
    dash,
    direction,
    drawDuration,
    fillControls,
    fillDelay,
    fillDuration,
    fillEnabled,
    isInView,
    motionEase,
    prefersReducedMotion,
    reverse,
    rootRef,
    stagger,
    strokeControls,
    trigger,
    useWipe,
    wipeControls,
  ])
}

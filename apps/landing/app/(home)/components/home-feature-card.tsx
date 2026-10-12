"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { FeatureItem } from "../constants"

type HomeFeatureCardProps = FeatureItem & {
  index: number
}

export function HomeFeatureCard({
  title,
  description,
  icon: Icon,
  index,
}: HomeFeatureCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.li
      className="group bg-card relative flex flex-col gap-3 overflow-hidden rounded-2xl p-5 ring-1 ring-foreground/10 transition-[background-color,box-shadow,ring-color] duration-500 hover:bg-primary/5 hover:ring-transparent"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.45,
        delay: prefersReducedMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <rect
          x={1}
          y={1}
          rx={15}
          ry={15}
          pathLength={100}
          style={{ width: "calc(100% - 2px)", height: "calc(100% - 2px)" }}
          className="fill-none stroke-primary [stroke-dasharray:100] [stroke-dashoffset:100] [stroke-width:1.5] transition-[stroke-dashoffset] duration-700 ease-out group-hover:[stroke-dashoffset:0] motion-reduce:transition-none"
        />
      </svg>
      <span className="bg-primary/10 text-primary relative flex size-11 items-center justify-center rounded-xl transition-colors duration-500 group-hover:bg-primary/15">
        <Icon />
      </span>
      <h3 className="relative font-semibold">{title}</h3>
      <p className="text-muted-foreground relative text-sm leading-relaxed">
        {description}
      </p>
    </motion.li>
  )
}

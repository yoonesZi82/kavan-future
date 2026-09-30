"use client"

import { motion, type Variants } from "framer-motion"

const EASE = [0.22, 1, 0.36, 1] as const

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  /** Slight upward travel distance in px. */
  y?: number
}

/** Section/block fade-up when it enters the viewport. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

type RevealStaggerProps = {
  children: React.ReactNode
  className?: string
  stagger?: number
}

/** Parent that staggers RevealItem children on scroll-in. */
export function RevealStagger({
  children,
  className,
  stagger = 0.07,
}: RevealStaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -32px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

type RevealItemProps = {
  children: React.ReactNode
  className?: string
}

export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
}

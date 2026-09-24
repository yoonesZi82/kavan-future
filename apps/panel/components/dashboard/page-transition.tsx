"use client"

import { motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"

type PageTransitionProps = {
  children: React.ReactNode
}

const EASE = [0.22, 1, 0.36, 1] as const

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  return (
    // * Soft enter on route change (sidebar + mobile dock)
    <motion.div
      key={pathname}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.32, ease: EASE }
      }
      className="min-w-0"
    >
      {children}
    </motion.div>
  )
}

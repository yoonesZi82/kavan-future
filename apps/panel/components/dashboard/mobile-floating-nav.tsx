"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { PlusIcon } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { navItems, type NavItem } from "@/components/dashboard/nav-items"

const PRIMARY_COUNT = 3
const SPRING = { type: "spring" as const, stiffness: 420, damping: 32 }

const primaryItems = navItems.slice(0, PRIMARY_COUNT)
const moreItems = navItems.slice(PRIMARY_COUNT)

function DockItem({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon
  const className = cn(
    "relative flex h-10 items-center justify-center gap-1.5 rounded-full px-2.5 text-sm transition-colors",
    isActive
      ? "bg-muted font-medium text-foreground"
      : "text-muted-foreground hover:text-foreground",
    !item.enabled && "pointer-events-none opacity-40"
  )
  const body = (
    <>
      <Icon className="size-5 shrink-0" strokeWidth={isActive ? 2.25 : 1.75} />
      <AnimatePresence initial={false}>
        {isActive ? (
          <motion.span
            key="label"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={SPRING}
            className="overflow-hidden whitespace-nowrap text-xs"
          >
            {item.title}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </>
  )
  if (!item.enabled) {
    return <span className={className}>{body}</span>
  }
  return (
    <Link
      href={item.href}
      className={className}
      aria-current={isActive ? "page" : undefined}
      aria-label={item.title}
    >
      {body}
    </Link>
  )
}

export function MobileFloatingNav() {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(false)
  const items = expanded ? moreItems : primaryItems

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
      dir="rtl"
    >
      <div className="pointer-events-auto flex items-center gap-2">
        <motion.nav
          layout
          aria-label="منوی موبایل"
          className="flex items-center gap-0.5 rounded-full border border-border/60 bg-background/80 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          transition={SPRING}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => {
              const isActive = item.enabled && pathname === item.href
              return (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.7, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: -8 }}
                  transition={SPRING}
                >
                  <DockItem item={item} isActive={isActive} />
                </motion.div>
              )
            })}
          </AnimatePresence>
          <div
            className="ms-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-foreground"
            aria-hidden
          >
            م‌ر
          </div>
        </motion.nav>

        <motion.button
          type="button"
          aria-label={expanded ? "بازگشت به منوی اصلی" : "منوی بیشتر"}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
          className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(41,157,127,0.35)]"
          whileTap={{ scale: 0.94 }}
          transition={SPRING}
        >
          <motion.span
            animate={{ rotate: expanded ? 45 : 0 }}
            transition={SPRING}
            className="flex"
          >
            <PlusIcon className="size-6" strokeWidth={2} />
          </motion.span>
        </motion.button>
      </div>
    </div>
  )
}

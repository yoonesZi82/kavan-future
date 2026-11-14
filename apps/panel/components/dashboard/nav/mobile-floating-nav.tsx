"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { PlusIcon } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { cn } from "@workspace/ui/lib/utils"
import { navItems, type NavItem } from "@/components/dashboard/nav/nav-items"

const DOCK_SIZE = 3
const DOCK_STORAGE_KEY = "panel:mobile-dock"
const SPRING = { type: "spring" as const, stiffness: 420, damping: 32 }

const DEFAULT_DOCK = navItems.slice(0, DOCK_SIZE).map((item) => item.title)

function isItemActive(item: NavItem, pathname: string) {
  if (!item.enabled) return false
  if (item.href === "/") return pathname === "/"
  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

function findItem(title: string) {
  return navItems.find((item) => item.title === title)
}

function readStoredDock(): string[] | null {
  try {
    const raw = window.localStorage.getItem(DOCK_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return null
    const titles = parsed.filter(
      (title): title is string =>
        typeof title === "string" && findItem(title)?.enabled === true
    )
    return titles.length === DOCK_SIZE ? titles : null
  } catch {
    return null
  }
}

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
  const router = useRouter()
  const [dock, setDock] = useState<string[]>(DEFAULT_DOCK)
  const [pickerOpen, setPickerOpen] = useState(false)

  useEffect(() => {
    const stored = readStoredDock()
    if (stored) setDock(stored)
  }, [])

  // * Incoming item takes the last slot so the first slots stay stable.
  const placeInDock = useCallback((title: string) => {
    setDock((current) => {
      if (current.includes(title)) return current
      const next = [...current.slice(0, DOCK_SIZE - 1), title]
      try {
        window.localStorage.setItem(DOCK_STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  useEffect(() => {
    const active = navItems.find((item) => isItemActive(item, pathname))
    if (active) placeInDock(active.title)
  }, [pathname, placeInDock])

  const dockItems = useMemo(
    () =>
      dock
        .map((title) => findItem(title))
        .filter((item): item is NavItem => item !== undefined),
    [dock]
  )

  const pickerItems = useMemo(
    () => navItems.filter((item) => !dock.includes(item.title)),
    [dock]
  )

  function handlePick(item: NavItem) {
    if (!item.enabled) return
    placeInDock(item.title)
    setPickerOpen(false)
    router.push(item.href)
  }

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
            {dockItems.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.7, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: -8 }}
                transition={SPRING}
              >
                <DockItem item={item} isActive={isItemActive(item, pathname)} />
              </motion.div>
            ))}
          </AnimatePresence>
          <div
            className="ms-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-foreground"
            aria-hidden
          >
            م‌ر
          </div>
        </motion.nav>

        <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
          <PopoverTrigger
            render={
              <motion.button
                type="button"
                aria-label="منوی بیشتر"
                className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_rgba(41,157,127,0.35)]"
                whileTap={{ scale: 0.94 }}
                transition={SPRING}
              />
            }
          >
            <motion.span
              animate={{ rotate: pickerOpen ? 45 : 0 }}
              transition={SPRING}
              className="flex"
            >
              <PlusIcon className="size-6" strokeWidth={2} />
            </motion.span>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            sideOffset={10}
            dir="rtl"
            className="w-[min(20rem,calc(100vw-1.5rem))] gap-2 rounded-2xl p-2"
          >
            <p className="px-1.5 pt-1 text-xs font-medium text-muted-foreground">
              انتخاب بخش
            </p>
            <div className="grid grid-cols-3 gap-1">
              {pickerItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.title}
                    type="button"
                    disabled={!item.enabled}
                    onClick={() => handlePick(item)}
                    className="flex flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 text-center text-[11px] leading-tight text-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
                  >
                    <Icon className="size-5 shrink-0" strokeWidth={1.75} />
                    <span className="line-clamp-2">{item.title}</span>
                    {!item.enabled ? (
                      <span className="text-[9px] text-muted-foreground">
                        به‌زودی
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

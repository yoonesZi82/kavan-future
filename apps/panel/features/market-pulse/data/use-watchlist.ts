"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"

const STORAGE_KEY = "kavan-watchlist-ids"

/** Seed so the watchlist isn’t empty on first visit. */
const DEFAULT_IDS = [
  "btc-usdt",
  "eth-usdt",
  "gold18-irt",
  "xau-usd",
  "usdt-rls",
] as const

type Listener = () => void

let memoryIds: string[] | null = null
const listeners = new Set<Listener>()

function readIds(): string[] {
  if (typeof window === "undefined") return [...DEFAULT_IDS]
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return [...DEFAULT_IDS]
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return [...DEFAULT_IDS]
    const ids = parsed.filter(
      (item): item is string => typeof item === "string"
    )
    return ids.length > 0 ? ids : [...DEFAULT_IDS]
  } catch {
    return [...DEFAULT_IDS]
  }
}

function getSnapshot(): string[] {
  if (memoryIds === null) memoryIds = readIds()
  return memoryIds
}

function getServerSnapshot(): string[] {
  return [...DEFAULT_IDS]
}

function setIds(next: string[]): void {
  memoryIds = next
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Persisted watchlist market ids — shared across search + panel. */
export function useWatchlist() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    memoryIds = readIds()
    listeners.forEach((listener) => listener())
    setReady(true)
  }, [])

  const add = useCallback((id: string) => {
    const current = getSnapshot()
    if (current.includes(id)) return
    setIds([id, ...current])
  }, [])

  const has = useCallback((id: string) => getSnapshot().includes(id), [ids])

  return { ids, ready, add, has }
}

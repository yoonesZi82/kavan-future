"use client"

import { useEffect } from "react"
import { useQueryClient, type QueryClient } from "@tanstack/react-query"
import { Centrifuge } from "centrifuge"
import { mergeMarketStatsLive } from "@/features/market-pulse/nobitex-parse"
import type { MarketPair } from "@/features/market-pulse/types"
import { queryKeys } from "@/lib/api/query-keys"

const WS_URL = "wss://ws.nobitex.ir/connection/websocket"
const CHANNEL = "public:market-stats-all"

type StatsRow = Record<string, string | boolean | null>
type StatsPatch = Record<string, StatsRow>

type SharedSocket = {
  client: Centrifuge
  subscribers: number
}

let shared: SharedSocket | null = null
let activeQueryClient: QueryClient | null = null

function isStatsPatch(value: unknown): value is StatsPatch {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false
  return Object.values(value).every(
    (row) => row !== null && typeof row === "object" && !Array.isArray(row)
  )
}

function applyPatch(patch: StatsPatch): void {
  if (!activeQueryClient) return
  activeQueryClient.setQueryData<MarketPair[]>(
    queryKeys.marketPulse.markets(),
    (current) => mergeMarketStatsLive(current, patch)
  )
}

function retainSocket(): void {
  if (shared) {
    shared.subscribers += 1
    return
  }
  const client = new Centrifuge(WS_URL)
  const subscription = client.newSubscription(CHANNEL, { delta: "fossil" })
  subscription.on("publication", (ctx) => {
    if (!isStatsPatch(ctx.data)) return
    applyPatch(ctx.data)
  })
  subscription.subscribe()
  client.connect()
  shared = { client, subscribers: 1 }
}

function releaseSocket(): void {
  if (!shared) return
  shared.subscribers -= 1
  if (shared.subscribers > 0) return
  shared.client.disconnect()
  shared = null
}

/** Live Nobitex market-stats via Centrifugo; patches React Query markets cache. */
export function useMarketsLive() {
  const queryClient = useQueryClient()

  useEffect(() => {
    activeQueryClient = queryClient
    retainSocket()
    return () => {
      releaseSocket()
      if (!shared) activeQueryClient = null
    }
  }, [queryClient])
}

"use client"

import { useEffect, useRef } from "react"
import { isBitycleTicker, TICKER_MARKETS } from "./ticker-markets"

const WS_URL = "wss://streamer.bitycle.com/ws/market_data"
const RECONNECT_MS = 2_000
const RECONNECT_MAX_MS = 30_000

type MpMessage = {
  type: "mp"
  d: { p: number; s: string }
}

function isMpMessage(value: unknown): value is MpMessage {
  if (!value || typeof value !== "object") return false
  const row = value as { type?: unknown; d?: unknown }
  if (row.type !== "mp" || !row.d || typeof row.d !== "object") return false
  const data = row.d as { s?: unknown; p?: unknown }
  return typeof data.s === "string" && typeof data.p === "number"
}

function sendJson(socket: WebSocket, payload: unknown): void {
  if (socket.readyState !== WebSocket.OPEN) return
  socket.send(JSON.stringify(payload))
}

function subscribeAll(socket: WebSocket): void {
  for (const market of TICKER_MARKETS) {
    if (!isBitycleTicker(market)) continue
    sendJson(socket, {
      message_type: "subscribe_mp",
      data: {
        source: market.liveSource,
        market: market.ohlcSymbol,
      },
    })
    sendJson(socket, {
      message_type: "subscribe_md",
      data: {
        market: market.ohlcSymbol,
        tf: market.timeFrame,
        source: market.liveSource,
      },
    })
  }
}

type UseTickerLiveArgs = {
  enabled?: boolean
  onPrice: (ohlcSymbol: string, price: number) => void
}

/** Bitycle market_data WS — reconnects; does not wait on HTTP history. */
export function useTickerLive({
  enabled = true,
  onPrice,
}: UseTickerLiveArgs): void {
  const onPriceRef = useRef(onPrice)
  onPriceRef.current = onPrice

  useEffect(() => {
    if (!enabled) return
    let closed = false
    let socket: WebSocket | null = null
    let timer: number | undefined
    let attempt = 0

    const connect = (): void => {
      if (closed) return
      const next = new WebSocket(WS_URL)
      socket = next
      next.addEventListener("open", () => {
        attempt = 0
        subscribeAll(next)
      })
      next.addEventListener("message", (event) => {
        if (typeof event.data !== "string") return
        let parsed: unknown
        try {
          parsed = JSON.parse(event.data)
        } catch {
          return
        }
        if (isMpMessage(parsed)) {
          onPriceRef.current(parsed.d.s, parsed.d.p)
        }
      })
      next.addEventListener("close", () => {
        if (closed) return
        const delay = Math.min(
          RECONNECT_MS * 2 ** attempt,
          RECONNECT_MAX_MS
        )
        attempt += 1
        timer = window.setTimeout(connect, delay)
      })
      next.addEventListener("error", () => {
        next.close()
      })
    }

    connect()
    return () => {
      closed = true
      if (timer !== undefined) window.clearTimeout(timer)
      socket?.close()
    }
  }, [enabled])
}

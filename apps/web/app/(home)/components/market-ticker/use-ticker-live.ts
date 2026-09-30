"use client"

import { useEffect, useRef } from "react"
import { isBitycleTicker, TICKER_MARKETS } from "./ticker-markets"

const WS_URL = "wss://streamer.bitycle.com/ws/market_data"

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

type UseTickerLiveArgs = {
  enabled: boolean
  onPrice: (ohlcSymbol: string, price: number) => void
}

/** Bitycle market_data WS — subscribe_mp (+ md) for ticker prices. */
export function useTickerLive({ enabled, onPrice }: UseTickerLiveArgs): void {
  const onPriceRef = useRef(onPrice)
  onPriceRef.current = onPrice

  useEffect(() => {
    if (!enabled) return
    const socket = new WebSocket(WS_URL)
    socket.addEventListener("open", () => {
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
    })
    socket.addEventListener("message", (event) => {
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
    return () => {
      socket.close()
    }
  }, [enabled])
}

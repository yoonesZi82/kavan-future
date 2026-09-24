import type { MarketCategory } from "@/features/market-analysis/types"
import type { MarketPair } from "@/features/market-pulse/types"

const CRYPTO_SRC = new Set(["btc", "eth", "trx"])
const GOLD_SRC = new Set([
  "gold18",
  "gold24",
  "xau",
  "xag",
  "emami",
  "rob",
  "nim",
  "silver",
])

const PREFERRED_IDS: Record<MarketCategory, readonly string[]> = {
  all: ["btc-usdt", "gold18-irt"],
  bourse: [],
  crypto: ["btc-usdt", "eth-usdt", "trx-usdt"],
  fx: ["usdt-rls"],
  gold: ["gold18-irt", "xau-usd", "gold24-irt"],
}

export function marketMatchesCategory(
  market: MarketPair,
  category: MarketCategory
): boolean {
  if (category === "all") return true
  if (category === "bourse") return market.provider === "tsetmc"
  if (category === "crypto") return CRYPTO_SRC.has(market.src)
  if (category === "fx") return market.src === "usdt" && market.dst === "rls"
  if (category === "gold") return GOLD_SRC.has(market.src)
  return true
}

/** Prefer a flagship symbol per tab; fall back to first match. */
export function pickMarketForCategory(
  markets: MarketPair[],
  category: MarketCategory
): MarketPair | null {
  const matched = markets.filter((item) =>
    marketMatchesCategory(item, category)
  )
  if (matched.length === 0) return null
  for (const id of PREFERRED_IDS[category]) {
    const hit = matched.find((item) => item.id === id)
    if (hit) return hit
  }
  return matched[0] ?? null
}

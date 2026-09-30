import { NextResponse, type NextRequest } from "next/server"

const TSE_URL = "https://cdn.tsetmc.com/api/MarketData/GetMarketOverview/1"

// * Inject browser-like headers — bare Vercel rewrite gets 403/timeout from TSETMC
export function proxy(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname !== "/api/tsetmc-overview") {
    return NextResponse.next()
  }
  const headers = new Headers(request.headers)
  headers.set(
    "User-Agent",
    "Mozilla/5.0 (compatible; KavanWeb/1.0; +https://vercel.com)"
  )
  headers.set("Referer", "https://www.tsetmc.com/")
  headers.set("Accept", "application/json")
  return NextResponse.rewrite(TSE_URL, { request: { headers } })
}

export const config = {
  matcher: ["/api/tsetmc-overview"],
}

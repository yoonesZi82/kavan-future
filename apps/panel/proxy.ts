import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/market-pulse", request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}

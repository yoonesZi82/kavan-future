import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/** Pass-through — dashboard lives at `/` under the dashboard layout. */
export function proxy(_request: NextRequest): NextResponse {
  return NextResponse.next()
}

export const config = {
  matcher: [],
}

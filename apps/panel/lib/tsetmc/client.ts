import axios from "axios"

// * Same-origin `/api/tsetmc-overview` → Next rewrite → TSETMC CDN (no browser CORS)
export const tsetmcClient = axios.create({
  baseURL: "",
  headers: { Accept: "application/json" },
})

import axios from "axios"

// * Same-origin `/api/market-chart` → Next rewrite → Bitycle (no browser CORS)
export const bitycleClient = axios.create({
  baseURL: "",
  headers: { Accept: "application/json" },
})

import axios from "axios"

// * Same-origin `/api/market-flow` → Next rewrite → tradersarena (no browser CORS)
export const tradersarenaClient = axios.create({
  baseURL: "",
  headers: { Accept: "application/json, text/plain, */*" },
})

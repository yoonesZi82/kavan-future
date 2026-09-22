import axios from "axios"

// * TSETMC CDN — browser axios (no Next API proxy)
export const tsetmcClient = axios.create({
  baseURL: "https://cdn.tsetmc.com",
  headers: { Accept: "application/json" },
})

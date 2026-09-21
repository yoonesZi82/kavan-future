import axios from "axios"

export const nobitexClient = axios.create({
  baseURL: "https://apiv2.nobitex.ir",
  headers: { Accept: "application/json" },
})

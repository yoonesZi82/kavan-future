import axios from "axios"

export const bitycleClient = axios.create({
  baseURL: "https://widget-data.bitycle.com",
  headers: { Accept: "application/json" },
})

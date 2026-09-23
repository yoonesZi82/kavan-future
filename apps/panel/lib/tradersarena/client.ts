import axios from "axios"

export const tradersarenaClient = axios.create({
  baseURL: "https://tradersarena.ir",
  headers: { Accept: "application/json, text/plain, */*" },
})

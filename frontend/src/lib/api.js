export const API_URL = import.meta.env.DEV ? "" : (import.meta.env.VITE_API_URL ?? "")

export const REQUEST_TIMEOUT_MS = 30000

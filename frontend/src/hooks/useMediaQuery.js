import { useSyncExternalStore } from "react"

const subscribers = new Map()

// One stable subscribe function per query, so React never resubscribes.
function subscriberFor(query) {
  if (!subscribers.has(query)) {
    subscribers.set(query, onChange => {
      const media = window.matchMedia(query)
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    })
  }
  return subscribers.get(query)
}

export function useMediaQuery(query) {
  return useSyncExternalStore(
    subscriberFor(query),
    () => window.matchMedia(query).matches,
    () => false
  )
}

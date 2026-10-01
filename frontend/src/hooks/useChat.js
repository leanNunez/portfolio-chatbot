import { useEffect, useState } from "react"
import { useLang } from "../context/language"
import { API_URL, REQUEST_TIMEOUT_MS } from "../lib/api"
import { DANCE_MS } from "../lib/robotMood"

// crypto.randomUUID only exists in secure contexts (HTTPS/localhost); plain-HTTP LAN access lacks it.
let idCounter = 0
const newId = () => globalThis.crypto?.randomUUID?.() ?? `msg-${Date.now()}-${++idCounter}`

/**
 * Chat state plus a truthful backend status.
 * status: "checking" | "online" | "offline"
 *
 * The welcome message has no stored content while the visitor hasn't asked
 * anything, so it follows the active language. Its text is frozen on the
 * first send so a later language switch never rewrites the conversation.
 *
 * danceUntil: deadline (epoch ms) of the mascot's current dance, or null.
 * It opens when an answer lands or on dance(), and clears itself on expiry.
 */
export function useChat() {
  const { t } = useLang()
  const [messages, setMessages] = useState(() => [
    { id: newId(), role: "assistant", kind: "welcome" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState("checking")
  const [danceUntil, setDanceUntil] = useState(null)

  useEffect(() => {
    if (danceUntil == null) return
    const timer = setTimeout(() => setDanceUntil(null), Math.max(0, danceUntil - Date.now()))
    return () => clearTimeout(timer)
  }, [danceUntil])

  function dance() {
    setDanceUntil(Date.now() + DANCE_MS)
  }

  useEffect(() => {
    let active = true
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    fetch(`${API_URL}/api/status`, { signal: controller.signal })
      .then(res => (res.ok ? "online" : "offline"))
      .catch(() => "offline")
      .then(next => {
        // A chat result may have arrived first; it is more recent evidence.
        if (active) setStatus(current => (current === "checking" ? next : current))
      })
      .finally(() => clearTimeout(timer))

    return () => {
      active = false
      clearTimeout(timer)
      controller.abort()
    }
  }, [])

  function pushError(errorType) {
    setMessages(prev => [...prev, { id: newId(), role: "assistant", kind: "error", errorType }])
  }

  async function request(text) {
    setIsLoading(true)
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
    const startedAt = performance.now()

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      })

      if (res.status === 429) {
        setStatus("online")
        pushError("rateLimit")
        return
      }

      if (!res.ok) {
        setStatus(res.status >= 500 ? "offline" : "online")
        pushError("server")
        return
      }

      const data = await res.json()
      const latency = (performance.now() - startedAt) / 1000
      setStatus("online")
      setMessages(prev => [
        ...prev,
        {
          id: newId(),
          role: "assistant",
          content: data.answer,
          sources: data.sources ?? [],
          latency,
        },
      ])
      dance()
    } catch (err) {
      setStatus("offline")
      pushError(err?.name === "AbortError" ? "timeout" : "server")
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  function sendMessage(text) {
    if (!text.trim() || isLoading) return

    setMessages(prev => [
      ...prev.map(m =>
        m.kind === "welcome" && m.content == null ? { ...m, content: t.welcomeMessage } : m
      ),
      { id: newId(), role: "user", content: text },
    ])
    request(text)
  }

  function retry() {
    if (isLoading) return
    const lastUser = [...messages].reverse().find(m => m.role === "user")
    if (!lastUser) return

    setMessages(prev => (prev.at(-1)?.kind === "error" ? prev.slice(0, -1) : prev))
    request(lastUser.content)
  }

  return { messages, isLoading, status, danceUntil, sendMessage, retry, dance }
}

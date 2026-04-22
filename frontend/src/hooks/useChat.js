import { useState, useEffect } from "react"
import { useLang } from "../context/LanguageContext"

const API_URL = import.meta.env.VITE_API_URL

export function useChat() {
  const { t } = useLang()
  const [messages, setMessages] = useState([{ role: "assistant", content: t.welcomeMessage }])

  useEffect(() => {
    setMessages([{ role: "assistant", content: t.welcomeMessage }])
  }, [t.welcomeMessage])
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage(text) {
    if (!text.trim() || isLoading) return

    setMessages(prev => [...prev, { role: "user", content: text }])
    setIsLoading(true)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 30000)

      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (res.status === 429) {
        setMessages(prev => [...prev, { role: "assistant", content: t.errorRateLimit }])
        return
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: data.answer, sources: data.sources },
      ])
    } catch (err) {
      const msg = err?.name === "AbortError" ? t.errorTimeout : t.errorServer
      setMessages(prev => [...prev, { role: "assistant", content: msg }])
    } finally {
      setIsLoading(false)
    }
  }

  return { messages, isLoading, sendMessage }
}

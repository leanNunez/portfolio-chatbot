import { useChat } from "../hooks/useChat"
import { getRobotMood } from "../lib/robotMood"
import { ChatContext } from "./chat"

// One chat session for the whole app; the mascot's mood is derived here
// from the same state the conversation renders.
export function ChatProvider({ children }) {
  const chat = useChat()
  const mood = getRobotMood({
    status: chat.status,
    isLoading: chat.isLoading,
    lastMessage: chat.messages.at(-1),
    danceUntil: chat.danceUntil,
  })

  return <ChatContext value={{ ...chat, mood }}>{children}</ChatContext>
}

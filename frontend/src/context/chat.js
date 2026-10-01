import { createContext, useContext } from "react"

export const ChatContext = createContext(null)

/** Shared chat state: messages, status, actions and the derived robot mood. */
export function useChatState() {
  return useContext(ChatContext)
}

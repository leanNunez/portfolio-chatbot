import { ChatWindow } from "./components/ChatWindow"
import { ProfilePanel } from "./components/ProfilePanel"
import { LanguageProvider } from "./context/LanguageContext"

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex h-dvh w-screen bg-zinc-950 overflow-hidden m-0 p-0">
        <ProfilePanel />
        <ChatWindow />
      </div>
    </LanguageProvider>
  )
}

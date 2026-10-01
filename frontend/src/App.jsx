import { ChatWindow } from "./components/ChatWindow"
import { ProfilePanel } from "./components/ProfilePanel"
import { ProfileBanner } from "./components/ProfileBanner"
import { LanguageProvider } from "./context/LanguageContext"
import { ChatProvider } from "./context/ChatContext"

export default function App() {
  return (
    <LanguageProvider>
      <ChatProvider>
        <div className="fixed inset-0 flex flex-col overflow-clip bg-bg lg:flex-row">
          <ProfilePanel />
          <ProfileBanner />
          <main className="flex min-h-0 flex-1 flex-col">
            <ChatWindow />
          </main>
        </div>
      </ChatProvider>
    </LanguageProvider>
  )
}

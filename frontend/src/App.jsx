import { ChatWindow } from "./components/ChatWindow"
import { ProfilePanel } from "./components/ProfilePanel"
import { ProfileBanner } from "./components/ProfileBanner"
import { LanguageProvider } from "./context/LanguageContext"

export default function App() {
  return (
    <LanguageProvider>
      <div className="flex flex-col lg:flex-row h-full w-full bg-zinc-950 overflow-hidden">
        <ProfilePanel />
        <div className="flex-1 flex flex-col min-h-0">
          <ProfileBanner />
          <ChatWindow />
        </div>
      </div>
    </LanguageProvider>
  )
}

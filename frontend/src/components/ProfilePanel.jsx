import { ProfileContent } from "./ProfileContent"
import { useLang } from "../context/language"

// Fixed side panel for lg+.
export function ProfilePanel() {
  const { t } = useLang()

  return (
    <aside
      aria-label={t.profileLabel}
      className="log-scroll relative hidden h-full w-80 shrink-0 flex-col gap-8 overflow-y-auto border-r border-line bg-surface p-8 lg:flex xl:w-96"
    >
      <ProfileContent level={1} />
    </aside>
  )
}

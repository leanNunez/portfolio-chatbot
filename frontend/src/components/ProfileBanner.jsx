import { Monogram } from "./Monogram"
import { GitHubIcon, GlobeIcon, LinkedInIcon, MailIcon } from "./icons"
import { useLang } from "../context/language"
import { PROFILE_LINKS } from "../lib/profile"

const iconLinkClass =
  "inline-flex size-10 items-center justify-center rounded-md text-text-2 transition-colors hover:bg-raised hover:text-text active:bg-bg"

// Compact profile for tablets (md..lg). Phones use the header's LN button and
// ProfileDrawer; lg+ uses the side panel.
export function ProfileBanner() {
  const { t } = useLang()

  return (
    <section
      aria-label={t.profileLabel}
      className="flex shrink-0 items-center gap-3 border-b border-line bg-surface px-4 pb-2 pt-safe max-md:hidden lg:hidden"
    >
      <Monogram size="sm" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-mono text-base font-semibold text-text">Leandro Nuñez</h1>
        <p className="text-balance text-xs leading-tight text-text-2">{t.role}</p>
      </div>
      <ul className="flex shrink-0 items-center gap-1">
        <li>
          <a href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label={t.githubLabel} className={iconLinkClass}>
            <GitHubIcon className="size-5" />
          </a>
        </li>
        <li>
          <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t.linkedinLabel} className={iconLinkClass}>
            <LinkedInIcon className="size-5" />
          </a>
        </li>
        <li>
          <a href={PROFILE_LINKS.portfolio} target="_blank" rel="noopener" aria-label={t.portfolioLabel} className={iconLinkClass}>
            <GlobeIcon className="size-5" />
          </a>
        </li>
        <li>
          <a href={PROFILE_LINKS.email} aria-label={t.emailLabel} className={iconLinkClass}>
            <MailIcon className="size-5" />
          </a>
        </li>
      </ul>
    </section>
  )
}

import { useId } from "react"
import { Monogram } from "./Monogram"
import { GitHubIcon, GlobeIcon, LinkedInIcon, MailIcon } from "./icons"
import { useLang } from "../context/language"
import { EMAIL, PROFILE_LINKS, STACK } from "../lib/profile"

const linkClass =
  "flex min-h-10 items-center gap-3 rounded-md px-2 font-mono text-xs text-text-2 transition-colors hover:bg-raised hover:text-text active:bg-bg"

/**
 * Full profile body shared by the desktop side panel and the phone drawer, so
 * the two can't drift. Renders a fragment: the container owns layout (flex
 * column + gap) and scrolling, and must be positioned so the sr-only spans in
 * the links stay inside it.
 * `level` is the name heading level; section headings sit one below it.
 */
export function ProfileContent({ level = 1, nameId }) {
  const { t } = useLang()
  const ids = useId()
  const Name = `h${level}`
  const Section = `h${level + 1}`

  return (
    <>
      <div className="flex flex-col gap-4">
        <Monogram size="lg" />
        <div className="flex flex-col gap-2">
          <Name id={nameId} className="font-mono text-4xl font-semibold tracking-tight text-text">
            <span className="block">Leandro</span>
            <span className="block">Nuñez</span>
          </Name>
          <p className="text-lg text-text-2">{t.role}</p>
          <p className="font-mono text-xs text-muted">{t.location}</p>
        </div>
        <p className="flex items-center gap-2 font-mono text-xs text-text-2">
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          {t.available}
        </p>
      </div>

      <div className="flex flex-col gap-3 text-base text-text-2">
        <p>{t.bio1}</p>
        <p>{t.bio2}</p>
      </div>

      <section aria-labelledby={`${ids}-stack`} className="flex flex-col gap-3">
        <Section id={`${ids}-stack`} className="font-mono text-xs uppercase tracking-widest text-muted">
          {t.stack}
        </Section>
        <ul className="flex flex-wrap gap-2">
          {STACK.map(skill => (
            <li key={skill} className="rounded-sm border border-line bg-raised px-2 py-1 font-mono text-xs text-text-2">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${ids}-contact`} className="mt-auto flex flex-col gap-2 border-t border-line pt-6">
        <Section id={`${ids}-contact`} className="font-mono text-xs uppercase tracking-widest text-muted">
          {t.contact}
        </Section>
        <ul className="-mx-2 flex flex-col gap-1">
          <li>
            <a href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <GitHubIcon className="size-4 shrink-0" />
              GitHub: leanNunez
              <span className="sr-only"> {t.newTab}</span>
            </a>
          </li>
          <li>
            <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <LinkedInIcon className="size-4 shrink-0" />
              LinkedIn: lean-nunez
              <span className="sr-only"> {t.newTab}</span>
            </a>
          </li>
          <li>
            {/* Followed link (no nofollow/noreferrer) on purpose: SEO backlink to the portfolio. */}
            <a href={PROFILE_LINKS.portfolio} target="_blank" rel="noopener" className={linkClass}>
              <GlobeIcon className="size-4 shrink-0" />
              Portfolio: leannunez.github.io
              <span className="sr-only"> {t.newTab}</span>
            </a>
          </li>
          <li>
            <a href={PROFILE_LINKS.email} className={linkClass}>
              <MailIcon className="size-4 shrink-0" />
              {EMAIL}
            </a>
          </li>
        </ul>
      </section>
    </>
  )
}

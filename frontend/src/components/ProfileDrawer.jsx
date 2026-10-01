import { useEffect, useId, useRef, useState } from "react"
import { Monogram } from "./Monogram"
import { ProfileContent } from "./ProfileContent"
import { CloseIcon } from "./icons"
import { useLang } from "../context/language"
import { useMediaQuery } from "../hooks/useMediaQuery"

const HISTORY_KEY = "profileDrawer"

/**
 * Phone-only (below md) "LN" button for the chat header plus the profile
 * drawer it opens. The drawer is a native modal <dialog> (focus trap, Esc,
 * inert background, focus return).
 *
 * Back button: opening pushes a history entry tagged with a per-open token.
 * - Back pressed: popstate closes the dialog; the entry is already gone.
 * - Closed any other way (X, backdrop, Esc, Android close request, resize to
 *   md+): the dialog's close event calls history.back() to consume the entry,
 *   but only while that tagged entry is still current, so it never runs twice
 *   and never leaves the page.
 */
export function ProfileDrawer() {
  const { t } = useLang()
  const nameId = useId()
  const dialogRef = useRef(null)
  const buttonRef = useRef(null)
  const tokenRef = useRef(null)
  const [open, setOpen] = useState(false)
  const isPhone = useMediaQuery("(max-width: 47.99rem)")

  // Back button closes the drawer.
  useEffect(() => {
    if (!open) return
    const onPopState = () => dialogRef.current?.close()
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [open])

  // The drawer only exists below md; growing past it closes the drawer.
  useEffect(() => {
    if (!isPhone) dialogRef.current?.close()
  }, [isPhone])

  function show() {
    const dialog = dialogRef.current
    if (!dialog || dialog.open) return
    const token = crypto.randomUUID?.() ?? String(Date.now())
    tokenRef.current = token
    window.history.pushState({ ...window.history.state, [HISTORY_KEY]: token }, "")
    dialog.showModal()
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
    const token = tokenRef.current
    tokenRef.current = null
    if (token && window.history.state?.[HISTORY_KEY] === token) window.history.back()
    buttonRef.current?.focus()
  }

  // Clicks on the ::backdrop are dispatched to the <dialog> itself; the inner
  // wrapper fills the dialog box, so a click inside never has it as target.
  function handleClick(event) {
    if (event.target === event.currentTarget) event.currentTarget.close()
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t.openProfile}
        className="group shrink-0 touch-manipulation rounded-md md:hidden"
      >
        <Monogram
          size="md"
          className="border-accent/70 transition-colors group-hover:border-accent group-hover:bg-surface group-active:bg-bg"
        />
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={nameId}
        onClose={handleClose}
        onClick={handleClick}
        className="profile-drawer log-scroll m-0 h-dvh max-h-none w-[85%] max-w-90 overflow-y-auto overscroll-contain border-r border-line bg-surface p-0 text-text"
      >
        <div className="relative flex min-h-full flex-col gap-8 px-6 pb-safe pt-safe">
          {/* Overlaps the monogram row (right side), first in tab order. */}
          <div className="pointer-events-none relative z-10 -mr-2 -mb-18 flex justify-end">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={t.closeProfile}
              className="pointer-events-auto inline-flex size-10 touch-manipulation items-center justify-center rounded-md text-text-2 transition-colors hover:bg-raised hover:text-text active:bg-bg"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
          <ProfileContent level={2} nameId={nameId} />
        </div>
      </dialog>
    </>
  )
}

import { useEffect, useState } from "react"
import { LanguageContext, translations } from "./language"

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es")
  const t = translations[lang]
  const toggle = () => setLang(l => (l === "es" ? "en" : "es"))

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

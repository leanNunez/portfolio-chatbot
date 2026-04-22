import { createContext, useContext, useState } from "react"

const translations = {
  es: {
    assistantName: "Asistente IA",
    assistantSubtitle: "Preguntame sobre Leandro Nuñez",
    online: "En línea",
    suggestions: "Sugerencias",
    suggestedQuestions: [
      "¿Qué tecnologías maneja?",
      "¿En qué proyectos trabajó?",
      "¿Está disponible para trabajar?",
    ],
    inputPlaceholder: "Preguntame algo sobre Leandro...",
    send: "Enviar",
    available: "Disponible para trabajar",
    stack: "Stack",
    profileSubtitle: "Preguntale al asistente sobre mi experiencia, proyectos y habilidades.",
    bio1: "Estudiante de Programación (UTN), graduándome en 2026.",
    bio2: "Apasionado por construir productos con impacto real — del diseño al deploy.",
    thankYou: "Gracias por estar aquí y tomarte el tiempo de conocerme.",
    role: "Full Stack Developer",
    location: "UTN FRT · Tucumán, Argentina",
    welcomeMessage: "¡Hola! Soy el asistente de Leandro Nuñez. Preguntame sobre su experiencia, proyectos, habilidades o cualquier cosa de su perfil profesional.",
    errorRateLimit: "Tranquilo, tranquilo... estás mandando muchos mensajes seguidos. Esperá un minuto y seguimos. 😅",
    errorServer: "No pude conectarme con el servidor. Intentá de nuevo en un momento.",
    errorTimeout: "El servidor está tardando más de lo normal — probablemente despertándose. Intentá de nuevo en unos segundos. ☕",
  },
  en: {
    assistantName: "AI Assistant",
    assistantSubtitle: "Ask me about Leandro Nuñez",
    online: "Online",
    suggestions: "Suggestions",
    suggestedQuestions: [
      "What technologies does he know?",
      "What projects has he worked on?",
      "Is he available to work?",
    ],
    inputPlaceholder: "Ask me something about Leandro...",
    send: "Send",
    available: "Available for work",
    stack: "Stack",
    profileSubtitle: "Ask the assistant about my experience, projects and skills.",
    bio1: "Programming student (UTN), graduating in 2026.",
    bio2: "Passionate about building products with real impact — from design to deploy.",
    thankYou: "Thank you for being here and taking the time to get to know me.",
    role: "Full Stack Developer",
    location: "UTN FRT · Tucumán, Argentina",
    welcomeMessage: "Hi! I'm Leandro Nuñez's assistant. Ask me about his experience, projects, skills or anything about his professional profile.",
    errorRateLimit: "Easy there... you're sending too many messages at once. Wait a minute and we'll continue. 😅",
    errorServer: "Couldn't connect to the server. Please try again in a moment.",
    errorTimeout: "The server is taking longer than usual — probably waking up. Try again in a few seconds. ☕",
  },
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es")
  const t = translations[lang]
  const toggle = () => setLang(l => l === "es" ? "en" : "es")

  return (
    <LanguageContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}

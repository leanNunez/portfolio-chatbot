import { createContext, useContext } from "react"

export const translations = {
  es: {
    chatTitle: "Preguntá por Leandro",
    chatSubtitle: "Responde desde su CV y sus proyectos",
    statusChecking: "Conectando",
    statusOnline: "En línea",
    statusOffline: "Sin conexión",
    statusLabel: "Estado del servidor",
    switchLanguage: "Cambiar idioma a inglés",
    conversationLabel: "Conversación con el asistente",
    profileLabel: "Perfil de Leandro Nuñez",
    openProfile: "Ver perfil de Leandro Nuñez",
    closeProfile: "Cerrar perfil",
    suggestions: "Para empezar",
    suggestedQuestions: [
      "¿Con qué stack trabaja?",
      "¿Qué tiene en producción con LeanDev?",
      "¿En qué proyectos trabajó?",
      "¿Está abierto a nuevas oportunidades?",
    ],
    inputLabel: "Tu pregunta",
    inputPlaceholder: "Escribí una pregunta sobre Leandro…",
    send: "Enviar",
    retry: "Reintentar",
    you: "Vos:",
    assistant: "Asistente:",
    typing: "El asistente de Leandro está escribiendo",
    logLabel: (sources, seconds) =>
      sources.length > 0
        ? `Fuentes: ${sources.join(", ")}. Tiempo de respuesta ${seconds} segundos`
        : `Tiempo de respuesta ${seconds} segundos`,
    available: "Disponible para trabajar",
    stack: "Stack",
    contact: "Contacto",
    role: "Desarrollador Full Stack · Backend",
    location: "Tucumán, Argentina",
    bio1:
      "Desarrollador freelance en LeanDev. Su sistema de gestión de entregas para una distribuidora de bebidas se usa en producción todos los días: FastAPI con arquitectura hexagonal, PostgreSQL, una PWA offline-first y más de 1.100 tests.",
    bio2:
      "Cursa el último año de la Tecnicatura Universitaria en Programación en la UTN FRT, con egreso previsto para 2026/2027.",
    newTab: "(abre en una pestaña nueva)",
    githubLabel: "GitHub de Leandro Nuñez (abre en una pestaña nueva)",
    linkedinLabel: "LinkedIn de Leandro Nuñez (abre en una pestaña nueva)",
    portfolioLabel: "Portfolio de Leandro Nuñez (abre en una pestaña nueva)",
    emailLabel: "Escribirle a Leandro: lean.p.dev@gmail.com",
    welcomeMessage:
      "Hola. Este asistente responde preguntas sobre Leandro Nuñez a partir de su CV y de sus proyectos: su trabajo en LeanDev, el stack que usa y su formación en la UTN. Debajo de cada respuesta figura de qué fuentes salió y cuánto tardó.",
    robotLabel: "Hacé bailar al asistente",
    robotHint: "¡Tocame!",
    robotName: "asistente",
    robotMood: {
      idle: "en línea",
      connecting: "conectando…",
      thinking: "pensando…",
      dancing: "bailando",
      sleeping: "durmiendo — backend sin conexión",
      worried: "algo salió mal",
      running: "corriendo…",
    },
    errorTitle: "Error",
    errorRateLimit: "Demasiados mensajes seguidos. Esperá un minuto y volvé a intentar.",
    errorServer: "No se pudo obtener una respuesta del servidor.",
    errorTimeout:
      "El servidor tardó más de 30 segundos en responder; puede estar arrancando. Probá de nuevo en unos segundos.",
  },
  en: {
    chatTitle: "Ask about Leandro",
    chatSubtitle: "Answers from his CV and projects",
    statusChecking: "Connecting",
    statusOnline: "Online",
    statusOffline: "Offline",
    statusLabel: "Server status",
    switchLanguage: "Switch language to Spanish",
    conversationLabel: "Conversation with the assistant",
    profileLabel: "Leandro Nuñez's profile",
    openProfile: "View Leandro Nuñez's profile",
    closeProfile: "Close profile",
    suggestions: "To get started",
    suggestedQuestions: [
      "What's his tech stack?",
      "What does he run in production at LeanDev?",
      "What projects has he built?",
      "Is he open to new roles?",
    ],
    inputLabel: "Your question",
    inputPlaceholder: "Ask a question about Leandro…",
    send: "Send",
    retry: "Retry",
    you: "You:",
    assistant: "Assistant:",
    typing: "Leandro's assistant is typing",
    logLabel: (sources, seconds) =>
      sources.length > 0
        ? `Sources: ${sources.join(", ")}. Response time ${seconds} seconds`
        : `Response time ${seconds} seconds`,
    available: "Available for work",
    stack: "Stack",
    contact: "Contact",
    role: "Full Stack Developer · Backend",
    location: "Tucumán, Argentina",
    bio1:
      "Freelance developer at LeanDev. His delivery-management system for a beverage distributor runs in production every day: hexagonal FastAPI, PostgreSQL, an offline-first PWA and 1,100+ tests.",
    bio2:
      "In the final year of the Tecnicatura Universitaria en Programación (university programming degree) at UTN FRT, expected to graduate in 2026/2027.",
    newTab: "(opens in a new tab)",
    githubLabel: "Leandro Nuñez on GitHub (opens in a new tab)",
    linkedinLabel: "Leandro Nuñez on LinkedIn (opens in a new tab)",
    portfolioLabel: "Leandro Nuñez's portfolio (opens in a new tab)",
    emailLabel: "Email Leandro: lean.p.dev@gmail.com",
    welcomeMessage:
      "Hi. This assistant answers questions about Leandro Nuñez using his CV and his projects: his work at LeanDev, the stack he uses and his studies at UTN. Under each answer you'll see which sources it came from and how long it took.",
    robotLabel: "Make the assistant dance",
    robotHint: "Tap me!",
    robotName: "assistant",
    robotMood: {
      idle: "online",
      connecting: "connecting…",
      thinking: "thinking…",
      dancing: "dancing",
      sleeping: "sleeping — backend offline",
      worried: "something went wrong",
      running: "running…",
    },
    errorTitle: "Error",
    errorRateLimit: "Too many messages in a row. Wait a minute and try again.",
    errorServer: "Couldn't get a response from the server.",
    errorTimeout:
      "The server took more than 30 seconds to respond; it may be starting up. Try again in a few seconds.",
  },
}

export const LanguageContext = createContext(null)

export function useLang() {
  return useContext(LanguageContext)
}

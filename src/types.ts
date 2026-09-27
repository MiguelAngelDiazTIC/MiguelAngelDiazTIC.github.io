export type Lang = 'es' | 'en'

export type Localized<T = string> = Record<Lang, T>

export type Project = {
  slug: string
  title: string
  description: Localized
  /** Ruta dentro de /public, p. ej. "/projects/gym-app.webp". Si falta se muestra un fondo con el título. */
  image?: string
  /** Capturas de móvil (390×844). Si hay, se muestran como teléfonos en vez de `image`. */
  screens?: string[]
  tags: string[]
  demo?: string
  repo?: string
  /** Ocupa dos columnas en el grid */
  featured?: boolean
  /** "AAAA-MM", se ordena de más nuevo a más antiguo */
  date: string
}

export type TechTest = {
  slug: string
  title: Localized
  /** p. ej. "Live coding", "Prueba para casa" */
  format: Localized
  level: Localized
  /** Qué pedía la prueba */
  brief: Localized
  /** Cómo la resolviste, en puntos cortos */
  solution: Localized<string[]>
  tags: string[]
  repo?: string
  demo?: string
  /** Resuelta sin ayuda de IA */
  noAI?: boolean
  /** "AAAA-MM", se ordena de más nuevo a más antiguo */
  date: string
}

export type Experience = {
  role: Localized
  company: string
  place: Localized
  period: Localized
  /** Varias etapas en la misma empresa */
  stints?: { period: Localized; place: Localized }[]
  bullets: Localized<string[]>
  kind: 'dev' | 'it'
}

export type Education = {
  title: Localized
  school: string
  period: string
}

export type SkillGroup = {
  name: Localized
  items: string[]
}

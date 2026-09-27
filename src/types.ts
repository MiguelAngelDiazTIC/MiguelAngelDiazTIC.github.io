export type Lang = 'es' | 'en'

export type Localized<T = string> = Record<Lang, T>

export type Project = {
  slug: string
  title: string
  description: Localized
  /** Ruta dentro de /public, p. ej. "/projects/gym-app.webp". Si falta se muestra un fondo con el título. */
  image?: string
  tags: string[]
  demo?: string
  repo?: string
  /** Ocupa dos columnas en el grid */
  featured?: boolean
  /** "AAAA-MM", se ordena de más nuevo a más antiguo */
  date: string
}

export type Experience = {
  role: Localized
  company: string
  place: Localized
  period: Localized
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

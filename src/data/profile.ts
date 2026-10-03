import type { Localized } from '../types'

export const profile = {
  name: 'Miguel Ángel',
  fullName: 'Miguel Ángel Díaz Gutiérrez',
  role: { es: 'Desarrollador front-end', en: 'Front-end developer' } as Localized,
  bio: {
    es: 'Construyo interfaces responsive y accesibles con JavaScript y TypeScript. He trabajado en Accenture desarrollando componentes para aplicaciones de BBVA, y antes fui jugador profesional de eSports.',
    en: 'I build responsive, accessible interfaces with JavaScript and TypeScript. I worked at Accenture building components for BBVA applications, and before that I was a professional eSports player.',
  } as Localized,
  location: 'Madrid',
  /** Tarjeta de eSports del bento: de dónde vengo */
  esports: {
    label: { es: 'Vengo de los eSports', en: 'eSports background' } as Localized,
    teams: ['Movistar Riders', 'AYM Esports', 'Five Media Clan', 'Falke Esports'],
    text: {
      es: 'Competí como jugador profesional. Hoy sigo esa escena con Mercado Fichajes VLR.',
      en: 'I competed as a professional player. Today I follow that scene with Mercado Fichajes VLR.',
    } as Localized,
  },
  email: 'miguelangeldiaztic@gmail.com',
  github: 'https://github.com/MiguelAngelDiazTIC',
  linkedin: 'https://www.linkedin.com/in/miguel-ángel-díaz-gutiérrez-634605411',
  cv: '/cv/CV_Miguel_Angel_Diaz.pdf',
  /** Pon tu foto en /public y cambia esta ruta, p. ej. '/me.webp'. Sin foto se muestran las iniciales. */
  photo: '/me.jpg' as string | undefined,
  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
    { name: { es: 'Inglés', en: 'English' }, level: { es: 'C1', en: 'C1' } },
    { name: { es: 'Francés', en: 'French' }, level: { es: 'B1', en: 'B1' } },
  ] as { name: Localized; level: Localized }[],
}

import type { Localized } from '../types'

export const profile = {
  name: 'Miguel Ángel',
  fullName: 'Miguel Ángel Díaz Gutiérrez',
  role: { es: 'Desarrollador Front-End', en: 'Front-End Developer' } as Localized,
  bio: {
    es: 'Construyo interfaces responsive y accesibles con JavaScript y TypeScript. He trabajado en Accenture desarrollando componentes para aplicaciones de BBVA, y antes di soporte IT en equipos de eSports de alto rendimiento.',
    en: 'I build responsive, accessible interfaces with JavaScript and TypeScript. I worked at Accenture building components for BBVA applications, and before that I did IT support for high-performance eSports teams.',
  } as Localized,
  /** Texto de la tarjeta "Ahora mismo" */
  now: {
    es: 'Buscando mi primer puesto como desarrollador front-end junior.',
    en: 'Looking for my first junior front-end developer role.',
  } as Localized,
  location: 'Madrid',
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
  featuredStack: ['TypeScript', 'JavaScript', 'React', 'LitElement', 'HTML5', 'CSS3', 'Git'],
}

import type { Experience } from '../types'

export const experience: Experience[] = [
  {
    role: { es: 'Desarrollador front-end (prácticas)', en: 'Front-end developer (internship)' },
    company: 'Accenture · BBVA',
    place: { es: 'Madrid', en: 'Madrid' },
    period: { es: '2025 – 2026', en: '2025 – 2026' },
    /** Dos etapas en la misma empresa: una sola tarjeta con ambas fechas */
    stints: [
      { period: { es: 'Mar – Jun 2026', en: 'Mar – Jun 2026' }, place: { es: 'Remoto · Madrid', en: 'Remote · Madrid' } },
      { period: { es: 'May 2025', en: 'May 2025' }, place: { es: 'Madrid', en: 'Madrid' } },
    ],
    bullets: {
      es: [
        'Interfaces y componentes front-end para aplicaciones bancarias con JavaScript y TypeScript.',
        'Criterios de calidad, accesibilidad, usabilidad y diseño responsive.',
        'Reuniones ágiles y revisiones de código en equipos multidisciplinares.',
      ],
      en: [
        'Front-end interfaces and components for banking applications with JavaScript and TypeScript.',
        'Quality, accessibility, usability and responsive design standards.',
        'Agile ceremonies and code reviews in cross-functional teams.',
      ],
    },
    kind: 'dev',
  },
  {
    role: { es: 'Técnico informático', en: 'IT Technician' },
    company: 'AYM Esports',
    place: { es: 'Barcelona', en: 'Barcelona' },
    period: { es: 'Dic 2022 – May 2023', en: 'Dec 2022 – May 2023' },
    bullets: {
      es: [
        'Instalación, mantenimiento y optimización de hardware, software y equipos de competición.',
        'Soporte técnico en bootcamps, torneos y retransmisiones en directo.',
      ],
      en: [
        'Installed, maintained and optimised competition hardware, software and gear.',
        'Technical support during bootcamps, tournaments and live broadcasts.',
      ],
    },
    kind: 'it',
  },
  {
    role: { es: 'Técnico informático', en: 'IT Technician' },
    company: 'Movistar Riders',
    place: { es: 'Madrid', en: 'Madrid' },
    period: { es: 'Ago 2022 – Nov 2022', en: 'Aug 2022 – Nov 2022' },
    bullets: {
      es: [
        'Periféricos, redes LAN y estaciones de trabajo; incidencias en tiempo real.',
        'Asistencia en entrenamientos, eventos online y sesiones de grabación.',
      ],
      en: [
        'Peripherals, LAN networks and workstations; real-time troubleshooting.',
        'Support during practice, online events and recording sessions.',
      ],
    },
    kind: 'it',
  },
  {
    role: { es: 'Técnico de soporte IT', en: 'IT Support Technician' },
    company: 'Five Media Clan',
    place: { es: 'España', en: 'Spain' },
    period: { es: 'Mar 2022 – Ago 2022', en: 'Mar 2022 – Aug 2022' },
    bullets: {
      es: ['Soporte a jugadores y staff, preparación de sesiones competitivas e incidencias de red.'],
      en: ['Supported players and staff, prepared competitive sessions and handled network issues.'],
    },
    kind: 'it',
  },
  {
    role: { es: 'Técnico informático (prácticas)', en: 'IT Technician (internship)' },
    company: 'El Mundo del Móvil',
    place: { es: 'Madrid', en: 'Madrid' },
    period: { es: 'Mar 2022 – Jun 2022', en: 'Mar 2022 – Jun 2022' },
    bullets: {
      es: ['Diagnóstico y reparación de smartphones y tablets; atención al cliente y stock.'],
      en: ['Diagnosed and repaired smartphones and tablets; customer service and stock.'],
    },
    kind: 'it',
  },
]

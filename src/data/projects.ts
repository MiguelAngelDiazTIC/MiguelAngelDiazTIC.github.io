import type { Project } from '../types'

// Para añadir un proyecto: copia un objeto, cambia los datos y deja la captura en /public/projects/.
export const projects: Project[] = [
  {
    slug: 'gym-app',
    title: 'Gym App',
    description: {
      es: 'Tracker de fitness personal y mobile-first: registra tu peso con gráficas y organiza rutinas por semanas, días y series.',
      en: 'Personal, mobile-first fitness tracker: log your weight with charts and organise routines by weeks, days and sets.',
    },
    image: '/projects/gym-app.webp',
    tags: ['React', 'TypeScript', 'Recharts', 'Motion'],
    demo: 'https://gym-app-eta-murex.vercel.app',
    repo: 'https://github.com/MiguelAngelDiazTIC/Gym-App',
    featured: true,
    date: '2026-09',
  },
  {
    slug: 'mercado-fichajes-vlr',
    title: 'Mercado Fichajes VLR',
    description: {
      es: 'Movimientos de jugadores y staff de Valorant en tiempo real, tanto en offseason como durante la temporada regular.',
      en: 'Real-time Valorant player and staff transfers, both in the offseason and during the regular season.',
    },
    image: '/projects/mercado-fichajes-vlr.webp',
    tags: ['TypeScript', 'Vite', 'eSports'],
    demo: 'https://mercado-fichajes-vlr.vercel.app',
    repo: 'https://github.com/MiguelAngelDiazTIC/Mercado-Fichajes-VLR',
    date: '2026-06',
  },
]

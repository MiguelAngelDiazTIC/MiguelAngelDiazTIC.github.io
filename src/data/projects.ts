import type { Project } from '../types'

// Para añadir un proyecto: copia un objeto, cambia los datos y deja la captura en /public/projects/.
// Se muestran en este orden, con los destacados (featured) por delante.
export const projects: Project[] = [
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
    featured: true,
  },
  {
    slug: 'gym-app',
    title: 'Gym App',
    description: {
      es: 'Tracker de fitness personal y mobile-first: registra tu peso con gráficas y organiza rutinas por semanas, días y series.',
      en: 'Personal, mobile-first fitness tracker: log your weight with charts and organise routines by weeks, days and sets.',
    },
    screens: ['/projects/gym-app-peso.webp', '/projects/gym-app-rutinas.webp', '/projects/gym-app-nutricion.webp'],
    tags: ['React', 'TypeScript', 'Recharts', 'Motion'],
    demo: 'https://gym-app-eta-murex.vercel.app',
    repo: 'https://github.com/MiguelAngelDiazTIC/Gym-App',
  },
  {
    slug: 'mikalog',
    title: 'MikaLog',
    description: {
      es: 'Diario de escritorio para jugadores de Valorant: apunta cada día partidas, hábitos y sueño en una tabla y cruza tus propios números para ver qué te hace jugar mejor. Local, sin cuenta ni internet.',
      en: 'Desktop journal for Valorant players: log matches, habits and sleep in a daily table and cross your own numbers to see what makes you play better. Local, no account, no internet.',
    },
    image: '/projects/mikalog.webp',
    tags: ['Tauri', 'React', 'TypeScript', 'SQLite'],
    repo: 'https://github.com/MiguelAngelDiazTIC/Player-Tracker-App',
  },
]

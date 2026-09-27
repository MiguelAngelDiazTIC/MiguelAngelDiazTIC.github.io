import type { TechTest } from '../types'

// Para añadir una prueba: copia un objeto y cambia los datos.
export const techTests: TechTest[] = [
  {
    slug: 'prueba-tecnica-react',
    title: { es: 'App de gatitos', en: 'Cat facts app' },
    format: { es: 'Live coding', en: 'Live coding' },
    level: { es: 'Junior / Trainee', en: 'Junior / Trainee' },
    brief: {
      es: 'Recuperar un dato aleatorio sobre gatos de una API y mostrar la imagen de un gato con las primeras palabras de ese dato usando una segunda API.',
      en: 'Fetch a random cat fact from one API and show a cat image captioned with the first words of that fact using a second API.',
    },
    solution: {
      es: [
        'Peticiones encadenadas: la segunda depende de la respuesta de la primera.',
        'Estado con useState y carga inicial con useEffect.',
        'Renderizado condicional mientras llegan los datos.',
      ],
      en: [
        'Chained requests: the second one depends on the first response.',
        'State with useState and initial load with useEffect.',
        'Conditional rendering while data is loading.',
      ],
    },
    tags: ['React', 'JavaScript', 'Fetch API', 'Vite'],
    repo: 'https://github.com/MiguelAngelDiazTIC/PruebaTecnicaReact',
    noAI: true,
    date: '2026-09',
  },
]

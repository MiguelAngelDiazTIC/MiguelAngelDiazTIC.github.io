import type { SkillGroup } from '../types'

export const skills: SkillGroup[] = [
  {
    name: { es: 'Front-end', en: 'Front-end' },
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'LitElement', 'Bootstrap', 'APIs REST'],
  },
  {
    name: { es: 'Cómo trabajo', en: 'How I work' },
    items: ['Responsive', 'a11y / WCAG', 'UX', 'Agile / Scrum', 'Code review', 'Git / GitHub'],
  },
  {
    name: { es: 'Además', en: 'Also' },
    items: ['Tauri', 'Rust', 'Java', 'POO / OOP', 'SQL / MySQL', 'SQLite', 'Linux', 'Redes / Networking'],
  },
]

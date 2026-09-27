import type { SkillGroup } from '../types'

export const skills: SkillGroup[] = [
  {
    name: { es: 'Desarrollo', en: 'Development' },
    items: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'LitElement', 'Bootstrap', 'Java', 'POO / OOP', 'APIs REST'],
  },
  {
    name: { es: 'Buenas prácticas', en: 'Practices' },
    items: ['Responsive', 'a11y / WCAG', 'UX', 'Agile / Scrum', 'Code review'],
  },
  {
    name: { es: 'Datos y versiones', en: 'Data & VCS' },
    items: ['SQL', 'MySQL', 'Git', 'GitHub'],
  },
  {
    name: { es: 'Sistemas', en: 'Systems' },
    items: ['Windows', 'Linux Ubuntu', 'LAN / WiFi', 'TCP/IP', 'Hardware'],
  },
  {
    name: { es: 'Herramientas', en: 'Tools' },
    items: ['VS Code', 'XAMPP', 'MAMP', 'OBS Studio', 'Vercel'],
  },
]

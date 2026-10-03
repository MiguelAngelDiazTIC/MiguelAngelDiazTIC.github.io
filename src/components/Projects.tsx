import { useState } from 'react'
import { projects } from '../data/projects'
import { useLang } from '../i18n/useLang'
import type { Project } from '../types'
import { ArrowButton } from './ArrowButton'
import { ArrowUpRight, GitHub } from './Icons'

// Destacados primero; el resto, en el orden de src/data/projects.ts
const sorted = [...projects].sort((a, b) => Number(!!b.featured) - Number(!!a.featured))

// Columnas que ocupa la última tarjeta para cerrar su fila en la rejilla de 3 columnas
// (0 si la fila ya queda completa): así no se queda sola con huecos al lado
const COLS = 3
const lastSpan = (() => {
  let col = 0
  for (const p of sorted) {
    const span = p.featured ? 2 : 1
    if (col + span > COLS) col = 0
    col += span
  }
  const own = sorted.at(-1)?.featured ? 2 : 1
  return col < COLS ? own + COLS - col : 0
})()

export function Projects() {
  const { t } = useLang()

  return (
    <section id="proyectos" className="band">
      <div className="container">
        <header className="section-head">
          <h2>{t('projectsTitle')}</h2>
        </header>
        <div className="projects-grid">
          {sorted.map((p, i) => (
            <ProjectCard key={p.slug} project={p} rowFill={i === sorted.length - 1 ? lastSpan : 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p, rowFill }: { project: Project; rowFill: number }) {
  const { t, l } = useLang()
  // Si la captura aún no está en /public se muestra el título en su lugar
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article
      className={`card project-card${p.featured ? ' is-featured' : ''}${rowFill ? ` row-fill-${rowFill}` : ''}`}
    >
      <div className="project-media">
        {p.screens?.length ? (
          <div className="phones">
            {p.screens.map((src) => (
              <div key={src} className="phone">
                <img src={src} alt="" loading="lazy" width={390} height={844} />
              </div>
            ))}
          </div>
        ) : p.image && !imageFailed ? (
          <img
            src={p.image}
            alt=""
            loading="lazy"
            width={1280}
            height={800}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="project-fallback">{p.title}</span>
        )}
      </div>
      <div className="project-body">
        <h3>{p.title}</h3>
        <p>{l(p.description)}</p>
        <ul className="chips chips-quiet">
          {p.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <div className="project-links">
          {p.demo && (
            <a className="text-link" href={p.demo} target="_blank" rel="noreferrer">
              <ArrowUpRight size={16} /> {t('viewDemo')}
            </a>
          )}
          {p.repo && (
            <a className="text-link" href={p.repo} target="_blank" rel="noreferrer">
              <GitHub size={16} /> {t('viewCode')}
            </a>
          )}
        </div>
      </div>
      {p.demo && (
        <div className="project-notch">
          <ArrowButton href={p.demo} label={`${t('viewDemo')}: ${p.title}`} decorative />
        </div>
      )}
    </article>
  )
}

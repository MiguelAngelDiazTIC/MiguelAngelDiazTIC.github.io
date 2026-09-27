import { useState } from 'react'
import { projects } from '../data/projects'
import { useLang } from '../i18n/useLang'
import type { Project } from '../types'
import { ArrowButton } from './ArrowButton'
import { GitHub } from './Icons'

const sorted = [...projects].sort((a, b) => b.date.localeCompare(a.date))

export function Projects() {
  const { t } = useLang()

  return (
    <section id="proyectos" className="band">
      <div className="container">
        <header className="section-head section-head-invert">
          <p className="eyebrow">{t('projectsEyebrow')}</p>
          <h2>{t('projectsTitle')}</h2>
        </header>
        <div className="projects-grid">
          {sorted.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  const { t, l } = useLang()
  // Si la captura aún no está en /public se muestra el título en su lugar
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <article className={`card project-card${p.featured ? ' is-featured' : ''}`}>
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
        <ul className="chips">
          {p.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        {p.repo && (
          <a className="text-link" href={p.repo} target="_blank" rel="noreferrer">
            <GitHub size={16} /> {t('viewCode')}
          </a>
        )}
      </div>
      {p.demo && (
        <div className="project-notch">
          <ArrowButton href={p.demo} label={`${t('viewDemo')}: ${p.title}`} />
        </div>
      )}
    </article>
  )
}

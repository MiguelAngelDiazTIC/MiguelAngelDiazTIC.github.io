import { techTests } from '../data/techTests'
import { useLang } from '../i18n/useLang'
import type { TechTest } from '../types'
import { ArrowUpRight, GitHub } from './Icons'

const sorted = [...techTests].sort((a, b) => b.date.localeCompare(a.date))

export function TechTests() {
  const { t } = useLang()

  return (
    <section id="pruebas" className="container section">
      <header className="section-head">
        <h2>{t('testsTitle')}</h2>
        <p className="section-intro">{t('testsIntro')}</p>
      </header>
      <div className="tests-grid">
        {sorted.map((test) => (
          <TestCard key={test.slug} test={test} />
        ))}
      </div>
    </section>
  )
}

function TestCard({ test: x }: { test: TechTest }) {
  const { t, l } = useLang()

  return (
    <article className="card test-card">
      <div className="test-meta">
        <span className="pill pill-accent">{l(x.format)}</span>
        <span className="pill">{l(x.level)}</span>
        {x.noAI && <span className="pill pill-ok">{t('noAI')}</span>}
      </div>
      <h3>{l(x.title)}</h3>

      <div className="test-cols">
        <div>
          <h4 className="card-label">{t('testBrief')}</h4>
          <p>{l(x.brief)}</p>
        </div>
        <div>
          <h4 className="card-label">{t('testSolution')}</h4>
          <ul className="exp-bullets">
            {l(x.solution).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="test-foot">
        <ul className="chips chips-quiet">
          {x.tags.map((tag) => (
            <li key={tag} className="chip">
              {tag}
            </li>
          ))}
        </ul>
        <div className="test-links">
          {x.demo && (
            <a className="text-link" href={x.demo} target="_blank" rel="noreferrer">
              <ArrowUpRight size={16} /> {t('viewDemo')}
            </a>
          )}
          {x.repo && (
            <a className="text-link" href={x.repo} target="_blank" rel="noreferrer">
              <GitHub size={16} /> {t('viewCode')}
            </a>
          )}
        </div>
      </footer>
    </article>
  )
}

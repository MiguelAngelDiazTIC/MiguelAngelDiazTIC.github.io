import { skills } from '../data/skills'
import { useLang } from '../i18n/useLang'

export function Skills() {
  const { t, l } = useLang()

  return (
    <section id="competencias" className="container section" aria-labelledby="skills-title">
      <header className="section-head">
        <h2 id="skills-title">{t('skillsTitle')}</h2>
      </header>
      <div className="skills-grid">
        {skills.map((g) => (
          <article key={g.name.en} className="card">
            <h3 className="card-label">{l(g.name)}</h3>
            <ul className="chips">
              {g.items.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

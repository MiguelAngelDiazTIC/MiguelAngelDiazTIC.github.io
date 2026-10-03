import { education } from '../data/education'
import { experience } from '../data/experience'
import { useLang } from '../i18n/useLang'

const dev = experience.filter((e) => e.kind === 'dev')

export function Experience() {
  const { t, l } = useLang()

  return (
    <section id="experiencia" className="container section">
      <header className="section-head">
        <h2>{t('experienceTitle')}</h2>
      </header>

      <div className="exp-layout">
        <ol className="timeline">
          {dev.map((e) => (
            <li key={`${e.company}-${e.period.es}`} className="card">
              <div className="exp-head">
                <h3>
                  {l(e.role)}
                  <span className="visually-hidden"> · {e.company}</span>
                </h3>
                <span className="exp-period">{l(e.period)}</span>
              </div>
              {e.stints ? (
                <>
                  <p className="exp-company">{e.company}</p>
                  <ul className="exp-stints">
                    {e.stints.map((s) => (
                      <li key={s.period.es}>
                        <span className="exp-period">{l(s.period)}</span> · {l(s.place)}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="exp-company">
                  {e.company} · {l(e.place)}
                </p>
              )}
              <ul className="exp-bullets">
                {l(e.bullets).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <aside className="card card-accent edu">
          <h3 className="card-label">{t('education')}</h3>
          <ul>
            {education.map((ed) => (
              <li key={ed.school}>
                <strong>{l(ed.title)}</strong>
                <span>{ed.school}</span>
                <span className="exp-period">{ed.period}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'
import { ArrowButton } from './ArrowButton'
import { GitHub, MapPin } from './Icons'

export function BentoGrid() {
  const { t, l } = useLang()

  return (
    <section id="sobre-mi" className="container bento" aria-label={t('navAbout')}>
      <article className="card card-now">
        <h2 className="card-label">{t('now')}</h2>
        <p className="card-big">{l(profile.now)}</p>
      </article>

      <article className="card card-location">
        <MapPin />
        <h2 className="card-label">{t('basedIn')}</h2>
        <p className="card-big">{profile.location}</p>
      </article>

      <article className="card card-langs">
        <h2 className="card-label">{t('languages')}</h2>
        <ul className="lang-list">
          {profile.languages.map((lg) => (
            <li key={lg.name.en}>
              <span>{l(lg.name)}</span>
              <strong>{l(lg.level)}</strong>
            </li>
          ))}
        </ul>
      </article>

      <article className="card card-stack">
        <h2 className="card-label">{t('stack')}</h2>
        <ul className="chips">
          {profile.featuredStack.map((s) => (
            <li key={s} className="chip">
              {s}
            </li>
          ))}
        </ul>
      </article>

      <article className="card card-github">
        <GitHub size={28} />
        <p className="card-big">{t('seeGithub')}</p>
        <ArrowButton href={profile.github} label="GitHub" className="card-arrow" />
      </article>
    </section>
  )
}

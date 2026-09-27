import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'
import { ArrowButton } from './ArrowButton'
import { Gamepad, GitHub } from './Icons'

export function BentoGrid() {
  const { t, l } = useLang()

  return (
    <section id="sobre-mi" className="container bento" aria-labelledby="sobre-mi-title">
      <h2 id="sobre-mi-title" className="visually-hidden">
        {t('navAbout')}
      </h2>

      <article className="card card-accent card-esports">
        <Gamepad size={28} />
        <h3 className="card-label">{l(profile.esports.label)}</h3>
        <ul className="team-list">
          {profile.esports.teams.map((team) => (
            <li key={team}>{team}</li>
          ))}
        </ul>
        <p>{l(profile.esports.text)}</p>
      </article>

      <article className="card card-langs">
        <h3 className="card-label">{t('languages')}</h3>
        <ul className="lang-list">
          {profile.languages.map((lg) => (
            <li key={lg.name.en}>
              <span>{l(lg.name)}</span>
              <strong>{l(lg.level)}</strong>
            </li>
          ))}
        </ul>
      </article>

      <article className="card card-github">
        <GitHub size={28} />
        <h3 className="card-big">{t('seeGithub')}</h3>
        <ArrowButton href={profile.github} label="GitHub" className="card-arrow" />
      </article>
    </section>
  )
}

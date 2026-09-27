import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'
import { ArrowButton } from './ArrowButton'
import { Download } from './Icons'

export function Hero() {
  const { t, l } = useLang()

  return (
    <section id="inicio" className="hero container">
      <div className="hero-text">
        <p className="status">
          <span className="status-dot" aria-hidden /> {t('openToWork')}
        </p>
        <h1>
          {t('hello')}{' '}
          <span className="hero-name">
            {profile.name},
            <svg className="scribble" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden>
              <path d="M2 9c40-6 110-8 196-3" />
            </svg>
          </span>
          <br />
          {l(profile.role)}
        </h1>
        <p className="hero-bio">{l(profile.bio)}</p>
        <div className="hero-actions">
          <a className="btn btn-dark" href="#contacto">
            {t('contactMe')}
          </a>
          <a className="btn btn-accent" href={profile.cv} download>
            <Download /> {t('downloadCv')}
          </a>
        </div>
      </div>

      <div className="hero-photo">
        {profile.photo ? (
          <img src={profile.photo} alt={profile.fullName} width={400} height={500} />
        ) : (
          <span className="hero-initials" aria-hidden>
            MÁ
          </span>
        )}
        <span className="hero-vertical" aria-hidden>
          {l(profile.role)}
        </span>
        <div className="hero-notch">
          <ArrowButton href="#proyectos" label={t('navProjects')} />
        </div>
      </div>
    </section>
  )
}

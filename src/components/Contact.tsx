import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'
import { GitHub, LinkedIn, Mail } from './Icons'

export function Contact() {
  const { t } = useLang()

  return (
    <section id="contacto" className="container section">
      <div className="card card-accent contact">
        <p className="eyebrow">{t('contactEyebrow')}</p>
        <h2>{t('contactTitle')}</h2>
        <p>{t('contactText')}</p>
        <div className="contact-links">
          <a className="btn btn-light" href={`mailto:${profile.email}`}>
            <Mail /> {profile.email}
          </a>
          <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedIn /> LinkedIn
          </a>
          <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
            <GitHub /> GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="container footer">
      <span>
        © {new Date().getFullYear()} {profile.fullName}
      </span>
      <span>{t('builtWith')}</span>
    </footer>
  )
}

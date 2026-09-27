import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/useLang'
import { ArrowUp, Check, Copy, Download, GitHub, LinkedIn, Mail } from './Icons'

// Punto de corte antes de la @ para que en móvil no se parta a mitad de palabra
const [emailUser, emailDomain] = profile.email.split('@')

type CopyState = 'idle' | 'copied' | 'failed'

export function Contact() {
  const { t } = useLang()
  const [copy, setCopy] = useState<CopyState>('idle')

  // El aviso de copiado se retira solo a los 2,5 s
  useEffect(() => {
    if (copy === 'idle') return
    const id = setTimeout(() => setCopy('idle'), 2500)
    return () => clearTimeout(id)
  }, [copy])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopy('copied')
    } catch {
      setCopy('failed')
    }
  }

  return (
    <section id="contacto" className="container section">
      <div className="card card-accent contact">
        <p className="eyebrow">{t('contactEyebrow')}</p>
        <h2>{t('contactTitle')}</h2>
        <p>{t('contactText')}</p>
        <div className="contact-links">
          <div className="email-group">
            <a className="btn btn-light" href={`mailto:${profile.email}`}>
              <Mail /> <span>
                {emailUser}
                <wbr />@{emailDomain}
              </span>
            </a>
            <button type="button" className="btn btn-copy" onClick={copyEmail} aria-label={t('copyEmail')} title={t('copyEmail')}>
              {copy === 'copied' ? <Check /> : <Copy />}
            </button>
          </div>
          <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            <LinkedIn /> LinkedIn
          </a>
          <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
            <GitHub /> GitHub
          </a>
        </div>
        <p className="copy-status" role="status">
          {copy === 'copied' && t('emailCopied')}
          {copy === 'failed' && t('copyFailed')}
        </p>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="container footer">
      <span>
        © {new Date().getFullYear()} {profile.fullName} · {t('builtWith')}
      </span>
      <nav className="footer-links" aria-label={t('footerNav')}>
        <a className="text-link" href={profile.cv} download>
          <Download size={16} /> {t('downloadCv')}
        </a>
        <a className="text-link" href="#inicio">
          <ArrowUp size={16} /> {t('backToTop')}
        </a>
      </nav>
    </footer>
  )
}

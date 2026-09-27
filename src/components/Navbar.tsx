import { useState } from 'react'
import { useLang } from '../i18n/useLang'
import type { StringKey } from '../i18n/strings'
import { Close, Menu, Moon, Sun } from './Icons'

const left: [string, StringKey][] = [
  ['#inicio', 'navHome'],
  ['#sobre-mi', 'navAbout'],
  ['#proyectos', 'navProjects'],
]
const right: [string, StringKey][] = [
  ['#pruebas', 'navTests'],
  ['#experiencia', 'navExperience'],
  ['#contacto', 'navContact'],
]

type Props = { theme: 'light' | 'dark'; onToggleTheme: () => void }

export function Navbar({ theme, onToggleTheme }: Props) {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)

  const link = ([href, key]: [string, StringKey]) => (
    <li key={href}>
      <a href={href} onClick={() => setOpen(false)}>
        {t(key)}
      </a>
    </li>
  )

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Principal">
        <ul className="nav-links nav-left">{left.map(link)}</ul>
        <a href="#inicio" className="nav-logo" aria-label="Miguel Ángel Díaz">
          MD
        </a>
        <ul className="nav-links nav-right">{right.map(link)}</ul>

        <div className="nav-tools">
          <button
            type="button"
            className="nav-icon"
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            aria-label={t('switchLang')}
            title={t('switchLang')}
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            type="button"
            className="nav-icon"
            onClick={onToggleTheme}
            aria-label={t('toggleTheme')}
            title={t('toggleTheme')}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            type="button"
            className="nav-icon nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t('menu')}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="nav-mobile">
          {[...left, ...right].map(link)}
        </ul>
      )}
    </header>
  )
}

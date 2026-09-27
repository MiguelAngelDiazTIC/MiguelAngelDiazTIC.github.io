import { useEffect, useRef, useState } from 'react'
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
  const wrapRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState('#inicio')

  // Marca en la navbar la sección que cruza la franja central de la pantalla
  useEffect(() => {
    const sections = [...left, ...right]
      .map(([href]) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive('#' + entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Menú móvil: foco al primer enlace, Esc lo cierra y devuelve el foco, un toque fuera lo cierra
  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      burgerRef.current?.focus()
    }
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  const link = ([href, key]: [string, StringKey]) => (
    <li key={href}>
      <a href={href} onClick={() => setOpen(false)} aria-current={active === href ? 'location' : undefined}>
        {t(key)}
      </a>
    </li>
  )

  return (
    <header className="nav-wrap" ref={wrapRef}>
      <nav className="nav" aria-label={t('navLabel')}>
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
            aria-label={t('darkMode')}
            aria-pressed={theme === 'dark'}
            title={t('darkMode')}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            ref={burgerRef}
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

        {open && (
          <ul id="mobile-menu" className="nav-mobile" ref={menuRef}>
            {[...left, ...right].map(link)}
          </ul>
        )}
      </nav>
    </header>
  )
}

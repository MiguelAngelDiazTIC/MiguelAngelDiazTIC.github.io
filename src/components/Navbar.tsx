import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLang } from '../i18n/useLang'
import type { StringKey } from '../i18n/strings'
import { Close, Menu, Moon, Sun } from './Icons'
import { withViewTransition } from '../viewTransition'

// "Inicio" lo cubre el logo MD
const left: [string, StringKey][] = [
  ['#sobre-mi', 'navAbout'],
  ['#proyectos', 'navProjects'],
  ['#pruebas', 'navTests'],
]
const right: [string, StringKey][] = [
  ['#experiencia', 'navExperience'],
  ['#competencias', 'navSkills'],
  ['#contacto', 'navContact'],
]

type Props = { theme: 'light' | 'dark'; onToggleTheme: (origin?: { x: number; y: number }) => void }

export function Navbar({ theme, onToggleTheme }: Props) {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  // El menú móvil sigue montado mientras se anima su salida
  const [closing, setClosing] = useState(false)
  const wrapRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState('')
  const other = lang === 'es' ? 'en' : 'es'

  const closeMenu = () => {
    setOpen(false)
    setClosing(true)
  }

  // Marca en la navbar la sección que cruza la franja central de la pantalla
  // (el hero también cuenta: al volver arriba no queda ningún enlace marcado)
  useEffect(() => {
    const sections = ['#inicio', ...[...left, ...right].map(([href]) => href)]
      .map((href) => document.querySelector<HTMLElement>(href))
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

  // La píldora de la sección activa se desliza de un enlace a otro (y cruza bajo el logo).
  // Se recoloca al cambiar de sección, de idioma (cambian los anchos) o de tamaño.
  useLayoutEffect(() => {
    const nav = navRef.current
    const pill = pillRef.current
    if (!nav || !pill) return

    const place = () => {
      const a = nav.querySelector<HTMLElement>(`.nav-links a[href="${active}"]`)
      if (!a || !a.offsetWidth) {
        pill.style.opacity = '0'
        return
      }
      const n = nav.getBoundingClientRect()
      const r = a.getBoundingClientRect()
      // Si estaba oculta aparece en su sitio; si ya se veía, viaja
      const appearing = pill.style.opacity !== '1'
      if (appearing) pill.style.transition = 'none'
      pill.style.translate = `${r.left - n.left - nav.clientLeft}px ${r.top - n.top - nav.clientTop}px`
      pill.style.width = `${r.width}px`
      pill.style.height = `${r.height}px`
      if (appearing) {
        void pill.offsetWidth
        pill.style.transition = ''
      }
      pill.style.opacity = '1'
    }

    place()
    const ro = new ResizeObserver(place)
    ro.observe(nav)
    return () => ro.disconnect()
  }, [active, lang])

  // Menú móvil: foco al primer enlace, Esc lo cierra y devuelve el foco, un toque fuera lo cierra
  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector('a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      closeMenu()
      burgerRef.current?.focus()
    }
    // Toque fuera o foco que sale del menú (Tab): se cierra
    const onOutside = (e: Event) => {
      if (!wrapRef.current?.contains(e.target as Node)) closeMenu()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    document.addEventListener('focusin', onOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
      document.removeEventListener('focusin', onOutside)
    }
  }, [open])

  const link = ([href, key]: [string, StringKey]) => (
    <li key={href}>
      <a href={href} onClick={() => open && closeMenu()} aria-current={active === href ? 'location' : undefined}>
        {t(key)}
      </a>
    </li>
  )

  return (
    <header className="nav-wrap" ref={wrapRef}>
      <nav className="nav" aria-label={t('navLabel')} ref={navRef}>
        <span className="nav-pill" ref={pillRef} aria-hidden />
        <ul className="nav-links nav-left">{left.map(link)}</ul>
        <a href="#inicio" className="nav-logo" aria-label={`Miguel Ángel Díaz – ${t('navHome')}`}>
          MD
        </a>
        <ul className="nav-links nav-right">{right.map(link)}</ul>

        <div className="nav-tools">
          <button
            type="button"
            className="nav-icon"
            onClick={() => withViewTransition(() => setLang(other), 'lang')}
            lang={other}
            title={t('switchLang')}
          >
            {/* Nombre accesible "EN – English": incluye el texto visible y se pronuncia en su idioma */}
            {other.toUpperCase()}
            <span className="visually-hidden"> – {other === 'en' ? 'English' : 'Español'}</span>
          </button>
          <button
            type="button"
            className="nav-icon"
            onClick={(e) => {
              // El nuevo tema se expande desde el centro del botón (también con teclado)
              const r = e.currentTarget.getBoundingClientRect()
              onToggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 })
            }}
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
            onClick={() => {
              if (open) return closeMenu()
              setClosing(false)
              setOpen(true)
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t('menu')}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>

        {(open || closing) && (
          <ul
            id="mobile-menu"
            className={`nav-mobile${open ? '' : ' is-closing'}`}
            ref={menuRef}
            inert={!open}
            onAnimationEnd={(e) => {
              if (e.target === e.currentTarget && !open) setClosing(false)
            }}
          >
            {[...left, ...right].map(link)}
          </ul>
        )}
      </nav>
    </header>
  )
}

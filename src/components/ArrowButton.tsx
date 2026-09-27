import { ArrowDown, ArrowUpRight } from './Icons'

type Props = {
  href: string
  label: string
  className?: string
  /** Repite otro enlace visible: fuera del orden de tabulación y oculto a lectores de pantalla */
  decorative?: boolean
}

/** Botón circular con flecha, el sello del estilo bento: ↗ sale a otra web, ↓ baja dentro de la página */
export function ArrowButton({ href, label, className = '', decorative = false }: Props) {
  const external = href.startsWith('http')
  return (
    <a
      className={`arrow-btn ${external ? '' : 'arrow-btn-down'} ${className}`}
      href={href}
      aria-label={label}
      title={label}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
      {...(decorative && { tabIndex: -1, 'aria-hidden': true })}
    >
      {external ? <ArrowUpRight /> : <ArrowDown />}
    </a>
  )
}

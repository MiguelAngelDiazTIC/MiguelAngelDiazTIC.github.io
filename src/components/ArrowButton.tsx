import { ArrowDown, ArrowUpRight } from './Icons'

type Props = {
  href: string
  label: string
  className?: string
}

/** Botón circular con flecha, el sello del estilo bento: ↗ sale a otra web, ↓ baja dentro de la página */
export function ArrowButton({ href, label, className = '' }: Props) {
  const external = href.startsWith('http')
  return (
    <a
      className={`arrow-btn ${external ? '' : 'arrow-btn-down'} ${className}`}
      href={href}
      aria-label={label}
      title={label}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
    >
      {external ? <ArrowUpRight /> : <ArrowDown />}
    </a>
  )
}

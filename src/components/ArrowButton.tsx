import { ArrowUpRight } from './Icons'

type Props = {
  href: string
  label: string
  className?: string
}

/** Botón circular con flecha ↗, el sello del estilo bento */
export function ArrowButton({ href, label, className = '' }: Props) {
  const external = href.startsWith('http')
  return (
    <a
      className={`arrow-btn ${className}`}
      href={href}
      aria-label={label}
      title={label}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
    >
      <ArrowUpRight />
    </a>
  )
}

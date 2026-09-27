/**
 * Movimiento de la página que no pertenece a un componente concreto:
 * - revelado al hacer scroll: cabeceras de sección, tarjetas y la banda de proyectos entran
 *   al cruzar el viewport; las que entran juntas lo hacen escalonadas;
 * - llegada: al pulsar un enlace interno, cuando termina el scroll la sección destino lo señala;
 * - luz de las tarjetas: un brillo suave sigue al puntero sobre cada tarjeta.
 * Sin JS no se oculta nada: el estado oculto solo existe con `reveal-on` en <html>.
 */

const REVEAL = '.section-head, .card, .band'

export function enableReveal() {
  document.documentElement.classList.add('reveal-on')
}

export function startMotion() {
  const cleanups = [startReveal(), startArrival(), startCardLight()]
  return () => cleanups.forEach((fn) => fn())
}

function startReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      // Las que entran en el mismo fotograma forman una lista: escalonadas, con el retraso acotado
      let i = 0
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        el.style.setProperty('--d', `${Math.min(i++, 4) * 80}ms`)
        el.dataset.in = ''
        io.unobserve(el)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  )

  const watch = (root: ParentNode) =>
    root.querySelectorAll<HTMLElement>(REVEAL).forEach((el) => {
      if (!('in' in el.dataset)) io.observe(el)
    })
  watch(document)

  // Tarjetas que React monta más tarde (p. ej. al cambiar de idioma) también entran
  const mo = new MutationObserver((records) => {
    for (const r of records)
      r.addedNodes.forEach((n) => {
        if (!(n instanceof HTMLElement)) return
        if (n.matches(REVEAL) && !('in' in n.dataset)) io.observe(n)
        watch(n)
      })
  })
  const main = document.querySelector('main')
  if (main) mo.observe(main, { childList: true, subtree: true })

  return () => {
    io.disconnect()
    mo.disconnect()
  }
}

function startArrival() {
  const timers = new WeakMap<HTMLElement, number>()

  const arrive = (el: HTMLElement) => {
    // Quitar, forzar reflow y volver a poner: la animación se repite en cada llegada
    delete el.dataset.arrived
    void el.offsetWidth
    el.dataset.arrived = ''
    clearTimeout(timers.get(el))
    timers.set(el, window.setTimeout(() => delete el.dataset.arrived, 1600))
  }

  const onClick = (e: MouseEvent) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
    const id = a?.getAttribute('href')?.slice(1)
    const el = id ? document.getElementById(id) : null
    if (!el) return

    // Ya estamos ahí: no habrá scroll, se señala al momento
    const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    if (Math.abs(el.getBoundingClientRect().top - pad) < 4) return arrive(el)

    let done = false
    const finish = () => {
      if (done) return
      done = true
      window.removeEventListener('scrollend', finish)
      arrive(el)
    }
    window.addEventListener('scrollend', finish)
    // Navegadores sin `scrollend`, o scroll interrumpido
    window.setTimeout(finish, 'onscrollend' in window ? 1800 : 900)
  }

  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

function startCardLight() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}

  let frame = 0
  let last: PointerEvent | null = null

  const paint = () => {
    frame = 0
    if (!last) return
    const card = (last.target as Element).closest?.<HTMLElement>('.card')
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${last.clientX - r.left}px`)
    card.style.setProperty('--my', `${last.clientY - r.top}px`)
  }

  const onMove = (e: PointerEvent) => {
    last = e
    if (!frame) frame = requestAnimationFrame(paint)
  }

  document.addEventListener('pointermove', onMove, { passive: true })
  return () => {
    document.removeEventListener('pointermove', onMove)
    cancelAnimationFrame(frame)
  }
}

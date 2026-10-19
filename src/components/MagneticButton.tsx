import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

type Props = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  external?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export default function MagneticButton({ href, children, variant = 'ghost', external, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || window.matchMedia('(hover: none)').matches) return

      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' })
      const fill = el.querySelector('.btn__fill')

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        xTo(dx * 0.35)
        yTo(dy * 0.35)
      }
      const onEnter = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const fromTop = e.clientY < r.top + r.height / 2
        gsap.fromTo(fill, { yPercent: fromTop ? -101 : 101 }, { yPercent: 0, duration: 0.5, ease: 'power3.out' })
      }
      const onLeave = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const toTop = e.clientY < r.top + r.height / 2
        gsap.to(fill, { yPercent: toTop ? -101 : 101, duration: 0.5, ease: 'power3.in' })
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: ref },
  )

  return (
    <a
      ref={ref}
      href={href}
      className={`btn ${variant === 'primary' ? 'btn--primary' : ''}`}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className="btn__fill" aria-hidden="true" />
      {children}
      <svg className="btn__arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

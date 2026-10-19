import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'

type Props = { onNavigate: (target: string | number) => void; ready: boolean }

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
]

export default function Nav({ onNavigate, ready }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set('.nav__progress', { scaleX: self.progress }),
      })
    },
    { scope: root },
  )

  useGSAP(
    () => {
      if (!ready) return
      gsap.from(root.current, { yPercent: -100, autoAlpha: 0, duration: 1.2, ease: 'expo.out', delay: 0.4 })
    },
    { scope: root, dependencies: [ready] },
  )

  const go = (e: React.MouseEvent, href: string | number) => {
    e.preventDefault()
    onNavigate(href)
  }

  return (
    <header className="nav" ref={root} style={{ visibility: ready ? 'visible' : 'hidden' }}>
      <a href="#top" className="nav__logo" onClick={(e) => go(e, 0)}>
        <span className="nav__logo-dot" />
        Max Zhao
      </a>
      <nav className="nav__links" aria-label="Primary">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav__link" onClick={(e) => go(e, l.href)}>
            <span>{l.label}</span>
            <span aria-hidden="true">{l.label}</span>
          </a>
        ))}
      </nav>
      <a href="#contact" className="nav__cta" onClick={(e) => go(e, '#contact')}>
        Get in touch
      </a>
      <span className="nav__progress" />
    </header>
  )
}

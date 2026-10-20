import { useRef, useState } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'

type Props = { onNavigate: (target: string | number) => void; ready: boolean }

const links = [
  { label: 'About', href: '#about', color: '#22d3ee' },
  { label: 'Experience', href: '#experience', color: '#7c5cff' },
  { label: 'Architecture', href: '#architecture', color: '#f472b6' },
  { label: 'Work', href: '#work', color: '#fb923c' },
  { label: 'Skills', href: '#skills', color: '#a3e635' },
]

export default function Nav({ onNavigate, ready }: Props) {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useGSAP(
    () => {
      // One trigger per section; we read their state on every scroll update so the
      // active link is always derived from the real scroll position (never stale toggles).
      const sectionTriggers = links.map((l) =>
        ScrollTrigger.create({ trigger: l.href, start: 'top 45%', end: 'bottom 45%' }),
      )

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set('.nav__progress', { scaleX: self.progress })
          setScrolled(self.scroll() > 40)
          const i = sectionTriggers.findIndex((t) => t.isActive)
          setActive(i === -1 ? null : links[i].href)
        },
        onRefresh: () => setActive(null),
      })
    },
    { scope: root },
  )

  useGSAP(
    () => {
      if (!ready) return
      gsap.from(root.current, { yPercent: -100, autoAlpha: 0, duration: 1.2, ease: 'expo.out', delay: 0.4 })
      gsap.to('.nav__logo-dot', {
        '--angle': '360deg',
        duration: 6,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: root, dependencies: [ready] },
  )

  const go = (e: React.MouseEvent, href: string | number) => {
    e.preventDefault()
    onNavigate(href)
  }

  const activeColor = links.find((l) => l.href === active)?.color ?? '#7c5cff'

  return (
    <header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      ref={root}
      style={{ visibility: ready ? 'visible' : 'hidden', ['--nav-accent' as string]: activeColor } as React.CSSProperties}
    >
      <div className="nav__bar">
        <a href="#top" className="nav__logo" onClick={(e) => go(e, 0)}>
          <span className="nav__logo-dot" />
          <span className="nav__logo-text">
            Max <span className="grad-text">Zhao</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav__link ${active === l.href ? 'is-active' : ''}`}
              style={{ ['--c' as string]: l.color } as React.CSSProperties}
              onClick={(e) => go(e, l.href)}
            >
              <span className="nav__link-text">
                <span>{l.label}</span>
                <span aria-hidden="true">{l.label}</span>
              </span>
            </a>
          ))}
        </nav>

        <a href="#contact" className="nav__cta" onClick={(e) => go(e, '#contact')}>
          <span className="nav__cta-dot" />
          Get in touch
        </a>
      </div>
      <span className="nav__progress" />
    </header>
  )
}

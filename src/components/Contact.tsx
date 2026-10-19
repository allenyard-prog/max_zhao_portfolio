import { useRef } from 'react'
import { gsap, useGSAP, SplitText } from '../lib/gsap'
import { profile } from '../data/content'
import MagneticButton from './MagneticButton'

type Props = { onNavigate: (target: string | number) => void }

export default function Contact({ onNavigate }: Props) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { reduce } = ctx.conditions!
          const d = (n: number) => (reduce ? 0 : n)

          // Only split the plain line; the gradient line (background-clip:text) animates as a block.
          const split = SplitText.create('.contact__title .line--plain', { type: 'chars', charsClass: 'char' })

          const tl = gsap.timeline({
            defaults: { ease: 'expo.out' },
            scrollTrigger: { trigger: '.contact__inner', start: 'top 75%' },
          })
          tl.from('.contact .eyebrow', { y: 20, autoAlpha: 0, duration: d(1) })
            .from(split.chars, { yPercent: 110, stagger: { each: 0.02, from: 'center' }, duration: d(1.3) }, '-=0.6')
            .from('.contact__title .line--grad', { yPercent: 110, duration: d(1.3) }, '-=1.0')
            .from('.contact__email, .contact .btn-row', { y: 24, autoAlpha: 0, stagger: 0.12, duration: d(1) }, '-=0.8')

          gsap.from('.footer > *', {
            y: 16,
            autoAlpha: 0,
            stagger: 0.1,
            duration: d(1),
            scrollTrigger: { trigger: '.footer', start: 'top 95%' },
          })

          gsap.to('.contact__glow', {
            yPercent: -30,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
          })

          return () => split.revert()
        },
      )
    },
    { scope: root },
  )

  return (
    <section className="section contact" id="contact" ref={root}>
      <div className="contact__glow" aria-hidden="true" />
      <div className="container">
        <div className="contact__inner">
          <span className="eyebrow">05 — Contact</span>
          <h2 className="contact__title">
            <span className="line-mask">
              <span className="line line--plain">Let's build something</span>
            </span>
            <span className="line-mask">
              <span className="line line--grad serif grad-text">that scales.</span>
            </span>
          </h2>
          <a className="contact__email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="btn-row">
            <MagneticButton href={`mailto:${profile.email}`} variant="primary">
              Start a conversation
            </MagneticButton>
            <MagneticButton href={profile.phoneHref}>{profile.phone}</MagneticButton>
          </div>
        </div>

        <footer className="footer">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <div className="footer__links">
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.phoneHref}>Phone</a>
            <span>{profile.location}</span>
          </div>
          <button
            type="button"
            className="footer__top"
            onClick={() => onNavigate(0)}
            style={{ font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' }}
          >
            Back to top
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M8 13V3M3 8l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </footer>
      </div>
    </section>
  )
}

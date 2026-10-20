import { useRef } from 'react'
import { gsap, useGSAP, SplitText } from '../lib/gsap'
import { profile } from '../data/content'
import MagneticButton from './MagneticButton'
import { StripeMark, AmazonMark } from './BrandIcon'

type Props = { ready: boolean; onNavigate: (target: string | number) => void }

export default function Hero({ ready, onNavigate }: Props) {
  const root = useRef<HTMLElement>(null)

  // Ambient motion: blobs drift + follow the pointer, title parallax on scroll.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.hero__blob--1', { x: '-8vw', y: '10vh', duration: 14, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        gsap.to('.hero__blob--2', { x: '10vw', y: '-8vh', duration: 17, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        gsap.to('.hero__blob--3', { x: '-6vw', y: '-12vh', scale: 1.2, duration: 12, yoyo: true, repeat: -1, ease: 'sine.inOut' })

        const bx = gsap.quickTo('.hero__bg', 'x', { duration: 1.4, ease: 'power3' })
        const by = gsap.quickTo('.hero__bg', 'y', { duration: 1.4, ease: 'power3' })
        const onMove = (e: MouseEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5
          const ny = e.clientY / window.innerHeight - 0.5
          bx(nx * -40)
          by(ny * -40)
        }
        window.addEventListener('mousemove', onMove, { passive: true })

        gsap.to('.hero__inner', {
          yPercent: 18,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })

        return () => window.removeEventListener('mousemove', onMove)
      })
    },
    { scope: root },
  )

  // Intro choreography: runs once the preloader has finished.
  useGSAP(
    () => {
      if (!ready) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // `.alt` carries a gradient via background-clip:text, which breaks when its
      // glyphs are wrapped in transformed spans — so keep it whole and animate it as one unit.
      const split = SplitText.create('.hero__title .line', {
        type: 'chars,words',
        charsClass: 'char',
        wordsClass: 'word',
        ignore: '.alt',
      })
      const targets = gsap.utils.toArray<HTMLElement>('.hero__title .char, .hero__title .alt')

      gsap.set('.hero .reveal', { opacity: 1 })

      if (reduce) return

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from(targets, {
        yPercent: 115,
        rotateX: -40,
        stagger: { each: 0.025, from: 'start' },
        duration: 1.4,
      })
        .from('.hero__meta-item', { y: 24, autoAlpha: 0, stagger: 0.08, duration: 1 }, '-=1.0')
        .from('.hero__bottom', { y: 30, autoAlpha: 0, duration: 1.2 }, '-=0.9')
        .from('.hero__bottom', { borderTopColor: 'rgba(255,255,255,0)', duration: 1 }, '<')
        .from('.hero__desc, .hero__roles, .hero__scroll, .btn-row', { y: 20, autoAlpha: 0, stagger: 0.1, duration: 1 }, '<0.1')
        .from('.hero__blob', { scale: 0.6, autoAlpha: 0, stagger: 0.1, duration: 2, ease: 'power3.out' }, 0)

      return () => split.revert()
    },
    { scope: root, dependencies: [ready] },
  )

  return (
    <section className="hero" ref={root} id="top">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
        <div className="hero__noise" />
      </div>

      <div className="container hero__inner">
        <div className="hero__meta reveal">
          <span className="hero__meta-item">
            <span className="dot" /> Available for senior roles
          </span>
          <span className="hero__meta-item">{profile.location}</span>
          <span className="hero__meta-item hero__meta-item--brands">
            <StripeMark size={18} /> Stripe <span className="sep">·</span> <AmazonMark size={18} /> ex-Amazon
          </span>
        </div>

        <h1 className="hero__title" aria-label={`${profile.name}, ${profile.role}`}>
          <span className="line-mask">
            <span className="line">Max Zhao</span>
          </span>
          <span className="line-mask">
            <span className="line line--sub">
              <span className="alt">Senior</span> Full Stack Engineer
            </span>
          </span>
        </h1>

        <div className="hero__bottom reveal">
          <p className="hero__desc">
            I build the systems behind money movement: high-throughput billing, metering, and pricing
            platforms — plus the AI agents that operate them.
          </p>
          <div className="hero__roles">
            <span className="with-brand">
              <StripeMark size={20} />
              <span>
                <strong>Stripe</strong> — Senior Software Engineer, 2021 → now
              </span>
            </span>
            <span className="with-brand">
              <AmazonMark size={20} />
              <span>
                <strong>Amazon</strong> — Software Engineer, 2019 → 2021
              </span>
            </span>
            <div className="btn-row" style={{ marginTop: '1.25rem' }}>
              <MagneticButton href="#work" variant="primary" onClick={(e) => { e.preventDefault(); onNavigate('#work') }}>
                See the work
              </MagneticButton>
              <MagneticButton href={`mailto:${profile.email}`}>Email me</MagneticButton>
            </div>
          </div>
          <div className="hero__scroll">
            <span className="hero__scroll-line" />
            Scroll
          </div>
        </div>
      </div>
    </section>
  )
}

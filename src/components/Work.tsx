import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { projects, profile } from '../data/content'

export default function Work() {
  const root = useRef<HTMLElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: pinned horizontal gallery
      mm.add('(min-width: 761px) and (prefers-reduced-motion: no-preference)', () => {
        const pin = root.current!.querySelector<HTMLElement>('.work__pin')!
        const track = root.current!.querySelector<HTMLElement>('.work__track')!
        const total = projects.length

        const getDistance = () => track.scrollWidth - window.innerWidth

        const scrollTween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getDistance() * 1.1}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const i = Math.min(total, Math.max(1, Math.round(self.progress * (total - 1)) + 1))
              if (counterRef.current) counterRef.current.textContent = `${String(i).padStart(2, '0')} / ${String(total).padStart(2, '0')}`
            },
          },
        })

        // Each card drifts in as it approaches, tied to the horizontal movement.
        gsap.utils.toArray<HTMLElement>('.card').forEach((card) => {
          gsap.from(card.querySelectorAll('.card__body > *'), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: {
              containerAnimation: scrollTween,
              trigger: card,
              start: 'left 85%',
              toggleActions: 'play none none reverse',
            },
          })
          gsap.fromTo(
            card.querySelector('.card__orb'),
            { xPercent: 40 },
            {
              xPercent: -40,
              ease: 'none',
              scrollTrigger: {
                containerAnimation: scrollTween,
                trigger: card,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })

        gsap.from('.work__header > *', {
          y: 30,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: pin, start: 'top 70%' },
        })
      })

      // Mobile / reduced motion: simple stacked reveal
      mm.add('(max-width: 760px), (prefers-reduced-motion: reduce)', (ctx) => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        void ctx
        gsap.utils.toArray<HTMLElement>('.card').forEach((card) => {
          gsap.from(card, {
            y: 40,
            autoAlpha: 0,
            duration: reduce ? 0 : 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          })
        })
        if (counterRef.current) counterRef.current.textContent = `${String(projects.length).padStart(2, '0')} projects`
      })
    },
    { scope: root },
  )

  return (
    <section className="work" id="work" ref={root}>
      <div className="work__pin">
        <div className="work__header">
          <div>
            <span className="eyebrow">03 — Selected work</span>
            <h2 className="h2" style={{ marginTop: '1rem' }}>
              Systems that <em className="grad-text">move money</em>
            </h2>
          </div>
          <span className="work__counter" ref={counterRef}>
            01 / {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        <div className="work__track">
          {projects.map((p) => (
            <article
              className="card"
              key={p.index}
              data-cursor
              style={{ '--c1': p.hue[0], '--c2': p.hue[1] } as React.CSSProperties}
            >
              <div className="card__glow" aria-hidden="true" />
              <div className="card__orb" aria-hidden="true" />
              <div className="card__top">
                <span className="card__index">{p.index}</span>
                <span className="card__company">{p.company}</span>
              </div>
              <div className="card__body">
                <span className="card__cat">{p.category}</span>
                <h3 className="card__title">{p.title}</h3>
                <p className="card__desc">{p.description}</p>
                <div className="card__stack">
                  {p.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          <div className="work__end">
            <a className="work__end-link" href={`mailto:${profile.email}`}>
              Let's build
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 19L19 5M19 5H9M19 5v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

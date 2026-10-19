import { useRef } from 'react'
import { gsap, useGSAP, SplitText } from '../lib/gsap'
import { profile, stats } from '../data/content'

export default function About() {
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

          // Section header
          gsap.from('.about .section-head > *', {
            y: 30,
            autoAlpha: 0,
            stagger: 0.1,
            duration: reduce ? 0 : 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.section-head', start: 'top 85%' },
          })

          // Statement: word-by-word scrub reveal
          const split = SplitText.create('.about__statement', { type: 'words', wordsClass: 'word' })
          gsap.to(split.words, {
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            duration: reduce ? 0 : 1,
            scrollTrigger: {
              trigger: '.about__statement',
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: reduce ? false : 0.6,
            },
          })

          // Focus list
          gsap.from('.about__focus li', {
            x: 24,
            autoAlpha: 0,
            stagger: 0.07,
            duration: reduce ? 0 : 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.about__focus', start: 'top 80%' },
          })

          // Stats: slide in + count up
          gsap.from('.stat', {
            y: 40,
            autoAlpha: 0,
            stagger: 0.1,
            duration: reduce ? 0 : 1.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.stats', start: 'top 85%' },
          })

          gsap.utils.toArray<HTMLElement>('.stat__num').forEach((el) => {
            const target = Number(el.dataset.value)
            const obj = { v: 0 }
            gsap.to(obj, {
              v: target,
              duration: reduce ? 0 : 1.8,
              ease: 'power3.out',
              onUpdate: () => (el.textContent = String(Math.round(obj.v))),
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            })
          })

          return () => split.revert()
        },
      )
    },
    { scope: root },
  )

  return (
    <section className="section about" id="about" ref={root}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">01 — About</span>
          <h2 className="h2">
            Built for <em className="grad-text">scale</em>
          </h2>
        </div>

        <div className="about__grid">
          <p className="about__statement">{profile.summary}</p>

          <aside className="about__side">
            <ul className="about__focus">
              {profile.focus.map((f, i) => (
                <li key={f}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {f}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="stats">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__value">
                <span className="stat__num" data-value={s.value}>
                  0
                </span>
                {s.suffix && <sup>{s.suffix}</sup>}
              </div>
              <p className="stat__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

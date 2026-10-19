import { useRef } from 'react'
import { gsap, useGSAP, SplitText } from '../lib/gsap'
import { experience } from '../data/content'

export default function Experience() {
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

          gsap.from('.exp .section-head > *', {
            y: 30,
            autoAlpha: 0,
            stagger: 0.1,
            duration: d(1.2),
            ease: 'expo.out',
            scrollTrigger: { trigger: '.exp .section-head', start: 'top 85%' },
          })

          const splits: SplitText[] = []

          gsap.utils.toArray<HTMLElement>('.exp__item').forEach((item) => {
            const company = item.querySelector('.exp__company')!
            const split = SplitText.create(company, { type: 'chars', charsClass: 'char' })
            splits.push(split)

            const intro = gsap.timeline({
              defaults: { ease: 'expo.out' },
              scrollTrigger: { trigger: item, start: 'top 75%' },
            })
            intro
              .from(split.chars, { yPercent: 110, stagger: 0.03, duration: d(1.1) })
              .from(
                item.querySelectorAll('.exp__title, .exp__period, .exp__tagline'),
                { y: 20, autoAlpha: 0, stagger: 0.08, duration: d(1) },
                '-=0.7',
              )

            // Bullets stagger in individually as they enter.
            item.querySelectorAll<HTMLElement>('.exp__bullet').forEach((b) => {
              gsap.from(b, {
                y: 36,
                autoAlpha: 0,
                duration: d(1),
                ease: 'expo.out',
                scrollTrigger: { trigger: b, start: 'top 88%' },
              })
              gsap.from(b.querySelectorAll('.chip'), {
                y: 8,
                autoAlpha: 0,
                stagger: 0.03,
                duration: d(0.6),
                scrollTrigger: { trigger: b, start: 'top 85%' },
              })
            })

            gsap.from(item.querySelector('.exp__stack'), {
              autoAlpha: 0,
              y: 16,
              duration: d(1),
              scrollTrigger: { trigger: item.querySelector('.exp__stack'), start: 'top 92%' },
            })

            // Progress bar scrubs with how far through the role you've read.
            gsap.to(item.querySelector('.exp__bar span'), {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top 60%',
                end: 'bottom 60%',
                scrub: reduce ? false : 0.4,
              },
            })
          })

          return () => splits.forEach((s) => s.revert())
        },
      )
    },
    { scope: root },
  )

  return (
    <section className="section exp" id="experience" ref={root}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">02 — Experience</span>
          <h2 className="h2">
            Seven years of <em className="grad-text">shipping</em>
          </h2>
        </div>

        {experience.map((job) => (
          <article className="exp__item" key={job.company}>
            <div className="exp__left">
              <h3 className="exp__company line-mask">{job.company}</h3>
              <div className="exp__title">{job.title}</div>
              <div className="exp__period">{job.period}</div>
              <p className="exp__tagline">{job.tagline}</p>
              <div className="exp__bar" aria-hidden="true">
                <span style={{ background: `linear-gradient(90deg, ${job.accent}, #f4f4f5)` }} />
              </div>
            </div>

            <div className="exp__right">
              {job.bullets.map((b, i) => (
                <div className="exp__bullet" key={b.title}>
                  <span className="exp__bullet-index">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4 className="exp__bullet-title">{b.title}</h4>
                    <p className="exp__bullet-body">{b.body}</p>
                    <div className="exp__bullet-stack">
                      {b.stack.map((s) => (
                        <span className="chip" key={s}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <div className="exp__stack">
                {job.stack.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

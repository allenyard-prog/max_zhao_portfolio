import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { skills, education } from '../data/content'

export default function Skills() {
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

          gsap.from('.skills .section-head > *', {
            y: 30,
            autoAlpha: 0,
            stagger: 0.1,
            duration: d(1.2),
            ease: 'expo.out',
            scrollTrigger: { trigger: '.skills .section-head', start: 'top 85%' },
          })

          gsap.utils.toArray<HTMLElement>('.skill-group').forEach((group) => {
            const tl = gsap.timeline({
              defaults: { ease: 'expo.out' },
              scrollTrigger: { trigger: group, start: 'top 85%' },
            })
            tl.from(group, { autoAlpha: 0, duration: d(0.8) })
              .from(group.querySelector('.skill-group__name'), { x: -16, autoAlpha: 0, duration: d(0.8) }, 0.05)
              .from(
                group.querySelectorAll('.skill'),
                { y: 18, autoAlpha: 0, stagger: { each: 0.04, from: 'start' }, duration: d(0.9) },
                0.1,
              )
          })

          gsap.from('.edu > *', {
            y: 24,
            autoAlpha: 0,
            stagger: 0.1,
            duration: d(1),
            ease: 'expo.out',
            scrollTrigger: { trigger: '.edu', start: 'top 88%' },
          })
        },
      )
    },
    { scope: root },
  )

  return (
    <section className="section skills" id="skills" ref={root}>
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">05 — Skills</span>
          <h2 className="h2">
            Full stack, <em className="grad-text">end to end</em>
          </h2>
        </div>

        <div className="skills__grid">
          {skills.map((g, i) => (
            <div className="skill-group" key={g.group}>
              <div className="skill-group__name">
                <span className="skill-group__num">{String(i + 1).padStart(2, '0')}</span>
                {g.group}
              </div>
              <div className="skill-group__items">
                {g.items.map((s) => (
                  <span className="skill" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="edu">
          <div className="edu__mark">UC</div>
          <div>
            <div className="edu__school">{education.school}</div>
            <div className="edu__degree">{education.degree}</div>
          </div>
          <div className="edu__period">{education.period}</div>
        </div>
      </div>
    </section>
  )
}

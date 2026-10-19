import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

type Props = { onComplete: () => void }

export default function Preloader({ onComplete }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const counter = { v: 0 }

      const tl = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete,
      })

      if (reduce) {
        tl.to(root.current, { autoAlpha: 0, duration: 0.3 })
        return
      }

      tl.from('.preloader__label', { yPercent: 120, duration: 0.8, ease: 'expo.out' }, 0)
        .from('.preloader__count', { yPercent: 40, autoAlpha: 0, duration: 0.8, ease: 'expo.out' }, 0.05)
        .to(
          counter,
          {
            v: 100,
            duration: 1.9,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0')
              }
            },
          },
          0.2,
        )
        .to('.preloader__bar', { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0.2)
        .to('.preloader__inner', { yPercent: -30, autoAlpha: 0, duration: 0.6 }, '-=0.15')
        .to('.preloader__curtain', { yPercent: 0, duration: 0.7 }, '<0.05')
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.2')
    },
    { scope: root },
  )

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__inner">
        <div className="line-mask">
          <span className="preloader__label">Max Zhao — Portfolio</span>
        </div>
        <span className="preloader__count" ref={countRef}>
          000
        </span>
      </div>
      <div className="preloader__bar" />
      <div className="preloader__curtain" />
    </div>
  )
}

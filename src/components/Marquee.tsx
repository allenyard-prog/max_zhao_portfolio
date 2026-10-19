import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'
import { marquee } from '../data/content'

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const track = root.current!.querySelector<HTMLElement>('.marquee__track')!
        const group = track.querySelector<HTMLElement>('.marquee__group')!
        const distance = group.offsetWidth

        // Infinite loop — one group width, then wrap seamlessly.
        const loop = gsap.to(track, {
          x: -distance,
          duration: distance / 60,
          ease: 'none',
          repeat: -1,
          modifiers: { x: gsap.utils.unitize((x: number) => x % distance) },
        })

        // Scroll velocity nudges the loop speed & direction.
        const slow = gsap.to(loop, { timeScale: 1, duration: 1.2, paused: true, ease: 'power2.out' })
        ScrollTrigger.create({
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 250)
            loop.timeScale(1 + v)
            slow.invalidate().restart()
          },
        })
      })
    },
    { scope: root },
  )

  const items = [...marquee, ...marquee]

  return (
    <div className="marquee" ref={root} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((g) => (
          <div className="marquee__group" key={g}>
            {items.map((item, i) => (
              <span className="marquee__item" key={`${g}-${i}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' })

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, autoAlpha: 0 })

    let shown = false
    const onMove = (e: MouseEvent) => {
      if (!shown) {
        shown = true
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.4 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest('a, button, [data-cursor]')

    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring.current, { scale: 1.8, duration: 0.4, ease: 'power3.out' })
        gsap.to(dot.current, { scale: 0.4, duration: 0.4, ease: 'power3.out' })
      }
    }
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) {
        gsap.to(ring.current, { scale: 1, duration: 0.5, ease: 'power3.out' })
        gsap.to(dot.current, { scale: 1, duration: 0.5, ease: 'power3.out' })
      }
    }
    const onDown = () => gsap.to(ring.current, { scale: 0.8, duration: 0.2 })
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.4, ease: 'back.out(2)' })

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  })

  return (
    <>
      <div className="cursor" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  )
}

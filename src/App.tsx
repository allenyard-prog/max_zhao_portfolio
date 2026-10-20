import { useRef, useState } from 'react'
import { gsap, useGSAP, ScrollSmoother, ScrollTrigger } from './lib/gsap'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Experience from './components/Experience'
import Architecture from './components/Architecture'
import Work from './components/Work'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  const smootherRef = useRef<ScrollSmoother | null>(null)

  useGSAP(() => {
    document.body.classList.add('is-loading')
    window.scrollTo(0, 0)

    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.1,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: false,
    })
    smoother.paused(true)
    smootherRef.current = smoother

    // Re-measure once webfonts settle so trigger positions are exact.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      smootherRef.current = null
      document.body.classList.remove('is-loading')
    }
  }, [])

  useGSAP(
    () => {
      if (!ready) return
      document.body.classList.remove('is-loading')
      smootherRef.current?.paused(false)
      ScrollTrigger.refresh()
    },
    { dependencies: [ready] },
  )

  const scrollTo = (target: string | number) => {
    const smoother = smootherRef.current
    if (smoother) {
      smoother.scrollTo(target, true, 'top top')
    } else {
      gsap.to(window, { scrollTo: target, duration: 1, ease: 'power3.inOut' })
    }
  }

  return (
    <>
      {!ready && <Preloader onComplete={() => setReady(true)} />}
      <Cursor />
      <Nav onNavigate={scrollTo} ready={ready} />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero ready={ready} onNavigate={scrollTo} />
            <Marquee />
            <About />
            <Experience />
            <Architecture />
            <Work />
            <Skills />
            <Contact onNavigate={scrollTo} />
          </main>
        </div>
      </div>
    </>
  )
}

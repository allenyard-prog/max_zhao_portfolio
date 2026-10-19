import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)

gsap.defaults({ ease: 'power3.out', duration: 1 })

export const EASE_OUT = 'expo.out'
export const EASE_INOUT = 'power4.inOut'

export const REDUCED = '(prefers-reduced-motion: reduce)'
export const MOTION = '(prefers-reduced-motion: no-preference)'

export { gsap, useGSAP, ScrollTrigger, ScrollSmoother, SplitText }

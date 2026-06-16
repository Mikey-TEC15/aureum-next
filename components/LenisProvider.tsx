'use client'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionConfig } from 'framer-motion'

gsap.registerPlugin(ScrollTrigger)

// Exposes the live Lenis instance so other components (e.g. the pricing
// overlay) can pause/resume smooth scrolling while a modal is open.
const LenisContext = createContext<Lenis | null>(null)
export const useLenis = () => useContext(LenisContext)

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    })
    setLenis(instance)

    // Critical: sync Lenis scroll events with GSAP ScrollTrigger
    instance.on('scroll', ScrollTrigger.update)

    const rafId = gsap.ticker.add((time) => {
      instance.raf(time * 1000)
    })

    // Prevent GSAP from compensating for dropped frames
    gsap.ticker.lagSmoothing(0)

    return () => {
      instance.destroy()
      gsap.ticker.remove(rafId)
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LenisContext.Provider>
  )
}

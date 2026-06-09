'use client'
import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const ringX = useSpring(mouseX, { damping: 28, stiffness: 350, mass: 0.5 })
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 350, mass: 0.5 })
  const ringScale = useSpring(1, { damping: 20, stiffness: 400 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    document.body.style.cursor = 'none'

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [role="button"], [data-cursor]')
      if (el) ringScale.set(2.2)
    }

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [role="button"], [data-cursor]')
      if (el) ringScale.set(1)
    }

    const onDown = () => ringScale.set(0.8)
    const onUp = () => ringScale.set(1)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
    }
  }, [mouseX, mouseY, ringScale])

  return (
    <>
      {/* Outer ring — spring delayed */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-white"
        style={{
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
          x: ringX,
          y: ringY,
          scale: ringScale,
          mixBlendMode: 'difference',
        }}
      />
      {/* Inner dot — instant */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          x: mouseX,
          y: mouseY,
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}

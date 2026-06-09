'use client'
import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  maxTilt?: number
}

export default function TiltCard({ children, className = '', style, maxTilt = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useSpring(0, { damping: 18, stiffness: 280 })
  const rotY = useSpring(0, { damping: 18, stiffness: 280 })
  const scale = useSpring(1, { damping: 20, stiffness: 300 })
  const glareX = useSpring(50, { damping: 20, stiffness: 200 })
  const glareY = useSpring(50, { damping: 20, stiffness: 200 })
  const glareOpacity = useSpring(0, { damping: 20, stiffness: 300 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // 0..1
    const y = (e.clientY - rect.top)  / rect.height  // 0..1
    rotY.set((x - 0.5) * maxTilt * 2)
    rotX.set(-(y - 0.5) * maxTilt * 2)
    glareX.set(x * 100)
    glareY.set(y * 100)
    glareOpacity.set(0.15)
    scale.set(1.015)
  }

  const onLeave = () => {
    rotX.set(0)
    rotY.set(0)
    glareOpacity.set(0)
    scale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 800,
        ...style,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glare highlight */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          opacity: glareOpacity,
        }}
      />
      <div className="relative z-[2]" style={{ transform: 'translateZ(12px)' }}>
        {children}
      </div>
    </motion.div>
  )
}

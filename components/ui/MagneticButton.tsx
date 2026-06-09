'use client'
import { useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  /** How far the container travels (default 0.38) */
  strength?: number
  /** Inner content moves at a different rate — creates depth */
  innerStrength?: number
}

export default function MagneticButton({
  children,
  className = '',
  strength      = 0.38,
  innerStrength = 0.18,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const config = { damping: 14, stiffness: 220 }

  // Outer container — travels further
  const x = useSpring(0, config)
  const y = useSpring(0, config)

  // Inner content — travels less, creates parallax depth
  const ix = useSpring(0, config)
  const iy = useSpring(0, config)

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx   = e.clientX - (rect.left + rect.width  / 2)
    const dy   = e.clientY - (rect.top  + rect.height / 2)
    x.set(dx * strength)
    y.set(dy * strength)
    ix.set(dx * innerStrength)
    iy.set(dy * innerStrength)
  }

  const onLeave = () => {
    x.set(0); y.set(0)
    ix.set(0); iy.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x, y, display: 'inline-flex' }}
      className={className}
    >
      <motion.span style={{ x: ix, y: iy, display: 'inline-flex' }}>
        {children}
      </motion.span>
    </motion.div>
  )
}

'use client'
import { useRef } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className = '',
  style,
  spotlightColor = 'rgba(212,175,55,0.07)',
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--sx', `${x}px`)
    ref.current.style.setProperty('--sy', `${y}px`)
    ref.current.style.setProperty('--opacity', '1')
  }

  const onLeave = () => {
    ref.current?.style.setProperty('--opacity', '0')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        // CSS vars for the spotlight
        ['--sx' as string]: '50%',
        ['--sy' as string]: '50%',
        ['--opacity' as string]: '0',
        ['--color' as string]: spotlightColor,
      }}
    >
      {/* Spotlight layer */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-300"
        style={{
          background: `radial-gradient(300px circle at var(--sx) var(--sy), var(--color), transparent 70%)`,
          opacity: 'var(--opacity)',
        }}
      />
      <div className="relative z-[2]">{children}</div>
    </div>
  )
}

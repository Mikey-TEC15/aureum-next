'use client'
import { motion } from 'framer-motion'
import { springs } from '@/lib/motion'

export interface SlideProps {
  /** Beat actualmente revelado dentro de la diapositiva */
  step: number
}

interface BeatProps {
  /** Beat en el que este bloque aparece */
  at: number
  step: number
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Desplazamiento de entrada en px */
  y?: number
  x?: number
  delay?: number
}

/**
 * Bloque que aparece cuando el presentador llega a su beat.
 *
 * Sin blur ni filtros: esto se graba en pantalla y los filtros por frame
 * tiran los FPS de la captura. Solo opacidad y transform.
 */
export default function Beat({
  at,
  step,
  children,
  className,
  style,
  y = 16,
  x = 0,
  delay = 0,
}: BeatProps) {
  const shown = step >= at

  return (
    <motion.div
      className={className}
      style={style}
      initial={false}
      animate={shown ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ ...springs.smooth, delay: shown ? delay : 0 }}
    >
      {children}
    </motion.div>
  )
}

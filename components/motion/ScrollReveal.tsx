'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  delay?: number
  margin?: `${number}${'px' | '%'}`
}

/** Wraps children in a stagger container — each direct child animates in sequence */
export function ScrollReveal({
  children,
  className,
  stagger = 0.09,
  delay   = 0.05,
  margin  = '-8%',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

interface RevealItemProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
}

/** Direct child of ScrollReveal — inherits the stagger */
export function RevealItem({ children, className, variants = fadeUp }: RevealItemProps) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}

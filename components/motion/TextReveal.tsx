'use client'
import { Fragment, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { springs } from '@/lib/motion'

interface TextRevealProps {
  text: string
  as?: keyof React.JSX.IntrinsicElements
  mode?: 'word' | 'char'
  className?: string
  /** Initial delay before first unit animates */
  delay?: number
  /** Gap between each unit */
  stagger?: number
  /** Don't wait for scroll — animate on mount */
  immediate?: boolean
  style?: React.CSSProperties
}

export default function TextReveal({
  text,
  as: Tag = 'span',
  mode = 'word',
  className,
  delay = 0,
  stagger,
  immediate = false,
  style,
}: TextRevealProps) {
  const defaultStagger = mode === 'char' ? 0.022 : 0.07
  const gap = stagger ?? defaultStagger

  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: '-6% 0px',
  })

  const shouldAnimate = immediate || inView
  const units = mode === 'word' ? text.split(' ') : text.split('')

  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.span

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={className}
      style={style}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <Fragment key={i}>
          {/* overflow:hidden creates the mask — the text slides up from behind it */}
          <span
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              lineHeight: 1.1,
            }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: mode === 'char' ? '115%' : '110%', opacity: mode === 'char' ? 0 : 1 }}
              animate={shouldAnimate
                ? { y: '0%', opacity: 1 }
                : { y: mode === 'char' ? '115%' : '110%', opacity: mode === 'char' ? 0 : 1 }
              }
              transition={{ ...springs.smooth, delay: delay + i * gap }}
            >
              {unit}
            </motion.span>
          </span>
          {/* Space between words (outside clip so line-wrap works naturally) */}
          {mode === 'word' && i < units.length - 1 && ' '}
        </Fragment>
      ))}
    </MotionTag>
  )
}

import type { Variants, Transition } from 'framer-motion'

// ── Spring presets ─────────────────────────────────────────────────────────────
export const springs = {
  // UI interactions — snappy, immediate
  snappy:  { type: 'spring', stiffness: 420, damping: 42 } as Transition,
  // Text reveals — smooth, intentional
  smooth:  { type: 'spring', stiffness: 110, damping: 26 } as Transition,
  // Parallax / ambient — gentle drift
  gentle:  { type: 'spring', stiffness:  60, damping: 20 } as Transition,
  // Buttons / interactive — slight bounce
  bouncy:  { type: 'spring', stiffness: 300, damping: 24 } as Transition,
}

// ── Text mask reveals (overflow:hidden clip technique) ─────────────────────────
// y:'115%' ensures the text starts fully hidden below the clip edge
export const wordUp: Variants = {
  hidden:  { y: '115%' },
  visible: { y: '0%',   transition: springs.smooth },
}

export const charUp: Variants = {
  hidden:  { y: '115%', opacity: 0 },
  visible: { y: '0%',   opacity: 1, transition: springs.smooth },
}

// ── Element-level reveals ──────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0,   transition: springs.smooth },
}

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0,   transition: springs.smooth },
}

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1,    transition: springs.bouncy },
}

// Line grows from left to right
export const lineGrow: Variants = {
  hidden:  { scaleX: 0 },
  visible: { scaleX: 1,  transition: springs.snappy },
}

// ── Stagger containers ─────────────────────────────────────────────────────────
export function staggerContainer(
  staggerChildren = 0.08,
  delayChildren    = 0.1,
): Variants {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren, delayChildren } },
  }
}

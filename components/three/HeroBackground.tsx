'use client'
import { motion } from 'framer-motion'

const dots = [
  { x: '62%', y: '18%', size: 2, opacity: 0.5, delay: 0 },
  { x: '75%', y: '32%', size: 1.5, opacity: 0.35, delay: 0.8 },
  { x: '55%', y: '55%', size: 2.5, opacity: 0.4, delay: 1.4 },
  { x: '82%', y: '24%', size: 1.5, opacity: 0.3, delay: 0.4 },
  { x: '88%', y: '62%', size: 2, opacity: 0.25, delay: 1.8 },
  { x: '68%', y: '72%', size: 1.5, opacity: 0.3, delay: 2.2 },
  { x: '92%', y: '42%', size: 1, opacity: 0.2, delay: 1.0 },
  { x: '58%', y: '82%', size: 1.5, opacity: 0.2, delay: 2.6 },
  { x: '78%', y: '80%', size: 1, opacity: 0.18, delay: 3.0 },
  { x: '50%', y: '38%', size: 1, opacity: 0.22, delay: 0.6 },
  { x: '95%', y: '20%', size: 1, opacity: 0.15, delay: 1.6 },
  { x: '72%', y: '50%', size: 2, opacity: 0.28, delay: 2.0 },
]

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Primary glow orb — large, soft, right-center */}
      <motion.div
        className="absolute"
        style={{
          right: '-5%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '55vw',
          height: '55vw',
          maxWidth: 820,
          maxHeight: 820,
          background: 'radial-gradient(circle, rgba(212,175,55,0.13) 0%, rgba(212,175,55,0.05) 35%, transparent 70%)',
          borderRadius: '50%',
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary inner glow — tighter, brighter center */}
      <motion.div
        className="absolute"
        style={{
          right: '12%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '28vw',
          height: '28vw',
          maxWidth: 420,
          maxHeight: 420,
          background: 'radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)',
          borderRadius: '50%',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Floating dots */}
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size * 2,
            height: dot.size * 2,
            background: `rgba(212,175,55,${dot.opacity})`,
            boxShadow: `0 0 ${dot.size * 4}px rgba(212,175,55,${dot.opacity * 0.8})`,
          }}
          animate={{ y: [0, -8, 0], opacity: [dot.opacity, dot.opacity * 0.4, dot.opacity] }}
          transition={{
            duration: 4 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  )
}

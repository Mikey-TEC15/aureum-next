'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'

const E = [0.23, 1, 0.32, 1] as const

const metrics = [
  { value: 248, suffix: '%', label: 'Más leads generados', sublabel: 'promedio en 90 días' },
  { value: 5.8, suffix: '×', label: 'Retorno sobre inversión', sublabel: 'en Meta Ads' },
  { value: 89, suffix: '%', label: 'Clientes que renuevan', sublabel: 'cada año' },
  { value: 127, suffix: '+', label: 'Proyectos entregados', sublabel: 'desde 2020' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isDecimal = value % 1 !== 0

  const rounded = useTransform(motionValue, (v) =>
    isDecimal ? v.toFixed(1) : Math.round(v).toString()
  )

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 2.2,
        ease: [0.25, 0.1, 0.25, 1],
      })
    }
  }, [isInView, motionValue, value])

  return (
    <span ref={ref} className="font-display font-bold text-white" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
      <motion.span>{rounded}</motion.span>
      <span className="text-gold">{suffix}</span>
    </span>
  )
}

function MetricCard({ m, index }: { m: (typeof metrics)[0]; index: number }) {
  const { ref, isInView } = useReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: E }}
      className="bg-[#111111] p-8 md:p-10"
    >
      <div className="w-8 h-px bg-gold/40 mb-5" />
      <Counter value={m.value} suffix={m.suffix} />
      <p className="font-body text-white/60 text-sm mt-3 leading-snug">{m.label}</p>
      <p className="font-body text-white/25 text-[0.68rem] tracking-wide uppercase mt-1">{m.sublabel}</p>
    </motion.div>
  )
}

export default function Benefits() {
  const { ref: headerRef, isInView: headerInView } = useReveal()

  return (
    <section
      id="beneficios"
      className="grain-overlay relative py-[clamp(6rem,10vw,10rem)] px-6 md:px-10"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: E }}
          className="grid md:grid-cols-2 gap-6 items-end mb-[clamp(4rem,6vw,6rem)]"
        >
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-tightest"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
          >
            El impacto de trabajar{' '}
            <em className="not-italic text-gold">con precisión.</em>
          </h2>
          <p className="font-body text-white/45 text-[0.9rem] leading-[1.75] max-w-[42ch]">
            Cada estrategia tiene una métrica que la respalda. Estos son los resultados promedio que generamos para nuestros clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

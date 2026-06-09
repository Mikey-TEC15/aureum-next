'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import TextReveal from '@/components/motion/TextReveal'
import { springs } from '@/lib/motion'

const metrics = [
  { value: 248, suffix: '%', label: 'Más leads generados',        sublabel: 'promedio en 90 días' },
  { value: 5.8, suffix: '×', label: 'Retorno sobre inversión',    sublabel: 'en Meta Ads'         },
  { value:  89, suffix: '%', label: 'Clientes que renuevan',      sublabel: 'cada año'             },
  { value: 127, suffix: '+', label: 'Proyectos entregados',       sublabel: 'desde 2020'           },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref        = useRef<HTMLSpanElement>(null)
  const motionVal  = useMotionValue(0)
  const isInView   = useInView(ref, { once: true, margin: '-60px' })
  const isDecimal  = value % 1 !== 0
  const rounded    = useTransform(motionVal, (v) =>
    isDecimal ? v.toFixed(1) : Math.round(v).toString()
  )

  useEffect(() => {
    if (isInView) animate(motionVal, value, { duration: 2.0, ease: [0.25, 0.1, 0.25, 1] })
  }, [isInView, motionVal, value])

  return (
    <span
      ref={ref}
      className="font-display font-bold text-white nums"
      style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.2rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
    >
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...springs.smooth, delay: index * 0.08 }}
      className="relative p-8 md:p-10 overflow-hidden"
      style={{ background: 'var(--surface-1)' }}
    >
      {/* Animated top accent */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.5) 0%, rgba(212,175,55,0.1) 100%)' }}
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : {}}
        transition={{ duration: 0.9, delay: index * 0.08 + 0.15, ease: 'easeOut' }}
      />

      <div className="w-6 h-px mb-7" style={{ background: 'rgba(212,175,55,0.3)' }} />

      <Counter value={m.value} suffix={m.suffix} />

      <p
        className="font-body mt-4 leading-snug"
        style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}
      >
        {m.label}
      </p>
      <p
        className="font-body label-sm mt-1.5"
        style={{ fontSize: '0.62rem', color: 'var(--text-ghost)', letterSpacing: '0.1em' }}
      >
        {m.sublabel}
      </p>
    </motion.div>
  )
}

export default function Benefits() {
  const { ref: headerRef, isInView: headerInView } = useReveal()

  return (
    <section
      id="beneficios"
      className="grain-overlay relative py-[clamp(7rem,11vw,11rem)] px-6 md:px-10"
      style={{ background: 'transparent' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid md:grid-cols-2 gap-8 items-end mb-[clamp(4rem,6vw,7rem)]">
          <h2
            className="font-display font-bold text-white tracking-tightest"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', lineHeight: 1.08 }}
          >
            <TextReveal text="El impacto de trabajar" mode="word" style={{ display: 'block' }} />
            <TextReveal text="con precisión." mode="word" className="text-gold" style={{ display: 'block' }} />
          </h2>
          <motion.p
            ref={headerRef}
            className="font-body leading-[1.78] max-w-[42ch]"
            style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...springs.smooth, delay: 0.15 }}
          >
            Cada estrategia tiene una métrica que la respalda. Estos son los resultados promedio que generamos para nuestros clientes.
          </motion.p>
        </div>

        {/* Metric grid — hairline gaps as borders */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'var(--border)' }}
        >
          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}

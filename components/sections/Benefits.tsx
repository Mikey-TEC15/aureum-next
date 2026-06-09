'use client'
import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import TextReveal from '@/components/motion/TextReveal'
import { springs } from '@/lib/motion'
import { WA } from '@/lib/whatsapp'

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

        {/* Conversion bridge — captura el momento de mayor intención */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-6%' }}
          transition={{ ...springs.smooth, delay: 0.2 }}
          className="mt-px flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 md:p-10"
          style={{ background: 'var(--surface-1)', borderTop: '1px solid rgba(212,175,55,0.12)' }}
        >
          <div>
            <p
              className="font-display font-bold text-white mb-1.5"
              style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', letterSpacing: '-0.02em' }}
            >
              ¿Tu negocio podría estar aquí?
            </p>
            <p className="font-body" style={{ fontSize: '0.83rem', color: 'var(--text-secondary)' }}>
              Primera consulta gratuita. Sin contratos a largo plazo.
            </p>
          </div>
          <a
            href={WA.benefits}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-ink font-body font-semibold label-sm px-6 py-3 hover:bg-gold-light transition-colors duration-200 flex-shrink-0"
            style={{ borderRadius: 8 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Quiero estos resultados
          </a>
        </motion.div>

      </div>
    </section>
  )
}

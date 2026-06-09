'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'

const E = [0.23, 1, 0.32, 1] as const

const cases = [
  {
    num: '01',
    client: 'Clínica Dental Norte',
    sector: 'Salud',
    headline: 'De 8 a 47 pacientes nuevos por mes en 90 días.',
    body: 'Estrategia de Meta Ads más landing de alta conversión. Sin publicidad previa, sin base de datos. Solo estructura, segmentación y ejecución sistemática.',
    metrics: [
      { value: '487', suffix: '%', label: 'más citas agendadas' },
      { value: '4.2', suffix: '×', label: 'ROAS final' },
    ],
    dark: false,
  },
  {
    num: '02',
    client: 'E-commerce de Moda',
    sector: 'Retail',
    headline: 'Retargeting dinámico que convirtió carritos abandonados en ventas.',
    body: 'Automatización completa del embudo con segmentación por comportamiento. 60 días para escalar de cero a $180K en ventas mensuales.',
    metrics: [
      { value: '180', prefix: '$', suffix: 'K', label: 'en ventas / mes' },
      { value: '68', suffix: '%', label: 'recuperación de carritos' },
    ],
    dark: true,
  },
  {
    num: '03',
    client: 'Agencia Inmobiliaria',
    sector: 'Real Estate',
    headline: 'Leads calificados que llegan listos para cerrar.',
    body: 'Sistema de lead scoring más WhatsApp automatizado. Reducción del ciclo de venta de 45 a 12 días en promedio. Tasa de cierre triplicada.',
    metrics: [
      { value: '73', prefix: '−', suffix: '%', label: 'ciclo de venta' },
      { value: '3.1', suffix: '×', label: 'tasa de cierre' },
    ],
    dark: false,
  },
]

// Animated scan line that draws across when visible
function ScanLine({ inView, dark }: { inView: boolean; dark: boolean }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.1, ease: E, delay: 0.1 }}
      style={{
        originX: 0,
        height: 1,
        background: dark ? 'rgba(212,175,55,0.25)' : 'rgba(17,17,17,0.1)',
        marginBottom: '3rem',
      }}
    />
  )
}

function CaseArticle({ c, index }: { c: (typeof cases)[0]; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: E },
  })

  const metricStamp = (delay: number) => ({
    initial: { opacity: 0, scale: 0.82 },
    animate: inView ? { opacity: 1, scale: 1 } : {},
    transition: { duration: 0.55, delay, ease: E },
  })

  return (
    <article
      ref={ref}
      style={{
        background: c.dark ? '#111111' : '#FFFFFF',
        paddingTop: 'clamp(4rem, 7vw, 7rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ghost background number — gives depth without being decorative noise */}
      <div
        aria-hidden
        className="absolute right-0 top-0 pointer-events-none select-none"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(14rem, 28vw, 22rem)',
          lineHeight: 0.85,
          letterSpacing: '-0.06em',
          color: c.dark ? 'rgba(212,175,55,0.04)' : 'rgba(17,17,17,0.035)',
          userSelect: 'none',
        }}
      >
        {c.num}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Sector + client row */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-5 mb-8">
          <span
            className="font-body uppercase"
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.2em',
              color: c.dark ? 'rgba(212,175,55,0.5)' : 'rgba(17,17,17,0.35)',
            }}
          >
            Caso {c.num}
          </span>
          <div
            className="w-px h-3"
            style={{ background: c.dark ? 'rgba(255,255,255,0.1)' : 'rgba(17,17,17,0.15)' }}
          />
          <span
            className="font-body"
            style={{
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              color: c.dark ? 'rgba(255,255,255,0.3)' : 'rgba(17,17,17,0.35)',
              textTransform: 'uppercase',
            }}
          >
            {c.sector}
          </span>
          <span
            className="font-body"
            style={{
              fontSize: '0.65rem',
              color: c.dark ? 'rgba(212,175,55,0.75)' : '#D4AF37',
              letterSpacing: '0.01em',
            }}
          >
            {c.client}
          </span>
        </motion.div>

        <ScanLine inView={inView} dark={c.dark} />

        {/* Main editorial layout: headline left, metrics right */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Left: headline + body */}
          <div>
            <motion.h3
              {...fadeUp(0.2)}
              className="font-display font-bold leading-[1.1]"
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
                letterSpacing: '-0.025em',
                color: c.dark ? '#FFFFFF' : '#111111',
                marginBottom: '1.5rem',
                maxWidth: '28ch',
              }}
            >
              {c.headline}
            </motion.h3>

            <motion.p
              {...fadeUp(0.3)}
              className="font-body leading-[1.8]"
              style={{
                fontSize: '0.88rem',
                color: c.dark ? 'rgba(255,255,255,0.42)' : 'rgba(17,17,17,0.52)',
                maxWidth: '52ch',
              }}
            >
              {c.body}
            </motion.p>
          </div>

          {/* Right: metric stamps */}
          <div className="flex flex-row lg:flex-col gap-8 lg:gap-0">
            {c.metrics.map((m, mi) => (
              <motion.div
                key={m.label}
                {...metricStamp(0.35 + mi * 0.12)}
                className="lg:py-7 first:lg:pt-0 last:lg:pb-0"
                style={
                  mi > 0
                    ? { borderTop: `1px solid ${c.dark ? 'rgba(255,255,255,0.06)' : 'rgba(17,17,17,0.07)'}` }
                    : {}
                }
              >
                <div
                  className="font-display font-bold text-gold"
                  style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {m.prefix ?? ''}{m.value}{m.suffix}
                </div>
                <div
                  className="font-body mt-2"
                  style={{
                    fontSize: '0.62rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: c.dark ? 'rgba(255,255,255,0.28)' : 'rgba(17,17,17,0.38)',
                  }}
                >
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function CaseStudies() {
  const { ref: headerRef, isInView: headerInView } = useReveal()

  return (
    <section id="casos">
      {/* Section header — on a light bg, before the dark/light alternating cases */}
      <div
        className="bg-[#F8F8F6] px-6 md:px-10 pt-[clamp(6rem,10vw,10rem)] pb-[clamp(3rem,5vw,5rem)]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: E }}
            className="grid md:grid-cols-2 items-end gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-ink/25" />
                <span className="font-body text-ink/40 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
                  Casos de Éxito
                </span>
              </div>
              <h2
                className="font-display font-bold text-ink leading-[1.08] tracking-tightest"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Resultados que{' '}
                <em className="not-italic text-gold">se pueden medir.</em>
              </h2>
            </div>
            <p className="font-body text-[#777777] text-[0.88rem] leading-[1.8] max-w-[42ch]">
              Casos reales, números reales. Sin relleno, sin promedios inventados.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Case articles */}
      {cases.map((c, i) => (
        <CaseArticle key={c.client} c={c} index={i} />
      ))}

      {/* Bottom padding restore */}
      <div className="bg-white h-1" />
    </section>
  )
}

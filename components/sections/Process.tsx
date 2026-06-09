'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const E = [0.23, 1, 0.32, 1] as const

// ── Per-step abstract visuals ────────────────────────────────────────────────

function DiagnosticoVisual({ active }: { active: boolean }) {
  // Sonar rings expanding outward
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-full max-w-[160px]" aria-hidden>
      {[1, 2, 3].map((ring) => (
        <motion.circle
          key={ring}
          cx={80} cy={80}
          r={ring * 22}
          stroke="#D4AF37"
          strokeWidth={0.8}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={active
            ? { scale: [0.4, 1.2, 0.4], opacity: [0, 0.55, 0] }
            : { scale: 0.4, opacity: 0 }}
          style={{ originX: '80px', originY: '80px' }}
          transition={active ? { duration: 2.8, delay: ring * 0.45, repeat: Infinity, ease: 'easeOut' } : { duration: 0.3 }}
        />
      ))}
      <motion.circle
        cx={80} cy={80} r={6}
        fill="#D4AF37"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
        transition={active ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
      />
      <motion.line
        x1={80} y1={80} x2={80} y2={18}
        stroke="#D4AF37"
        strokeWidth={1}
        strokeLinecap="round"
        initial={{ rotate: 0 }}
        animate={active ? { rotate: 360 } : { rotate: 0 }}
        style={{ originX: '80px', originY: '80px' }}
        transition={active ? { duration: 3, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
      />
    </svg>
  )
}

function EstrategiaVisual({ active }: { active: boolean }) {
  // Target / crosshair locking on
  const rings = [42, 28, 14]
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-full max-w-[160px]" aria-hidden>
      {rings.map((r, i) => (
        <motion.circle
          key={r}
          cx={80} cy={80} r={r}
          stroke="#D4AF37"
          strokeWidth={0.8}
          strokeDasharray={i === 0 ? '4 6' : 'none'}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 0.35 + i * 0.15 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.7, delay: i * 0.15, ease: E }}
        />
      ))}
      {/* Crosshair lines */}
      {[[80, 28, 80, 52], [80, 108, 80, 132], [28, 80, 52, 80], [108, 80, 132, 80]].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#D4AF37"
          strokeWidth={0.8}
          strokeLinecap="round"
          initial={{ opacity: 0, scaleY: 0, scaleX: 0 }}
          animate={active ? { opacity: 0.6, scaleY: 1, scaleX: 1 } : { opacity: 0 }}
          style={{ originX: `${(x1 + x2) / 2}px`, originY: `${(y1 + y2) / 2}px` }}
          transition={{ duration: 0.4, delay: 0.4 + i * 0.06, ease: E }}
        />
      ))}
      <motion.circle
        cx={80} cy={80} r={4}
        fill="#D4AF37"
        initial={{ scale: 0, opacity: 0 }}
        animate={active ? { scale: [0, 1.6, 1], opacity: 1 } : { scale: 0, opacity: 0 }}
        style={{ originX: '80px', originY: '80px' }}
        transition={{ duration: 0.5, delay: 0.7, ease: E }}
      />
    </svg>
  )
}

function EjecucionVisual({ active }: { active: boolean }) {
  // Ascending trajectory: dot launches from bottom-left to top-right
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-full max-w-[160px]" aria-hidden>
      {/* Grid */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t}
          x1={20} y1={20 + t * 120} x2={140} y2={20 + t * 120}
          stroke="rgba(255,255,255,0.05)" strokeWidth={0.8}
        />
      ))}
      {/* Trajectory path */}
      <motion.path
        d="M 20 130 Q 60 100 80 70 T 140 20"
        stroke="#D4AF37"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.1, ease: E, delay: 0.1 }}
      />
      {/* Dot moving along path */}
      <motion.circle
        cx={20} cy={130} r={5}
        fill="#D4AF37"
        initial={{ opacity: 0 }}
        animate={active ? {
          cx: [20, 50, 80, 110, 140],
          cy: [130, 100, 70, 40, 20],
          opacity: [0, 1, 1, 1, 0],
        } : { opacity: 0 }}
        transition={active ? {
          duration: 1.4,
          delay: 0.6,
          ease: E,
          repeat: Infinity,
          repeatDelay: 0.8,
          times: [0, 0.25, 0.5, 0.75, 1],
        } : { duration: 0.2 }}
      />
      {/* Ground mark */}
      <motion.line
        x1={14} y1={138} x2={28} y2={138}
        stroke="#D4AF37" strokeWidth={1.5} strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </svg>
  )
}

function EscalamientoVisual({ active }: { active: boolean }) {
  // Ascending bars (growth)
  const heights = [20, 40, 65, 95]
  return (
    <svg viewBox="0 0 160 140" fill="none" className="w-full max-w-[160px]" aria-hidden>
      <line x1={20} y1={118} x2={148} y2={118} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
      {heights.map((h, i) => (
        <motion.rect
          key={i}
          x={26 + i * 30}
          y={118 - h}
          width={18}
          height={h}
          rx={3}
          fill="#D4AF37"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={active ? { scaleY: 1, opacity: 0.35 + i * 0.18 } : { scaleY: 0, opacity: 0 }}
          style={{ originX: '50%', originY: '118px' }}
          transition={{ duration: 0.65, delay: i * 0.1, ease: E }}
        />
      ))}
      {/* Trend arrow */}
      <motion.polyline
        points="35,108 65,90 95,63 125,33"
        stroke="#D4AF37" strokeWidth={1.5} strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: E }}
      />
      <motion.polygon
        points="125,27 131,39 119,39"
        fill="#D4AF37"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 0.9 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
    </svg>
  )
}

// ── Step data ────────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description: 'Analizamos tu negocio, mercado y competencia. Identificamos las palancas reales de crecimiento sin suposiciones ni plantillas genéricas.',
    duration: 'Semana 1',
    tag: 'Análisis',
    Visual: DiagnosticoVisual,
  },
  {
    number: '02',
    title: 'Estrategia',
    description: 'Diseñamos un plan a medida con métricas definidas, plazos reales y canales seleccionados exclusivamente para tu tipo de negocio.',
    duration: 'Semana 2',
    tag: 'Planificación',
    Visual: EstrategiaVisual,
  },
  {
    number: '03',
    title: 'Ejecución',
    description: 'Implementamos con precisión. Campañas, automatizaciones, contenido y sistemas de seguimiento sin demoras ni excusas.',
    duration: 'Semana 3',
    tag: 'Lanzamiento',
    Visual: EjecucionVisual,
  },
  {
    number: '04',
    title: 'Escalamiento',
    description: 'Analizamos resultados en tiempo real. Escalamos lo que funciona. Corregimos lo que no genera retorno. Crecimiento continuo.',
    duration: 'Continuo',
    tag: 'Optimización',
    Visual: EscalamientoVisual,
  },
]

// ── Single full-width panel ──────────────────────────────────────────────────

function StepPanel({
  step,
  index,
  activeIndex,
}: {
  step: (typeof steps)[0]
  index: number
  activeIndex: number
}) {
  const active = index === activeIndex
  const { Visual } = step

  return (
    <div
      className="relative flex-shrink-0 flex items-center"
      style={{ width: '100vw', minHeight: '100vh', padding: 'clamp(2rem, 5vw, 6rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: ghost number + metadata */}
        <div className="relative">
          <span
            aria-hidden
            className="absolute -left-2 top-0 font-display font-bold text-white select-none pointer-events-none leading-none"
            style={{ fontSize: 'clamp(5rem, 11vw, 8.5rem)', letterSpacing: '-0.05em', opacity: 0.055 }}
          >
            {step.number}
          </span>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-9">
              <span className="label-sm" style={{ color: 'rgba(212,175,55,0.45)', fontSize: '0.62rem' }}>
                {step.number}
              </span>
              <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <span
                className="font-body text-gold"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(212,175,55,0.2)',
                  padding: '3px 8px',
                }}
              >
                {step.tag}
              </span>
            </div>

            <motion.h3
              initial={{ opacity: 0.4 }}
              animate={active ? { opacity: 1 } : { opacity: 0.4 }}
              transition={{ duration: 0.5, ease: E }}
              className="font-display font-bold text-white leading-[1.05]"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}
            >
              {step.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0.25 }}
              animate={active ? { opacity: 1 } : { opacity: 0.25 }}
              transition={{ duration: 0.5, delay: 0.08, ease: E }}
              className="font-body text-white/45 leading-[1.8]"
              style={{ fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)', maxWidth: '44ch', marginBottom: '2.5rem' }}
            >
              {step.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0.2 }}
              animate={active ? { opacity: 1 } : { opacity: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15, ease: E }}
              className="flex items-center gap-3"
            >
              <div className="w-6 h-px bg-gold/40" />
              <span className="font-body text-white/30 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.16em' }}>
                {step.duration}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right: abstract visual */}
        <motion.div
          initial={{ opacity: 0.15, scale: 0.92 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.15, scale: 0.92 }}
          transition={{ duration: 0.6, ease: E }}
          className="flex items-center justify-center"
        >
          <Visual active={active} />
        </motion.div>
      </div>

      {/* Step progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 20 : 4,
              height: 4,
              borderRadius: 2,
              background: i === index ? '#D4AF37' : 'rgba(255,255,255,0.18)',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function Process() {
  const outerRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref: headerRef, isInView: headerInView } = useReveal()

  useEffect(() => {
    if (!outerRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const totalScroll = (steps.length - 1) * window.innerWidth

      const tl = gsap.to(trackRef.current, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: () => `+=${totalScroll + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (steps.length - 1))
            setActiveIndex(Math.min(idx, steps.length - 1))
          },
        },
      })

      return () => tl.scrollTrigger?.kill()
    }, outerRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="proceso"
      data-formation="flow"
      ref={outerRef}
      className="grain-overlay overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Floating section label */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-3"
      >
        <div className="w-5 h-px" style={{ background: 'rgba(212,175,55,0.4)' }} />
        <span className="label-sm" style={{ color: 'rgba(212,175,55,0.5)' }}>
          Nuestro proceso
        </span>
        <div className="w-5 h-px" style={{ background: 'rgba(212,175,55,0.4)' }} />
      </motion.div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ width: `${steps.length * 100}vw` }}
      >
        {steps.map((step, i) => (
          <StepPanel key={step.number} step={step} index={i} activeIndex={activeIndex} />
        ))}
      </div>
    </section>
  )
}

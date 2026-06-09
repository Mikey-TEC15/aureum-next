'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'

const E = [0.23, 1, 0.32, 1] as const

// ── Per-service abstract visuals ────────────────────────────────────────────

function LeadsVisual({ active }: { active: boolean }) {
  const bars = [1, 0.65, 0.38]
  return (
    <svg viewBox="0 0 120 130" fill="none" className="w-full max-w-[140px]" aria-hidden>
      {bars.map((scale, i) => {
        const w = 90 * scale
        const x = (120 - w) / 2
        const y = i * 40 + 4
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={w}
            height={24}
            rx={4}
            fill="#D4AF37"
            initial={{ opacity: 0.1, scaleX: 0 }}
            animate={active ? { opacity: 0.15 + i * 0.05, scaleX: 1 } : { opacity: 0.06, scaleX: 0.4 }}
            style={{ originX: '50%', originY: '50%' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: E }}
          />
        )
      })}
      {/* Falling dot */}
      <motion.circle
        cx={60}
        r={5}
        fill="#D4AF37"
        initial={{ cy: 16 }}
        animate={active ? { cy: [16, 56, 96], opacity: [1, 1, 0] } : { cy: 16, opacity: 0 }}
        transition={
          active
            ? { duration: 1.8, repeat: Infinity, repeatDelay: 0.4, ease: 'easeIn', times: [0, 0.5, 1] }
            : { duration: 0.3 }
        }
      />
      {/* Stage labels */}
      {['Tráfico', 'Prospecto', 'Cliente'].map((label, i) => (
        <motion.text
          key={label}
          x={60}
          y={i * 40 + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={8}
          fontFamily="var(--font-body, sans-serif)"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
        >
          {label}
        </motion.text>
      ))}
    </svg>
  )
}

function MetaVisual({ active }: { active: boolean }) {
  const bars = [0.45, 0.7, 0.55, 0.9, 0.65]
  return (
    <svg viewBox="0 0 120 110" fill="none" className="w-full max-w-[140px]" aria-hidden>
      <line x1="12" y1="95" x2="108" y2="95" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {bars.map((h, i) => {
        const barH = h * 70
        const x = 18 + i * 18
        return (
          <motion.rect
            key={i}
            x={x}
            y={95 - barH}
            width={10}
            height={barH}
            rx={3}
            fill="#D4AF37"
            initial={{ scaleY: 0 }}
            animate={active ? { scaleY: 1, opacity: 0.6 + h * 0.4 } : { scaleY: 0.1, opacity: 0.15 }}
            style={{ originX: '50%', originY: '95px' }}
            transition={{ duration: 0.65, delay: i * 0.07, ease: E }}
          />
        )
      })}
      {/* Trend line */}
      <motion.polyline
        points="23,68 41,47 59,55 77,24 95,38"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: 1, opacity: 0.9 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: E }}
      />
    </svg>
  )
}

function WebVisual({ active }: { active: boolean }) {
  const radius = 36
  const circ = 2 * Math.PI * radius
  const score = 99
  const filled = (score / 100) * circ * 0.75

  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full max-w-[140px]" aria-hidden>
      {/* Track arc */}
      <circle
        cx={60} cy={60} r={radius}
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={7}
        strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
        strokeDashoffset={circ * 0.125}
        strokeLinecap="round"
        transform="rotate(135 60 60)"
        fill="none"
      />
      {/* Score arc */}
      <motion.circle
        cx={60} cy={60} r={radius}
        stroke="#D4AF37"
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
        strokeDashoffset={circ * 0.125}
        transform="rotate(135 60 60)"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={active ? { pathLength: score / 100, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        style={{ pathLength: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: E }}
      />
      {/* Score number */}
      <motion.text
        x={60} y={57}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={26}
        fontWeight={700}
        fontFamily="var(--font-display, serif)"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        {score}
      </motion.text>
      <motion.text
        x={60} y={73}
        textAnchor="middle"
        fill="rgba(255,255,255,0.45)"
        fontSize={7}
        fontFamily="var(--font-body, sans-serif)"
        letterSpacing="1.5"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        PERFORMANCE
      </motion.text>
    </svg>
  )
}

function AIVisual({ active }: { active: boolean }) {
  const nodes = [
    { cx: 60, cy: 20 },
    { cx: 100, cy: 45 },
    { cx: 100, cy: 80 },
    { cx: 60, cy: 105 },
    { cx: 20, cy: 80 },
    { cx: 20, cy: 45 },
  ]
  const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,3],[1,4],[2,5]]

  return (
    <svg viewBox="0 0 120 125" fill="none" className="w-full max-w-[140px]" aria-hidden>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="#D4AF37"
          strokeWidth={0.8}
          initial={{ opacity: 0 }}
          animate={active ? { opacity: [0, 0.35, 0.12] } : { opacity: 0 }}
          transition={
            active
              ? { duration: 2.4, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.cx} cy={n.cy} r={5}
          fill="#D4AF37"
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] } : { scale: 0, opacity: 0 }}
          style={{ originX: `${n.cx}px`, originY: `${n.cy}px` }}
          transition={
            active
              ? { duration: 2, delay: i * 0.18, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.2 }
          }
        />
      ))}
    </svg>
  )
}

// ── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    id: 'leads',
    num: '01',
    titleLine1: 'Generación',
    titleLine2: 'de Leads',
    description: 'Sistemas que atraen prospectos con intención real de compra. Embudos optimizados, seguimiento automático y reportes en tiempo real.',
    stat: '+248%',
    statLabel: 'más leads / mes',
    Visual: LeadsVisual,
  },
  {
    id: 'meta',
    num: '02',
    titleLine1: 'Meta',
    titleLine2: 'Ads',
    description: 'Campañas en Facebook e Instagram con segmentación precisa. A/B testing constante, retargeting dinámico y ROAS visible desde la primera semana.',
    stat: '5.8×',
    statLabel: 'ROAS promedio',
    Visual: MetaVisual,
  },
  {
    id: 'web',
    num: '03',
    titleLine1: 'Desarrollo',
    titleLine2: 'Web',
    description: 'Sitios de alta conversión con UX/UI estratégico. Core Web Vitals optimizados, SEO técnico y estructura pensada para vender.',
    stat: '+180%',
    statLabel: 'conversión web',
    Visual: WebVisual,
  },
  {
    id: 'ai',
    num: '04',
    titleLine1: 'Automatización',
    titleLine2: 'con IA',
    description: 'Flujos inteligentes que trabajan 24/7. Chatbots, CRM automatizado, email personalizado y nurturing sin intervención manual.',
    stat: '24/7',
    statLabel: 'sistemas activos',
    Visual: AIVisual,
  },
]

// ── Panel ────────────────────────────────────────────────────────────────────

function ServicePanel({
  service,
  active,
  onEnter,
  index,
}: {
  service: (typeof services)[0]
  active: boolean
  onEnter: () => void
  index: number
}) {
  const { Visual } = service

  return (
    <div
      className="relative overflow-hidden cursor-pointer select-none"
      style={{
        flex: active ? '5 0 0%' : '1 0 0%',
        transition: `flex 0.65s cubic-bezier(0.23, 1, 0.32, 1)`,
        borderRight: index < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        minHeight: '520px',
      }}
      onMouseEnter={onEnter}
    >
      {/* Dark base */}
      <div
        className="absolute inset-0"
        style={{
          background: active
            ? 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.04) 0%, #0D0D0D 70%)'
            : '#0D0D0D',
          transition: 'background 0.65s ease',
        }}
      />

      {/* Collapsed label (number + rotated title) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-5 pointer-events-none z-10"
        style={{
          opacity: active ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span
          className="font-body text-gold/60"
          style={{ fontSize: '0.58rem', letterSpacing: '0.2em' }}
        >
          {service.num}
        </span>
        <span
          className="font-display font-semibold text-white/50 whitespace-nowrap"
          style={{
            fontSize: '0.88rem',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            letterSpacing: '0.08em',
          }}
        >
          {service.titleLine1} {service.titleLine2}
        </span>
      </div>

      {/* Expanded content */}
      <div
        className="absolute inset-0 flex flex-col justify-between p-10 z-10"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'translateX(0)' : 'translateX(-12px)',
          transition: active
            ? 'opacity 0.45s ease 0.15s, transform 0.45s cubic-bezier(0.23,1,0.32,1) 0.15s'
            : 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: active ? 'auto' : 'none',
          minWidth: 0,
        }}
      >
        {/* Top: number + visual */}
        <div>
          <div className="flex items-start justify-between mb-8">
            <span
              className="font-body text-gold/40"
              style={{ fontSize: '0.6rem', letterSpacing: '0.18em' }}
            >
              {service.num}
            </span>
          </div>

          {/* Service-specific visual */}
          <div className="mb-8 flex justify-center" style={{ height: 130 }}>
            <Visual active={active} />
          </div>
        </div>

        {/* Bottom: title + desc + stat */}
        <div>
          <h3
            className="font-display font-bold text-white leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(1.35rem, 2vw, 1.75rem)', letterSpacing: '-0.02em' }}
          >
            {service.titleLine1}<br />{service.titleLine2}
          </h3>

          <p
            className="font-body text-white/40 leading-[1.75] mb-8"
            style={{ fontSize: '0.82rem', maxWidth: '36ch' }}
          >
            {service.description}
          </p>

          <div className="flex items-baseline gap-2 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <span
              className="font-display font-bold text-gold"
              style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2.1rem)', letterSpacing: '-0.03em' }}
            >
              {service.stat}
            </span>
            <span
              className="font-body text-white/30 uppercase"
              style={{ fontSize: '0.58rem', letterSpacing: '0.14em' }}
            >
              {service.statLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Mobile accordion ─────────────────────────────────────────────────────────

function MobilePanel({ service, open, onToggle }: { service: (typeof services)[0]; open: boolean; onToggle: () => void }) {
  const { Visual } = service
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5"
      >
        <div className="flex items-center gap-4">
          <span className="font-body text-gold/50" style={{ fontSize: '0.6rem', letterSpacing: '0.18em' }}>
            {service.num}
          </span>
          <span className="font-display font-bold text-white" style={{ fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
            {service.titleLine1} {service.titleLine2}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: E }}
          className="w-5 h-5 flex items-center justify-center text-gold/60"
          style={{ fontSize: '1.2rem', lineHeight: 1 }}
        >
          +
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: E }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-8">
              <div className="flex justify-center mb-6">
                <Visual active={open} />
              </div>
              <p className="font-body text-white/40 leading-[1.75] mb-6" style={{ fontSize: '0.85rem' }}>
                {service.description}
              </p>
              <div className="flex items-baseline gap-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <span className="font-display font-bold text-gold" style={{ fontSize: '1.8rem', letterSpacing: '-0.03em' }}>
                  {service.stat}
                </span>
                <span className="font-body text-white/30 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.14em' }}>
                  {service.statLabel}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function Services() {
  const [activeId, setActiveId] = useState(services[0].id)
  const [mobileOpen, setMobileOpen] = useState<string | null>(services[0].id)
  const { ref: headerRef, isInView: headerInView } = useReveal()

  return (
    <section id="servicios" data-formation="network" className="py-[clamp(6rem,10vw,10rem)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: E }}
          className="mb-[clamp(3rem,5vw,5rem)]"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-gold/50" />
            <span className="font-body text-gold/60 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
              Servicios
            </span>
          </div>
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-tightest"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
          >
            Lo que hacemos,{' '}
            <em className="not-italic text-gold">y cómo lo hacemos.</em>
          </h2>
        </motion.div>
      </div>

      {/* Desktop: expanding panels */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={headerInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:flex border-t border-b"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        {services.map((s, i) => (
          <ServicePanel
            key={s.id}
            service={s}
            active={activeId === s.id}
            onEnter={() => setActiveId(s.id)}
            index={i}
          />
        ))}
      </motion.div>

      {/* Mobile: accordion */}
      <div
        className="lg:hidden border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        {services.map((s) => (
          <MobilePanel
            key={s.id}
            service={s}
            open={mobileOpen === s.id}
            onToggle={() => setMobileOpen(mobileOpen === s.id ? null : s.id)}
          />
        ))}
      </div>
    </section>
  )
}

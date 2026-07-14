'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { gsap } from 'gsap'
import { useLenis } from '@/components/LenisProvider'
import { WA } from '@/lib/whatsapp'

const PricingParticles = dynamic(() => import('@/components/pricing/PricingParticles'), {
  ssr: false,
  loading: () => null,
})

const E = [0.23, 1, 0.32, 1] as const

interface Plan {
  id: string
  index: string
  name: string
  tagline: string
  price: string
  period: string
  features: string[]
  wa: string
  featured?: boolean
}

const PLANS: Plan[] = [
  {
    id: 'launch',
    index: 'I',
    name: 'Aureum Launch',
    tagline: 'Get Your First Consistent Leads',
    price: '$297',
    period: 'USD / mes',
    features: [
      'Gestión de Meta Ads',
      'Optimización de campañas',
      'Estrategia de generación de leads',
      'Reporte mensual',
      'Ruteo de leads por WhatsApp',
    ],
    wa: WA.pricingLaunch,
  },
  {
    id: 'growth',
    index: 'II',
    name: 'Aureum Growth',
    tagline: 'Build a Predictable Customer Acquisition System',
    price: '$697',
    period: 'USD / mes',
    featured: true,
    features: [
      'Todo lo de Launch',
      'Landing page de alta conversión',
      'Setup de píxel y tracking',
      'Producción creativa profesional',
      'Distribución de leads por WhatsApp',
      'Optimización semanal',
    ],
    wa: WA.pricingGrowth,
  },
  {
    id: 'scale',
    index: 'III',
    name: 'Aureum Scale',
    tagline: 'Scale With Performance Marketing',
    price: '$1,500',
    period: 'USD / mes',
    features: [
      'Todo lo de Growth',
      'Estrategia de crecimiento multi-canal',
      'Integración con CRM',
      'Optimización del pipeline de ventas',
      'Reportería avanzada',
      'Consultoría estratégica',
    ],
    wa: WA.pricingScale,
  },
]

// ── Per-card floating gold particles (intensify on hover) ────────────────────
function CardParticles({ active }: { active: boolean }) {
  const dots = [12, 28, 45, 63, 78, 90]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((left, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${left}%`,
            bottom: -6,
            width: 3,
            height: 3,
            background: 'radial-gradient(circle, rgba(232,204,106,0.9), rgba(212,175,55,0))',
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-10, -130 - i * 12],
            opacity: active ? [0, 0.8, 0] : [0, 0.25, 0],
          }}
          transition={{
            duration: 3.4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.45,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

// ── Feature list reveal ──────────────────────────────────────────────────────
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
}
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: E } },
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan
  selected: boolean
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const active = hovered || selected

  return (
    <div
      className="po-pedestal flex-1"
      style={{ alignSelf: 'flex-start', minWidth: 0, opacity: 0 }}
    >
      <motion.button
        type="button"
        onClick={onSelect}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.45, ease: E }}
        aria-pressed={selected}
        aria-label={`${plan.name} — ${plan.tagline} — ${plan.price}${plan.period}`}
        className="relative w-full text-left overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
        style={{
          borderRadius: 16,
          padding: plan.featured ? '2.75rem 1.9rem 2.1rem' : '2.2rem 1.9rem 2.1rem',
          background: active
            ? 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.028) 0%, rgba(255,255,255,0.008) 100%)',
          border: selected
            ? '1px solid rgba(212,175,55,0.5)'
            : active
              ? '1px solid rgba(212,175,55,0.28)'
              : '1px solid rgba(255,255,255,0.08)',
          boxShadow: active
            ? '0 30px 80px -30px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
            : '0 20px 50px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)',
          transition: 'background 0.5s ease, border 0.4s ease, box-shadow 0.5s ease, padding 0.5s ease',
        }}
      >
        {/* Featured top accent + floor glow */}
        {plan.featured && (
          <>
            <span
              aria-hidden
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: '60%',
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)',
              }}
            />
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 pointer-events-none"
              style={{
                height: '55%',
                background: 'radial-gradient(ellipse 70% 100% at 50% 120%, rgba(212,175,55,0.12), transparent 70%)',
              }}
            />
          </>
        )}

        <CardParticles active={active} />

        <div className="relative z-10">
          {/* Index + featured label */}
          <div className="flex items-center justify-between mb-7">
            <span
              className="font-body text-gold/55"
              style={{ fontSize: '0.62rem', letterSpacing: '0.28em' }}
            >
              {plan.index}
            </span>
            {plan.featured && (
              <span
                className="font-body text-gold/70 uppercase"
                style={{ fontSize: '0.54rem', letterSpacing: '0.22em' }}
              >
                Recomendado
              </span>
            )}
          </div>

          {/* Name */}
          <h3
            className="font-display font-bold text-white leading-[1.05] mb-3"
            style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', letterSpacing: '-0.02em' }}
          >
            {plan.name}
          </h3>

          {/* Tagline */}
          <p
            className="font-body text-white/45 leading-[1.5] mb-8"
            style={{ fontSize: '0.84rem', maxWidth: '26ch' }}
          >
            {plan.tagline}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-1.5">
            <span
              className="font-display font-bold text-white nums"
              style={{ fontSize: 'clamp(2.1rem, 3.4vw, 2.9rem)', letterSpacing: '-0.03em' }}
            >
              {plan.price}
            </span>
            <span className="font-body text-white/35" style={{ fontSize: '0.85rem' }}>
              {plan.period}
            </span>
          </div>

          {/* Details reveal on select */}
          <AnimatePresence initial={false}>
            {selected && (
              <motion.div
                key="details"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: E }}
                style={{ overflow: 'hidden' }}
              >
                <motion.ul
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 pt-7 space-y-3"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.09)' }}
                >
                  {plan.features.map((f) => (
                    <motion.li
                      key={f}
                      variants={itemVariants}
                      className="flex items-start gap-2.5 font-body text-white/65"
                      style={{ fontSize: '0.82rem' }}
                    >
                      <Check size={14} strokeWidth={2.5} className="text-gold mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* CTA */}
                <motion.a
                  href={plan.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.45, ease: E }}
                  className="group mt-8 flex w-full items-center justify-center gap-2 font-body font-semibold label-sm text-ink"
                  style={{
                    background: 'linear-gradient(135deg, #E8CC6A 0%, #C9A035 100%)',
                    borderRadius: 10,
                    padding: '0.95rem 1.25rem',
                    boxShadow: '0 10px 30px -10px rgba(212,175,55,0.6)',
                  }}
                >
                  Book Strategy Call
                  <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint when collapsed */}
          {!selected && (
            <span
              className="mt-7 inline-flex items-center gap-1.5 font-body text-gold/55"
              style={{ fontSize: '0.72rem' }}
            >
              Ver detalles
              <ArrowRight size={12} strokeWidth={2} />
            </span>
          )}
        </div>
      </motion.button>
    </div>
  )
}

export default function PricingOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const lenis = useLenis()
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [selected, setSelected] = useState<string | null>(null)

  // Scroll lock + Lenis pause + Escape + focus management.
  useEffect(() => {
    if (!open) return

    const prevActive = document.activeElement as HTMLElement | null
    lenis?.stop()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)

    // Focus the close button once the overlay is mounted.
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60)

    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(focusTimer)
      document.body.style.overflow = prevOverflow
      lenis?.start()
      prevActive?.focus?.()
    }
  }, [open, lenis, onClose])

  // GSAP cinematic entrance for the heading + pedestals.
  useEffect(() => {
    if (!open || !rootRef.current) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set('.po-eyebrow, .po-title-line, .po-sub, .po-pedestal', { autoAlpha: 1, y: 0, clipPath: 'none' })
        return
      }
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.po-eyebrow', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.15)
        .fromTo(
          '.po-title-line',
          { autoAlpha: 0, yPercent: 120 },
          { autoAlpha: 1, yPercent: 0, duration: 0.85, stagger: 0.1 },
          0.2,
        )
        .fromTo('.po-sub', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.45)
        .fromTo(
          '.po-pedestal',
          { autoAlpha: 0, y: 44 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12 },
          0.5,
        )
    }, rootRef)

    return () => ctx.revert()
  }, [open])

  // Reset selection whenever the overlay closes.
  useEffect(() => {
    if (!open) setSelected(null)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={rootRef}
          role="dialog"
          aria-modal="true"
          aria-label="Planes y precios de Aureum Studio"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(22px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.55, ease: E }}
          className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain"
          style={{ background: 'rgba(6,6,6,0.82)', WebkitOverflowScrolling: 'touch' }}
          onClick={onClose}
          data-lenis-prevent
        >
          {/* Particle field */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <PricingParticles />
          </div>
          {/* Vignette for legibility */}
          <div
            aria-hidden
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 35%, transparent 30%, rgba(4,4,4,0.7) 100%)' }}
          />

          {/* Top bar */}
          <div
            className="relative z-20 flex items-center justify-between px-6 md:px-10 py-5"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-display font-bold text-[0.82rem] tracking-[0.08em] text-white">
              AUREUM <span className="text-gold">STUDIO</span>
            </span>
            <button
              ref={closeRef}
              onClick={onClose}
              className="flex items-center gap-2 font-body text-white/55 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60"
              style={{ fontSize: '0.72rem', borderRadius: 8, padding: '0.4rem 0.6rem' }}
              aria-label="Cerrar precios"
            >
              <span className="hidden sm:inline label-sm">Cerrar</span>
              <X size={20} strokeWidth={1.6} />
            </button>
          </div>

          {/* Content */}
          <div
            className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 pb-24 pt-6 md:pt-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-[clamp(2.5rem,5vw,4.5rem)]">
              <div className="po-eyebrow flex items-center justify-center gap-3 mb-6" style={{ opacity: 0 }}>
                <span className="w-5 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
                <span className="label-sm" style={{ color: 'rgba(212,175,55,0.7)' }}>
                  Inversión
                </span>
                <span className="w-5 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
              </div>

              <h2
                className="font-display font-bold text-white tracking-tightest"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 1.05 }}
              >
                <span className="block overflow-hidden">
                  <span className="po-title-line block" style={{ opacity: 0 }}>
                    Elige cómo
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="po-title-line block text-gold" style={{ opacity: 0 }}>
                    quieres crecer.
                  </span>
                </span>
              </h2>

              <p
                className="po-sub font-body text-white/45 mt-6 mx-auto"
                style={{ fontSize: '0.95rem', maxWidth: '46ch', opacity: 0 }}
              >
                Tres niveles. Un mismo estándar de ejecución. Toca un plan para ver
                qué incluye y agendar tu llamada estratégica.
              </p>
            </div>

            {/* Plans */}
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 lg:items-start">
              {PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  selected={selected === plan.id}
                  onSelect={() => setSelected((s) => (s === plan.id ? null : plan.id))}
                />
              ))}
            </div>

            {/* Footer note */}
            <p
              className="text-center font-body text-white/30 mt-12"
              style={{ fontSize: '0.72rem', letterSpacing: '0.04em' }}
            >
              Sin permanencia · Cancela cuando quieras ·{' '}
              <span className="text-white/45">Esc para cerrar</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

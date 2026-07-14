'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { WA } from '@/lib/whatsapp'

const E = [0.23, 1, 0.32, 1] as const

const testimonials = [
  {
    quote: 'En 3 meses pasamos de depender del boca a boca a tener un flujo constante de pacientes nuevos. Aureum no promete, entrega.',
    author: 'Dr. Sergio Ramírez',
    role: 'Director',
    company: 'Clínica Dental Norte',
    sector: 'Salud',
    initials: 'SR',
    accent: '#9B2C2C',
    result: '+175%',
    resultLabel: 'citas / mes',
  },
  {
    quote: 'Lo que más me sorprendió fue la velocidad. Semana 1 ya teníamos campañas corriendo y generando datos reales. No hay tiempo perdido.',
    author: 'Ana Morales',
    role: 'CEO',
    company: 'Boutique Amara',
    sector: 'Retail',
    initials: 'AM',
    accent: '#276749',
    result: '$45K',
    resultLabel: 'en ventas / mes',
  },
  {
    quote: 'Probé otras agencias antes. Ninguna hablaba de métricas reales. Aureum me explicó el ROAS desde el día uno y lo cumplió.',
    author: 'Victor Torres',
    role: 'Fundador',
    company: 'Torres Inmobiliaria',
    sector: 'Real Estate',
    initials: 'VT',
    accent: '#1A4C8C',
    result: '1.8×',
    resultLabel: 'tasa de cierre',
  },
  {
    quote: 'La automatización que implementaron cambió cómo trabajamos internamente. El CRM ahora hace el trabajo que antes hacían tres personas.',
    author: 'Rafael Fuentes',
    role: 'Director Comercial',
    company: 'LogiMex',
    sector: 'Logística',
    initials: 'RF',
    accent: '#553C9A',
    result: '−40%',
    resultLabel: 'ciclo de venta',
  },
]

const DURATION = 6200

export default function Testimonials() {
  const [active, setActive]   = useState(0)
  const [paused, setPaused]   = useState(false)
  const [entering, setEntering] = useState(false)
  const ref    = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  const advance = useCallback((next: number) => {
    setEntering(true)
    setTimeout(() => {
      setActive(next)
      setEntering(false)
    }, 60)
  }, [])

  useEffect(() => {
    if (!inView || paused) return
    const id = setInterval(() => {
      advance((active + 1) % testimonials.length)
    }, DURATION)
    return () => clearInterval(id)
  }, [inView, paused, active, advance])

  const t = testimonials[active]

  return (
    <section
      id="testimonios"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#FAFAF8' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Watermark counter — shifts per testimonial */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          aria-hidden
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: E }}
          className="absolute right-[-2vw] bottom-0 pointer-events-none select-none leading-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(18rem, 36vw, 30rem)',
            color: 'rgba(17,17,17,0.028)',
            letterSpacing: '-0.06em',
          }}
        >
          {String(active + 1).padStart(2, '0')}
        </motion.div>
      </AnimatePresence>

      {/* Animated accent bar — left edge, color shifts per person */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bar-${active}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.55, ease: E }}
          className="absolute left-0 top-0 bottom-0 w-1"
          style={{
            background: `linear-gradient(to bottom, ${t.accent} 0%, rgba(212,175,55,0.35) 60%, transparent 100%)`,
            transformOrigin: 'top',
          }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-[clamp(5rem,9vw,9rem)] relative z-10">

        {/* Section eyebrow */}
        <div className="flex items-center gap-3 mb-[clamp(3.5rem,6vw,6rem)]">
          <div className="w-6 h-px" style={{ background: 'rgba(17,17,17,0.18)' }} />
          <span className="font-body text-ink/35 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.22em' }}>
            Testimonios
          </span>
        </div>

        {/* Main two-column editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 lg:gap-20 items-start">

          {/* ── LEFT: billboard quote ───────────────────────────────────────── */}
          <div>
            {/* Opening guillemet */}
            <div
              aria-hidden
              className="font-display leading-none select-none"
              style={{
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                lineHeight: 0.8,
                color: t.accent,
                opacity: 0.22,
                letterSpacing: '-0.04em',
                marginBottom: '-0.25em',
              }}
            >
              &#8220;
            </div>

            {/* The quote — enormous, italic, Playfair */}
            <div
              style={{
                minHeight: 'clamp(9rem, 16vw, 16rem)',
                overflow: 'hidden',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  initial={{ y: 48, opacity: 0, filter: 'blur(6px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -28, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.62, ease: E }}
                >
                  <p
                    className="font-display font-semibold text-ink"
                    style={{
                      fontSize: 'clamp(1.45rem, 2.7vw, 2.3rem)',
                      lineHeight: 1.35,
                      letterSpacing: '-0.02em',
                      fontStyle: 'italic',
                      maxWidth: '52ch',
                    }}
                  >
                    {t.quote}
                  </p>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author + result — separated by a thin rule */}
            <div
              className="mt-10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
              style={{ borderTop: '1px solid rgba(17,17,17,0.07)' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${active}`}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.38, ease: E }}
                >
                  {/* Avatar badge */}
                  <div
                    className="w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center font-body text-[0.62rem] font-bold text-white"
                    style={{ background: t.accent, letterSpacing: '0.04em' }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-ink leading-tight" style={{ fontSize: '0.9rem' }}>
                      {t.author}
                    </p>
                    <p className="font-body text-ink/40 leading-tight mt-0.5" style={{ fontSize: '0.72rem' }}>
                      {t.role} &middot; {t.company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Result chip */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`result-${active}`}
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: E }}
                  className="flex items-baseline gap-2 flex-shrink-0 px-5 py-3"
                  style={{
                    background: `${t.accent}10`,
                    border: `1px solid ${t.accent}28`,
                    borderRadius: 8,
                  }}
                >
                  <span
                    className="font-display font-bold leading-none"
                    style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', letterSpacing: '-0.03em', color: t.accent }}
                  >
                    {t.result}
                  </span>
                  <span
                    className="font-body text-ink/35 uppercase"
                    style={{ fontSize: '0.56rem', letterSpacing: '0.12em' }}
                  >
                    {t.resultLabel}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mt-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 10 10" fill="#D4AF37" aria-hidden>
                  <path d="M5 1l1.2 2.5 2.8.4-2 2 .5 2.8L5 7.3 2.5 8.7l.5-2.8-2-2 2.8-.4z" />
                </svg>
              ))}
              <span className="font-body text-ink/30 ml-2" style={{ fontSize: '0.65rem', letterSpacing: '0.04em' }}>
                5.0 / 5.0
              </span>
            </div>
          </div>

          {/* ── RIGHT: testimonial nav ────────────────────────────────────── */}
          <div className="flex flex-col lg:pt-2">
            {/* Header label */}
            <p
              className="font-body text-ink/30 uppercase mb-6"
              style={{ fontSize: '0.56rem', letterSpacing: '0.22em' }}
            >
              {active + 1} / {testimonials.length}
            </p>

            {/* Nav items */}
            <div className="flex flex-col">
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => advance(i)}
                  aria-label={`Testimonio de ${item.author}`}
                  className="group text-left py-5 transition-all duration-400"
                  style={{
                    borderBottom: '1px solid rgba(17,17,17,0.06)',
                    opacity: i === active ? 1 : 0.45,
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <span
                      className="font-body flex-shrink-0"
                      style={{
                        fontSize: '0.58rem',
                        letterSpacing: '0.14em',
                        color: i === active ? item.accent : 'rgba(17,17,17,0.3)',
                        transition: 'color 0.3s ease',
                        marginTop: '0.15em',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="flex-1 min-w-0">
                      {/* Active indicator dot */}
                      <div className="flex items-center gap-2 mb-1">
                        {i === active && (
                          <motion.div
                            layoutId="nav-dot"
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: item.accent }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                        <p
                          className="font-body font-semibold text-ink truncate"
                          style={{
                            fontSize: '0.85rem',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {item.author}
                        </p>
                      </div>
                      <p className="font-body text-ink/38 truncate" style={{ fontSize: '0.7rem' }}>
                        {item.company}
                      </p>

                      {/* Progress bar — only on active item */}
                      {i === active && (
                        <div
                          className="mt-3 overflow-hidden"
                          style={{ height: 1, background: 'rgba(17,17,17,0.08)', borderRadius: 1 }}
                        >
                          <motion.div
                            key={`prog-${active}-${paused}`}
                            style={{ height: '100%', background: item.accent, borderRadius: 1 }}
                            initial={{ width: '0%' }}
                            animate={{ width: paused ? undefined : '100%' }}
                            transition={{ duration: DURATION / 1000, ease: 'linear' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer trust + CTA */}
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(17,17,17,0.06)' }}>
              <p className="font-body text-ink/30 mb-5" style={{ fontSize: '0.68rem', letterSpacing: '0.02em', lineHeight: 1.6 }}>
                +47 empresas confían sus resultados a Aureum.
              </p>
              <a
                href={WA.benefits}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-ink/50 hover:text-gold transition-colors duration-200"
                style={{ fontSize: '0.72rem', borderBottom: '1px solid rgba(17,17,17,0.14)', paddingBottom: '2px' }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#D4AF37'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(17,17,17,0.14)'
                }}
              >
                Quiero resultados así →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

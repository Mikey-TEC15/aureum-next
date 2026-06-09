'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const E = [0.23, 1, 0.32, 1] as const

const testimonials = [
  {
    quote: 'En 3 meses pasamos de depender del boca a boca a tener un flujo constante de pacientes nuevos. Aureum no promete, entrega.',
    author: 'Dr. Sergio Ramírez',
    role: 'Director',
    company: 'Clínica Dental Norte',
    initials: 'SR',
    color: '#9B2C2C',
  },
  {
    quote: 'Lo que más me sorprendió fue la velocidad. Semana 1 ya teníamos campañas corriendo y generando datos reales. No hay tiempo perdido.',
    author: 'Ana Morales',
    role: 'CEO',
    company: 'Boutique Amara',
    initials: 'AM',
    color: '#276749',
  },
  {
    quote: 'Probé otras agencias antes. Ninguna hablaba de métricas reales. Aureum me explicó el ROAS desde el día uno y lo cumplió.',
    author: 'Victor Torres',
    role: 'Fundador',
    company: 'Torres Inmobiliaria',
    initials: 'VT',
    color: '#1A4C8C',
  },
  {
    quote: 'La automatización que implementaron cambió cómo trabajamos internamente. El CRM ahora hace el trabajo que antes hacían tres personas.',
    author: 'Rafael Fuentes',
    role: 'Director Comercial',
    company: 'LogiMex',
    initials: 'RF',
    color: '#553C9A',
  },
]

const DURATION = 5800

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  useEffect(() => {
    if (!inView || paused) return
    const id = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length)
    }, DURATION)
    return () => clearInterval(id)
  }, [inView, paused])

  const t = testimonials[active]

  return (
    <section
      id="testimonios"
      ref={ref}
      className="bg-white py-[clamp(6rem,10vw,10rem)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-[clamp(3rem,6vw,6rem)]">
          <div className="w-6 h-px bg-ink/20" />
          <span className="font-body text-ink/35 uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.2em' }}>
            Testimonios
          </span>
        </div>

        {/* Main editorial layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start">

          {/* Left: navigation + author column */}
          <div className="flex lg:flex-col gap-4 lg:gap-8 lg:pt-3">
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonio de ${item.author}`}
                className="group flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center font-body text-[0.6rem] font-bold text-white transition-all duration-400"
                  style={{
                    background: item.color,
                    opacity: i === active ? 1 : 0.28,
                    transform: i === active ? 'scale(1.15)' : 'scale(1)',
                    boxShadow: i === active ? `0 0 0 2px rgba(212,175,55,0.45)` : 'none',
                    transition: 'all 0.4s cubic-bezier(0.23,1,0.32,1)',
                  }}
                >
                  {item.initials}
                </div>
                <div
                  className="hidden lg:block transition-all duration-400"
                  style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'translateX(0)' : 'translateX(-6px)' }}
                >
                  <p className="font-body font-semibold text-ink text-[0.8rem]">{item.author}</p>
                  <p className="font-body text-ink/40 text-[0.68rem]">{item.role}, {item.company}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: quote area */}
          <div>
            {/* Large decorative quotation mark */}
            <div
              aria-hidden
              className="font-display text-gold/12 leading-none select-none mb-2"
              style={{ fontSize: 'clamp(5rem, 10vw, 8rem)', lineHeight: 0.8 }}
            >
              &#8220;
            </div>

            {/* The quote — clip-path curtain reveal between items */}
            <div style={{ position: 'relative', minHeight: 'clamp(8rem, 14vw, 14rem)', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
                  animate={{ clipPath: 'inset(0 0 0% 0)', opacity: 1 }}
                  exit={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                  transition={{ duration: 0.65, ease: E }}
                >
                  <p
                    className="font-display font-medium text-ink leading-[1.45]"
                    style={{
                      fontSize: 'clamp(1.2rem, 2.4vw, 2rem)',
                      letterSpacing: '-0.015em',
                      fontStyle: 'italic',
                      maxWidth: '52ch',
                    }}
                  >
                    {t.quote}
                  </p>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author info (mobile) + progress */}
            <div className="mt-8 pt-7" style={{ borderTop: '1px solid rgba(17,17,17,0.07)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`footer-${active}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: E }}
                  className="flex lg:hidden items-center gap-3 mb-5"
                >
                  <p className="font-body font-semibold text-ink text-[0.82rem]">{t.author}</p>
                  <div className="w-px h-3 bg-ink/15" />
                  <p className="font-body text-ink/45 text-[0.72rem]">{t.role}, {t.company}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress bars */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <div
                    key={i}
                    className="h-[2px] rounded-full overflow-hidden relative"
                    style={{ background: 'rgba(17,17,17,0.08)', width: i === active ? 48 : 16, transition: 'width 0.35s cubic-bezier(0.23,1,0.32,1)' }}
                  >
                    {i === active && (
                      <motion.div
                        className="absolute inset-0 bg-gold rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? undefined : 1 }}
                        transition={{ duration: DURATION / 1000, ease: 'linear' }}
                        style={{ transformOrigin: 'left' }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

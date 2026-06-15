'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import LiquidGlassButton from '@/components/ui/LiquidGlassButton'
import TextReveal from '@/components/motion/TextReveal'
import { springs } from '@/lib/motion'
import { WA } from '@/lib/whatsapp'

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!spotlightRef.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    spotlightRef.current.style.background = `radial-gradient(560px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(212,175,55,0.045) 0%, transparent 60%)`
  }

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY      = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="inicio"
      data-formation="sphere"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="grain-overlay relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Cursor spotlight */}
      <div ref={spotlightRef} aria-hidden className="absolute inset-0 pointer-events-none z-[1]" />

      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 48% at 66% 48%, rgba(212,175,55,0.045) 0%, transparent 65%)' }}
      />

      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 58% 50%, black 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 58% 50%, black 10%, transparent 100%)',
        }}
      />

      {/* Bottom fade-out */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0D0D0D 0%, transparent 100%)' }}
      />

      {/* Content — parallax drift on scroll */}
      <motion.div
        className="relative z-50 max-w-7xl mx-auto w-full px-6 md:px-10 pt-28 pb-20"
        style={{ y: contentY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-[calc(100vh-7rem)]">

          <div style={{ maxWidth: '52ch' }}>

            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-9"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springs.smooth, delay: 0 }}
            >
              <motion.span
                className="block bg-gold"
                style={{ height: 1 }}
                initial={{ width: 0 }}
                animate={{ width: 24 }}
                transition={{ ...springs.snappy, delay: 0.1 }}
              />
              <span className="label-sm text-gold" style={{ opacity: 0.7 }}>
                Agencia de Marketing Digital Premium
              </span>
            </motion.div>

            {/* H1 */}
            <h1
              className="font-display font-bold text-white tracking-tightest mb-7"
              style={{ fontSize: 'clamp(2.9rem, 5.5vw, 5.2rem)', lineHeight: 1.04 }}
            >
              <TextReveal text="Transformamos atención" mode="word" immediate delay={0.1} style={{ display: 'block' }} />
              <TextReveal text="en clientes." mode="word" immediate delay={0.28} className="text-gold" style={{ display: 'block' }} />
            </h1>

            {/* Subtitle */}
            <motion.p
              className="font-body leading-[1.78] mb-11"
              style={{ fontSize: 'clamp(0.9rem, 1.35vw, 1.02rem)', color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.smooth, delay: 0.46 }}
            >
              Ayudamos a empresas a crecer mediante publicidad estratégica, automatización e innovación digital.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 items-center mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.smooth, delay: 0.58 }}
            >
              {/* Primary — WhatsApp directo con pre-fill */}
              <MagneticButton>
                <LiquidGlassButton
                  href={WA.hero}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="gold"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Consulta Gratis por WhatsApp
                </LiquidGlassButton>
              </MagneticButton>

              {/* Secondary — ancla a servicios (liquid glass) */}
              <LiquidGlassButton href="#servicios" variant="clear">
                Ver servicios
                <ArrowRight size={12} strokeWidth={2} />
              </LiquidGlassButton>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.p
              className="font-body mb-14"
              style={{ fontSize: '0.72rem', color: 'var(--text-ghost)', letterSpacing: '0.02em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...springs.gentle, delay: 0.68 }}
            >
              Respuesta en menos de 2 horas · Sin compromiso · Primera consulta gratis
            </motion.p>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-4 pt-6"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...springs.gentle, delay: 0.74 }}
            >
              <div className="flex">
                {['#9B2C2C', '#276749', '#1A4C8C', '#553C9A'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                    style={{
                      background: c,
                      marginLeft: i ? -8 : 0,
                      fontSize: '0.48rem',
                      letterSpacing: '0.02em',
                      border: '2px solid #0D0D0D',
                    }}
                  >
                    {['SR', 'AM', 'VT', 'RF'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="9" height="9" viewBox="0 0 10 10" fill="#D4AF37">
                      <path d="M5 1l1.2 2.5 2.8.4-2 2 .5 2.8L5 7.3 2.5 8.7l.5-2.8-2-2 2.8-.4z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body" style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', letterSpacing: '0.02em' }}>
                  +50 empresas confían en Aureum
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.7 }}
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="label-sm" style={{ color: 'var(--text-ghost)', letterSpacing: '0.2em' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  )
}

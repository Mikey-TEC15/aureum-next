'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import TextReveal from '@/components/motion/TextReveal'
import { springs } from '@/lib/motion'

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
              className="flex flex-wrap gap-3 items-center mb-14"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springs.smooth, delay: 0.58 }}
            >
              <MagneticButton>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-gold text-ink font-body font-semibold label-sm px-7 py-3.5 hover:bg-gold-light transition-colors duration-200"
                  style={{ borderRadius: 9 }}
                >
                  Agendar Consulta
                  <ArrowRight size={13} strokeWidth={2.5} />
                </a>
              </MagneticButton>
              <a
                href="https://wa.me/5534347955"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body font-medium label-sm px-7 py-3.5 transition-all duration-200"
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.65)',
                  borderRadius: 9,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <MessageCircle size={13} strokeWidth={1.7} />
                WhatsApp
              </a>
            </motion.div>

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

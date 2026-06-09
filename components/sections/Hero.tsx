'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import HeroBackground from '@/components/three/HeroBackground'

const E = [0.23, 1, 0.32, 1] as const

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!spotlightRef.current || !sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(212,175,55,0.055) 0%, transparent 60%)`
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="inicio"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="grain-overlay relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 50%, #1a1a1a 0%, #0D0D0D 65%)' }}
    >
      <HeroBackground />

      {/* Cursor spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-[background] duration-100 z-[1]"
      />

      {/* Ambient gold radial glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 50% at 65% 48%, rgba(212,175,55,0.05) 0%, transparent 65%)',
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 60% 50%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 60% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #0D0D0D, transparent)' }}
      />

      <div className="relative z-50 max-w-7xl mx-auto w-full px-6 md:px-10 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-[calc(100vh-7rem)]">

          {/* ── Text ── */}
          <motion.div style={{ y: contentY }}>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0, ease: E }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-7 h-px bg-gold" />
              <span className="font-body text-[0.65rem] tracking-[0.22em] uppercase text-gold font-medium">
                Agencia de Marketing Digital Premium
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: E }}
              className="font-display font-bold text-white leading-[1.05] tracking-tightest mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)' }}
            >
              Transformamos atención{' '}
              <em className="not-italic text-gold">en clientes.</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: E }}
              className="font-body text-white/50 leading-[1.8] mb-10 max-w-[44ch]"
              style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}
            >
              Ayudamos a empresas a crecer mediante publicidad estratégica, automatización e innovación digital.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.36, ease: E }}
              className="flex flex-wrap gap-4 items-center mb-14"
            >
              <MagneticButton strength={0.28}>
              <motion.a
                href="#contacto"
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.12, ease: E }}
                className="inline-flex items-center gap-2 bg-gold text-ink font-body font-bold text-[0.82rem] uppercase tracking-[0.04em] px-7 py-4 rounded-[9px] hover:bg-gold-light transition-colors duration-200"
              >
                Agendar Consulta
                <ArrowRight size={14} strokeWidth={2.5} />
              </motion.a>
              </MagneticButton>
              <MagneticButton strength={0.28}>
              <motion.a
                href="https://wa.me/5534347955"
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.12, ease: E }}
                className="inline-flex items-center gap-2 border border-white/12 text-white font-body font-medium text-[0.82rem] px-7 py-4 rounded-[9px] hover:border-white/25 hover:bg-white/5 transition-all duration-200"
              >
                <MessageCircle size={14} strokeWidth={1.8} />
                WhatsApp
              </motion.a>
              </MagneticButton>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.48, ease: E }}
              className="flex items-center gap-4 pt-6 border-t border-white/[0.05]"
            >
              <div className="flex">
                {['#9B2C2C', '#276749', '#1A4C8C', '#553C9A'].map((c, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[0.5rem] font-bold text-white border-2 border-[#0D0D0D]"
                    style={{ background: c, marginLeft: i ? -8 : 0, zIndex: 4 - i }}
                  >
                    {['SR', 'AM', 'VT', 'RF'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-px mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="9" height="9" viewBox="0 0 10 10" fill="#D4AF37">
                      <path d="M5 1l1.2 2.5 2.8.4-2 2 .5 2.8L5 7.3 2.5 8.7l.5-2.8-2-2 2.8-.4z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-white/40 text-[0.68rem] tracking-wide">
                  +50 empresas confían en Aureum
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — empty, background canvas fills it */}
          <div className="hidden lg:block" />

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[0.6rem] tracking-[0.22em] uppercase text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}

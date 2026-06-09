'use client'
import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import TextReveal from '@/components/motion/TextReveal'

const E = [0.23, 1, 0.32, 1] as const

// Animated chat bubble — gives life to the WhatsApp channel
function ChatPreview() {
  const [step, setStep] = useState<'typing' | 'message'>('typing')

  // Cycle: typing for 2s → message for 3s → repeat
  const onTypingComplete = () => {
    setStep('message')
    setTimeout(() => setStep('typing'), 3000)
  }

  return (
    <div className="flex flex-col gap-3 items-end select-none pointer-events-none" aria-hidden>
      {/* Incoming bubble */}
      <div
        className="rounded-xl rounded-tr-sm px-4 py-3 font-body text-white/80 text-[0.78rem]"
        style={{ background: 'rgba(255,255,255,0.07)', maxWidth: 200 }}
      >
        Hola, quiero crecer mi negocio con marketing digital.
      </div>

      {/* Outgoing bubble — typing or message */}
      <div
        className="rounded-xl rounded-bl-sm px-4 py-3 text-[0.78rem]"
        style={{ background: '#1C8540', maxWidth: 220 }}
      >
        <AnimatePresence mode="wait">
          {step === 'typing' ? (
            <motion.div
              key="typing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={onTypingComplete}
              className="flex items-center gap-1 h-5"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-1.5 h-1.5 rounded-full bg-white/70"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.7, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="message"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: E }}
              className="text-white/90 font-body"
              style={{ fontSize: '0.78rem', lineHeight: 1.5 }}
            >
              Perfecto, ¿podemos agendar una llamada esta semana?
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Time stamp */}
      <span className="text-white/20 font-body" style={{ fontSize: '0.6rem' }}>
        Ahora mismo
      </span>
    </div>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: E },
  })

  return (
    <section
      id="contacto"
      data-formation="logo"
      ref={ref}
      className="grain-overlay relative py-[clamp(6rem,10vw,10rem)] px-6 md:px-10 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* Ambient bottom glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '70%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)',
        }}
      />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-[clamp(3rem,6vw,6rem)]">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-7 h-px bg-gold/60" />
            <span className="font-body text-gold/55 uppercase" style={{ fontSize: '0.58rem', letterSpacing: '0.22em' }}>
              Contacto
            </span>
            <div className="w-7 h-px bg-gold/60" />
          </div>
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-tightest mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
          >
            <TextReveal text="¿Listo para crecer" mode="word" style={{ display: 'block' }} />
            <TextReveal text="de verdad?" mode="word" className="text-gold" style={{ display: 'block' }} />
          </h2>
          <p className="font-body text-white/38 text-[0.88rem] leading-[1.8] max-w-[38ch] mx-auto">
            La consulta inicial es gratuita. 45 minutos que podrían cambiar el mes de tu negocio.
          </p>
        </motion.div>

        {/* WhatsApp — dominant primary channel */}
        <motion.a
          {...fadeUp(0.12)}
          href="https://wa.me/5534347955"
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-4 overflow-hidden"
          style={{
            background: 'rgba(22,163,74,0.08)',
            border: '1px solid rgba(22,163,74,0.18)',
            transition: 'background 0.4s ease, border-color 0.4s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(22,163,74,0.13)'
            e.currentTarget.style.borderColor = 'rgba(22,163,74,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(22,163,74,0.08)'
            e.currentTarget.style.borderColor = 'rgba(22,163,74,0.18)'
          }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 p-8 md:p-10">
            {/* Left: info */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                {/* WhatsApp icon (inline SVG to avoid package overhead) */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="#16A34A"/>
                </svg>
                <span className="font-body text-[#16A34A] text-[0.65rem] uppercase tracking-[0.14em]">
                  WhatsApp
                </span>
              </div>
              <p className="font-display font-bold text-white leading-tight mb-2" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', letterSpacing: '-0.02em' }}>
                Escribir ahora
              </p>
              <p className="font-body text-white/35 text-[0.75rem]">
                Respuesta en menos de 2 horas
              </p>
            </div>

            {/* Center: chat preview */}
            <div className="hidden md:block flex-1 max-w-[260px]">
              <ChatPreview />
            </div>

            {/* Right: arrow CTA */}
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300"
              style={{ borderColor: 'rgba(22,163,74,0.4)' }}
            >
              <ArrowUpRight size={18} strokeWidth={1.5} className="text-[#16A34A]" />
            </div>
          </div>
        </motion.a>

        {/* Instagram + Email — secondary channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'instagram',
              label: 'Instagram',
              sub: '@miguel_alvarezra',
              href: 'https://instagram.com/miguel_alvarezra',
              cta: 'Ver perfil',
              iconColor: '#D4367C',
              bg: 'rgba(212,54,124,0.07)',
              border: 'rgba(212,54,124,0.16)',
              bgHover: 'rgba(212,54,124,0.12)',
              borderHover: 'rgba(212,54,124,0.28)',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="#D4367C" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="4" stroke="#D4367C" strokeWidth="1.5"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#D4367C"/>
                </svg>
              ),
            },
            {
              id: 'email',
              label: 'Email',
              sub: 'mike.1503@hotmail.com',
              href: 'mailto:mike.1503@hotmail.com',
              cta: 'Enviar email',
              iconColor: '#D4AF37',
              bg: 'rgba(212,175,55,0.07)',
              border: 'rgba(212,175,55,0.16)',
              bgHover: 'rgba(212,175,55,0.12)',
              borderHover: 'rgba(212,175,55,0.28)',
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <rect x="2" y="4" width="20" height="16" rx="3" stroke="#D4AF37" strokeWidth="1.5"/>
                  <path d="M2 8l10 7 10-7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
            },
          ].map((ch, i) => (
            <motion.a
              key={ch.id}
              {...fadeUp(0.22 + i * 0.08)}
              href={ch.href}
              target={ch.id !== 'email' ? '_blank' : undefined}
              rel={ch.id !== 'email' ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between p-6 transition-all duration-300"
              style={{ background: ch.bg, border: `1px solid ${ch.border}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ch.bgHover
                e.currentTarget.style.borderColor = ch.borderHover
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = ch.bg
                e.currentTarget.style.borderColor = ch.border
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center border"
                  style={{ borderColor: `${ch.iconColor}30` }}
                >
                  {ch.icon}
                </div>
                <div>
                  <p className="font-body font-semibold text-white text-[0.88rem]">{ch.label}</p>
                  <p className="font-body text-white/30 text-[0.7rem]">{ch.sub}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-body text-white/30 text-[0.68rem] hidden sm:block">{ch.cta}</span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className="opacity-30 group-hover:opacity-80 transition-opacity duration-200"
                  style={{ color: ch.iconColor }}
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom: "consult" primary CTA */}
        <motion.div {...fadeUp(0.38)} className="mt-14 text-center">
          <MagneticButton strength={0.22}>
            <motion.a
              href="https://wa.me/5534347955"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.12, ease: E }}
              className="inline-flex items-center gap-2.5 bg-gold text-ink font-body font-bold uppercase px-9 py-4"
              style={{ fontSize: '0.78rem', letterSpacing: '0.06em', borderRadius: 9 }}
            >
              Agendar consulta gratuita
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </motion.a>
          </MagneticButton>
          <p className="font-body text-white/20 text-[0.65rem] mt-4 tracking-wide">
            Sin compromiso. Sin contratos a largo plazo.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import MagneticButton from '@/components/ui/MagneticButton'
import LiquidGlassButton from '@/components/ui/LiquidGlassButton'
import TextReveal from '@/components/motion/TextReveal'
import { CardStack, type CardStackItem } from '@/components/ui/card-stack'
import { WA } from '@/lib/whatsapp'

const E = [0.23, 1, 0.32, 1] as const

// ── Contact channels as card-stack items ────────────────────────────────────
type Channel = CardStackItem & {
  accent: string
  sub: string
  cta: string
  icon: React.ReactNode
}

const channels: Channel[] = [
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    href: WA.contact,
    cta: 'Escribir ahora',
    sub: 'Activo ahora · Respuesta en <2 h',
    accent: '#16A34A',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="#16A34A"/>
      </svg>
    ),
  },
  {
    id: 'instagram',
    title: 'Instagram',
    href: 'https://instagram.com/miguel_alvarezra',
    cta: 'Ver perfil',
    sub: '@miguel_alvarezra',
    accent: '#D4367C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="#D4367C" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="4" stroke="#D4367C" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="#D4367C"/>
      </svg>
    ),
  },
  {
    id: 'email',
    title: 'Email',
    href: 'mailto:mike.1503@hotmail.com',
    cta: 'Enviar email',
    sub: 'mike.1503@hotmail.com',
    accent: '#D4AF37',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="4" width="20" height="16" rx="3" stroke="#D4AF37" strokeWidth="1.5"/>
        <path d="M2 8l10 7 10-7" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

function ChannelCard({ item }: { item: Channel }) {
  return (
    <div className="relative h-full w-full" style={{ background: '#121212' }}>
      {/* accent top bar */}
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: item.accent }} aria-hidden />
      {/* faint accent wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(120% 80% at 50% 0%, ${item.accent}14 0%, transparent 60%)` }}
        aria-hidden
      />
      <div className="relative flex h-full flex-col justify-between p-7">
        <div className="flex items-center justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl border"
            style={{ borderColor: `${item.accent}40`, background: `${item.accent}12` }}
          >
            {item.icon}
          </div>
          <span className="font-body uppercase tracking-[0.14em] text-[0.6rem]" style={{ color: item.accent }}>
            {item.title}
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <p className="font-display font-bold text-white leading-tight" style={{ fontSize: '1.7rem', letterSpacing: '-0.02em' }}>
              {item.cta}
            </p>
            <ArrowUpRight size={20} strokeWidth={1.5} style={{ color: item.accent }} />
          </div>
          <p className="font-body text-white/40 text-[0.8rem]">{item.sub}</p>
        </div>
      </div>
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
      style={{ background: 'linear-gradient(to bottom, transparent 0%, #0D0D0D 35%)' }}
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
            <span className="label-sm" style={{ color: 'rgba(212,175,55,0.55)' }}>
              Contacto
            </span>
            <div className="w-6 h-px" style={{ background: 'rgba(212,175,55,0.5)' }} />
          </div>
          <h2
            className="font-display font-bold text-white leading-[1.08] tracking-tightest mb-5"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}
          >
            <TextReveal text="¿Listo para crecer" mode="word" style={{ display: 'block' }} />
            <TextReveal text="de verdad?" mode="word" className="text-gold" style={{ display: 'block' }} />
          </h2>
          <p className="font-body leading-[1.78] max-w-[38ch] mx-auto" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            La consulta inicial es gratuita. 45 minutos que podrían cambiar el mes de tu negocio.
          </p>
        </motion.div>

        {/* Channels — card stack (experiment: 21st.dev card-stack) */}
        <motion.div {...fadeUp(0.12)}>
          <CardStack<Channel>
            items={channels}
            cardWidth={360}
            cardHeight={240}
            maxVisible={3}
            overlap={0.42}
            spreadDeg={34}
            inactiveScale={0.9}
            renderCard={(item) => <ChannelCard item={item as Channel} />}
          />
        </motion.div>

        {/* Bottom: "consult" primary CTA */}
        <motion.div {...fadeUp(0.38)} className="mt-14 text-center">
          <MagneticButton strength={0.22}>
            <LiquidGlassButton
              href={WA.contact}
              target="_blank"
              rel="noopener noreferrer"
              variant="gold"
              size="xl"
              className="gap-2.5 font-bold uppercase tracking-[0.06em] text-[0.78rem]"
            >
              Agendar consulta gratuita
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </LiquidGlassButton>
          </MagneticButton>
          <p className="font-body text-white/20 text-[0.65rem] mt-4 tracking-wide">
            Sin compromiso. Sin contratos a largo plazo.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

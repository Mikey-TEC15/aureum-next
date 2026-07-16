'use client'
import { MessageCircle, EyeOff, FileX, TrendingDown } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'
import Beat, { type SlideProps } from '@/components/deck/Beat'

const PROBLEMAS = [
  {
    icon: MessageCircle,
    title: 'Depender del boca a boca',
    desc: 'Crecimiento impredecible: un mes excelente, el siguiente muerto.',
  },
  {
    icon: EyeOff,
    title: 'Publicaciones que nadie ve',
    desc: 'El alcance orgánico cayó por debajo del 2% de tus seguidores.',
  },
  {
    icon: FileX,
    title: 'Volantes que no convierten',
    desc: 'Dinero que se va sin que sepas si sirvió de algo.',
  },
  {
    icon: TrendingDown,
    title: 'Sin un sistema predecible',
    desc: 'Vivir el día a día sin saber de dónde sale el próximo cliente.',
  },
]

export default function S2Problema({ step }: SlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center" style={{ padding: '0 140px' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,255,255,0.028) 0%, transparent 60%)',
        }}
      />

      <div className="relative">
        {/* Los saltos de línea ya son explícitos: un maxWidth estrecho solo
            consigue partir "El problema al que se enfrenta" por la mitad. */}
        <h2
          className="font-display font-bold text-white tracking-tighter"
          style={{ fontSize: 60, lineHeight: 1.1, marginBottom: 56, maxWidth: 1000 }}
        >
          <TextReveal text="El problema al que se enfrenta" mode="word" immediate style={{ display: 'block' }} />
          <TextReveal text="la mayoría de los negocios" mode="word" immediate delay={0.14} style={{ display: 'block' }} />
        </h2>

        <div className="grid grid-cols-2" style={{ gap: 24 }}>
          {PROBLEMAS.map((p, i) => {
            const Icon = p.icon
            return (
              <Beat at={i} step={step} key={p.title} delay={i === 0 ? 0.5 : 0}>
                <div
                  style={{
                    background: 'var(--surface-1)',
                    border: '1px solid var(--border)',
                    padding: '36px 40px',
                    display: 'flex',
                    gap: 24,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      flexShrink: 0,
                      display: 'grid',
                      placeItems: 'center',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: 'rgba(255,255,255,0.34)',
                    }}
                  >
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3
                      className="font-body"
                      style={{ fontSize: 25, fontWeight: 600, color: 'rgba(255,255,255,0.88)', marginBottom: 10, letterSpacing: '-0.01em' }}
                    >
                      {p.title}
                    </h3>
                    <p className="font-body" style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Beat>
            )
          })}
        </div>
      </div>
    </div>
  )
}

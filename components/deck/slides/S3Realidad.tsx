'use client'
import { useEffect, useState } from 'react'
import TextReveal from '@/components/motion/TextReveal'
import Beat, { type SlideProps } from '@/components/deck/Beat'

const STATS = [
  {
    to: 2.5,
    decimals: 1,
    suffix: ' h',
    label: 'Tiempo diario en redes',
    desc: 'La persona promedio pasa más de dos horas y media al día navegando feeds.',
  },
  {
    to: 4.9,
    decimals: 1,
    suffix: 'B',
    label: 'Usuarios activos',
    desc: 'Más de la mitad de la población mundial está en plataformas sociales.',
  },
  {
    to: 95,
    decimals: 0,
    suffix: '%',
    label: 'Uso móvil',
    desc: 'Casi todo el acceso a redes sociales ocurre desde el teléfono.',
  },
]

function Counter({ to, decimals, active }: { to: number; decimals: number; active: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 1000
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      setValue(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, to])

  return <span className="nums">{value.toFixed(decimals)}</span>
}

export default function S3Realidad({ step }: SlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center" style={{ padding: '0 140px' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(212,175,55,0.07) 0%, transparent 65%)',
        }}
      />

      <div className="relative">
        <h2
          className="font-display font-bold text-white tracking-tighter"
          style={{ fontSize: 58, lineHeight: 1.1, marginBottom: 72, maxWidth: '22ch' }}
        >
          <TextReveal text="La realidad de 2026:" mode="word" immediate style={{ display: 'block' }} />
          <TextReveal
            text="tus clientes viven en el teléfono"
            mode="word"
            immediate
            delay={0.14}
            className="text-gold"
            style={{ display: 'block' }}
          />
        </h2>

        <div className="grid grid-cols-3" style={{ gap: 56, marginBottom: 76 }}>
          {STATS.map((s, i) => (
            <Beat at={i} step={step} key={s.label} delay={i === 0 ? 0.45 : 0}>
              <div style={{ borderTop: '1px solid rgba(212,175,55,0.28)', paddingTop: 28 }}>
                <div
                  className="font-display font-bold text-gold"
                  style={{ fontSize: 92, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 18 }}
                >
                  <Counter to={s.to} decimals={s.decimals} active={step >= i} />
                  {s.suffix}
                </div>
                <div
                  className="label-sm"
                  style={{ fontSize: 14, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.72)', marginBottom: 14 }}
                >
                  {s.label}
                </div>
                <p className="font-body" style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {s.desc}
                </p>
              </div>
            </Beat>
          ))}
        </div>

        <Beat at={3} step={step}>
          <div style={{ borderLeft: '1px solid rgba(212,175,55,0.4)', paddingLeft: 32 }}>
            <p
              className="font-display"
              style={{ fontSize: 32, lineHeight: 1.45, color: 'rgba(255,255,255,0.82)', fontStyle: 'italic', marginBottom: 12 }}
            >
              “El negocio que no está en internet, simplemente no existe.”
            </p>
            <p className="label-sm" style={{ fontSize: 14, color: 'var(--text-tertiary)', letterSpacing: '0.14em' }}>
              Bill Gates
            </p>
          </div>
        </Beat>
      </div>
    </div>
  )
}

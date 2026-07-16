'use client'
import TextReveal from '@/components/motion/TextReveal'
import Beat, { type SlideProps } from '@/components/deck/Beat'

const RAZONES = [
  {
    n: '01',
    title: 'Tráfico masivo y dirigido',
    desc: 'Llegas exactamente a quien tiene más probabilidad de comprarte: por zona, edad, intereses y comportamiento.',
  },
  {
    n: '02',
    title: 'Clientes directo a WhatsApp',
    desc: 'Te escriben en el momento exacto en que están interesados, que es cuando la gente compra.',
  },
  {
    n: '03',
    title: 'Resultados medibles',
    desc: 'Sabes cuánto invertiste y cuántas personas te contactaron. Nada de adivinar.',
  },
  {
    n: '04',
    title: 'Sistema automatizado',
    desc: 'La campaña corre 24/7 y te trae clientes incluso mientras duermes.',
  },
]

export default function S5PorQueMeta({ step }: SlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center" style={{ padding: '0 140px' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 60% at 22% 45%, rgba(212,175,55,0.075) 0%, transparent 62%)',
        }}
      />

      <div className="relative">
        <h2
          className="font-display font-bold text-white tracking-tighter"
          style={{ fontSize: 58, lineHeight: 1.1, marginBottom: 68, maxWidth: '24ch' }}
        >
          <TextReveal text="Por qué Meta Ads es la solución" mode="word" immediate />
        </h2>

        <div className="grid grid-cols-2" style={{ gap: '52px 96px' }}>
          {RAZONES.map((r, i) => (
            <Beat at={i} step={step} key={r.n} delay={i === 0 ? 0.45 : 0}>
              <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                <span
                  className="font-display font-bold nums"
                  style={{
                    fontSize: 60,
                    lineHeight: 0.9,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(212,175,55,0.55)',
                    flexShrink: 0,
                  }}
                >
                  {r.n}
                </span>
                <div style={{ paddingTop: 6 }}>
                  <h3
                    className="font-body"
                    style={{ fontSize: 26, fontWeight: 600, color: 'rgba(255,255,255,0.92)', marginBottom: 12, letterSpacing: '-0.01em' }}
                  >
                    {r.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: 19, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
                    {r.desc}
                  </p>
                </div>
              </div>
            </Beat>
          ))}
        </div>
      </div>
    </div>
  )
}

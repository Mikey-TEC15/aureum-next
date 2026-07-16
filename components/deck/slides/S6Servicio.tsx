'use client'
import TextReveal from '@/components/motion/TextReveal'
import Beat, { type SlideProps } from '@/components/deck/Beat'

const ENTREGABLES = [
  {
    title: 'Creación completa de campañas',
    desc: 'Me encargo de cada detalle técnico, desde la configuración de la cuenta hasta el lanzamiento.',
  },
  {
    title: '3–5 imágenes profesionales',
    desc: 'Diseñadas a medida para frenar el scroll y ganarse la atención.',
  },
  {
    title: 'Copy persuasivo',
    desc: 'Textos que le hablan directo a lo que tu cliente necesita y desea.',
  },
  {
    title: 'Segmentación avanzada',
    desc: 'Tu presupuesto no se desperdicia en gente que nunca te iba a comprar.',
  },
  {
    title: 'Optimización continua',
    desc: 'Reviso y ajusto la campaña para sacarle el máximo a cada peso invertido.',
  },
]

export default function S6Servicio({ step }: SlideProps) {
  return (
    <div className="relative w-full h-full flex items-center" style={{ padding: '0 140px' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative grid w-full" style={{ gridTemplateColumns: '440px 1fr', gap: 120, alignItems: 'center' }}>
        <div>
          <div className="flex items-center gap-3" style={{ marginBottom: 28 }}>
            <span className="block bg-gold" style={{ height: 1, width: 40 }} />
            <span className="label-sm text-gold" style={{ fontSize: 14, letterSpacing: '0.2em' }}>
              Llave en mano
            </span>
          </div>

          <h2
            className="font-display font-bold text-white tracking-tighter"
            style={{ fontSize: 62, lineHeight: 1.08, marginBottom: 28 }}
          >
            <TextReveal text="El servicio" mode="word" immediate style={{ display: 'block' }} />
            <TextReveal text="completo" mode="word" immediate delay={0.12} className="text-gold" style={{ display: 'block' }} />
          </h2>

          <p className="font-body" style={{ fontSize: 21, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
            Todo lo técnico corre por mi cuenta. Tú pones el negocio y me cuentas a quién quieres llegar.
          </p>
        </div>

        <div>
          {ENTREGABLES.map((e, i) => (
            <Beat at={i} step={step} key={e.title} delay={i === 0 ? 0.45 : 0}>
              <div
                style={{
                  display: 'flex',
                  gap: 28,
                  alignItems: 'baseline',
                  padding: '24px 0',
                  borderBottom: i < ENTREGABLES.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span
                  className="font-display font-bold nums text-gold"
                  style={{ fontSize: 22, flexShrink: 0, width: 28, opacity: 0.8 }}
                >
                  {i + 1}
                </span>
                <div>
                  <h3
                    className="font-body"
                    style={{ fontSize: 25, fontWeight: 600, color: 'rgba(255,255,255,0.92)', marginBottom: 8, letterSpacing: '-0.01em' }}
                  >
                    {e.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {e.desc}
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

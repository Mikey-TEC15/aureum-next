'use client'
import TextReveal from '@/components/motion/TextReveal'
import Beat, { type SlideProps } from '@/components/deck/Beat'
import { WA_DISPLAY } from '@/components/deck/config'

export default function S8Cierre({ step }: SlideProps) {
  return (
    <div className="relative w-full h-full flex items-center" style={{ padding: '0 140px' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 58% 62% at 50% 52%, rgba(212,175,55,0.13) 0%, transparent 62%)',
        }}
      />

      <div className="relative grid w-full" style={{ gridTemplateColumns: '1fr 520px', gap: 110, alignItems: 'center' }}>
        <div>
          <div className="flex items-center gap-3" style={{ marginBottom: 30 }}>
            <span className="block bg-gold" style={{ height: 1, width: 40 }} />
            <span className="label-sm text-gold" style={{ fontSize: 14, letterSpacing: '0.2em' }}>
              ¿Listo?
            </span>
          </div>

          <h2
            className="font-display font-bold text-white tracking-tightest"
            style={{ fontSize: 82, lineHeight: 1.05, marginBottom: 34 }}
          >
            <TextReveal text="Obtén tus resultados" mode="word" immediate style={{ display: 'block' }} />
            <TextReveal text="ahora" mode="word" immediate delay={0.16} className="text-gold" style={{ display: 'block' }} />
          </h2>

          <Beat at={0} step={step} delay={0.6}>
            <p
              className="font-body"
              style={{ fontSize: 23, lineHeight: 1.7, color: 'var(--text-secondary)', maxWidth: '44ch', marginBottom: 40 }}
            >
              No dejes pasar otro día viendo a tu competencia ganar los clientes que deberían ser tuyos.
            </p>
          </Beat>

          <Beat at={2} step={step}>
            <div style={{ borderLeft: '1px solid rgba(212,175,55,0.4)', paddingLeft: 26, maxWidth: '48ch' }}>
              <p className="font-body" style={{ fontSize: 19, lineHeight: 1.65, color: 'rgba(255,255,255,0.78)' }}>
                Estoy tomando solamente{' '}
                <span className="text-gold nums" style={{ fontWeight: 600 }}>3 clientes</span> este mes, para
                poder darle a cada campaña el 100% de mi atención.
              </p>
            </div>
          </Beat>
        </div>

        {/* Tarjeta de contacto — en un video nadie puede hacer clic:
            el número tiene que estar legible en pantalla. */}
        <Beat at={1} step={step} y={22}>
          <div
            style={{
              background: 'var(--surface-2)',
              border: '1px solid rgba(212,175,55,0.28)',
              padding: '52px 48px',
            }}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: 30 }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#D4AF37" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="label-sm text-gold" style={{ fontSize: 14, letterSpacing: '0.18em' }}>
                Escríbeme por WhatsApp
              </span>
            </div>

            <div
              className="font-display font-bold nums text-white"
              style={{ fontSize: 42, letterSpacing: '-0.01em', marginBottom: 36 }}
            >
              {WA_DISPLAY}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 30 }}>
              <p className="font-body" style={{ fontSize: 16, color: 'var(--text-tertiary)', marginBottom: 14 }}>
                Solo mándame estas dos palabras:
              </p>
              <p
                className="font-display font-bold text-gold"
                style={{ fontSize: 40, letterSpacing: '-0.01em' }}
              >
                “Quiero Probar”
              </p>
            </div>
          </div>
        </Beat>
      </div>
    </div>
  )
}

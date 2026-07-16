'use client'
import { motion } from 'framer-motion'
import TextReveal from '@/components/motion/TextReveal'
import Beat, { type SlideProps } from '@/components/deck/Beat'
import { springs } from '@/lib/motion'

const PASOS = [
  { title: 'Te envío la solicitud', desc: 'Una invitación segura por el sistema oficial de Facebook.' },
  { title: 'La aceptas con un clic', desc: 'Acceso limitado. Nunca veo tus contraseñas ni datos personales.' },
  { title: 'Me pasas tus fotos', desc: 'Los videos e imágenes que ya tengas sirven.' },
  { title: 'Creo los anuncios', desc: 'Diseño y textos optimizados para conversión.' },
  { title: 'La campaña se activa', desc: 'Tus anuncios salen en Facebook e Instagram.' },
  { title: 'Recibes clientes', desc: 'Empiezan a llegarte mensajes por WhatsApp.' },
]

const DOT_ROW = 22
const LABEL_H = 176

export default function S7Proceso({ step }: SlideProps) {
  // El hilo de oro avanza hasta el nodo que se está narrando
  const reach = ((Math.min(step, PASOS.length - 1) + 0.5) / PASOS.length) * 100

  return (
    <div className="relative w-full h-full flex flex-col justify-center" style={{ padding: '0 100px' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 75% 45% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative">
        <h2
          className="font-display font-bold text-white tracking-tighter"
          style={{ fontSize: 56, lineHeight: 1.1, marginBottom: 40, paddingLeft: 40 }}
        >
          <TextReveal text="Cómo empezamos: 6 pasos" mode="word" immediate />
        </h2>

        <div className="relative grid grid-cols-6">
          {/* Riel base */}
          <div
            aria-hidden
            className="absolute"
            style={{
              top: LABEL_H + DOT_ROW / 2,
              left: '4%',
              right: '4%',
              height: 1,
              background: 'rgba(255,255,255,0.07)',
            }}
          />
          {/* Hilo de oro que avanza con la narración */}
          <motion.div
            aria-hidden
            className="absolute"
            style={{
              top: LABEL_H + DOT_ROW / 2,
              left: 0,
              height: 1,
              background: 'linear-gradient(to right, rgba(212,175,55,0.35), #D4AF37)',
              transformOrigin: 'left',
            }}
            initial={{ width: '4%' }}
            animate={{ width: `${reach}%` }}
            transition={{ ...springs.gentle, delay: 0.15 }}
          />

          {PASOS.map((p, i) => {
            const arriba = i % 2 === 0
            const activo = step >= i

            return (
              <div
                key={p.title}
                style={{ display: 'grid', gridTemplateRows: `${LABEL_H}px ${DOT_ROW}px ${LABEL_H}px` }}
              >
                <div style={{ alignSelf: 'end', paddingBottom: 22, paddingRight: 28 }}>
                  {arriba && <Etiqueta paso={p} index={i} step={step} />}
                </div>

                {/* Nodo */}
                <div style={{ display: 'grid', placeItems: 'center' }}>
                  <motion.div
                    initial={false}
                    animate={{
                      scale: activo ? 1 : 0.6,
                      backgroundColor: activo ? '#D4AF37' : 'rgba(255,255,255,0.14)',
                    }}
                    transition={springs.snappy}
                    style={{ width: 9, height: 9, borderRadius: '50%' }}
                  />
                </div>

                <div style={{ alignSelf: 'start', paddingTop: 22, paddingRight: 28 }}>
                  {!arriba && <Etiqueta paso={p} index={i} step={step} />}
                </div>
              </div>
            )
          })}
        </div>

        <Beat at={PASOS.length} step={step}>
          <div
            style={{
              marginTop: 32,
              marginLeft: 40,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              border: '1px solid rgba(212,175,55,0.3)',
              padding: '14px 24px',
            }}
          >
            <span className="block bg-gold" style={{ width: 6, height: 6, borderRadius: '50%' }} />
            <span className="font-body" style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)' }}>
              De que apruebas a que la campaña está corriendo:{' '}
              <span className="text-gold nums" style={{ fontWeight: 600 }}>24 a 48 horas</span>
            </span>
          </div>
        </Beat>
      </div>
    </div>
  )
}

function Etiqueta({
  paso,
  index,
  step,
}: {
  paso: { title: string; desc: string }
  index: number
  step: number
}) {
  return (
    <Beat at={index} step={step} delay={index === 0 ? 0.4 : 0} y={10}>
      <span
        className="font-display font-bold nums text-gold"
        style={{ fontSize: 15, letterSpacing: '0.1em', display: 'block', marginBottom: 10, opacity: 0.75 }}
      >
        0{index + 1}
      </span>
      <h3
        className="font-body"
        style={{ fontSize: 20, fontWeight: 600, color: 'rgba(255,255,255,0.92)', marginBottom: 8, lineHeight: 1.25 }}
      >
        {paso.title}
      </h3>
      <p className="font-body" style={{ fontSize: 15.5, lineHeight: 1.55, color: 'var(--text-secondary)' }}>
        {paso.desc}
      </p>
    </Beat>
  )
}

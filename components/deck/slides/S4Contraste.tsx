'use client'
import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import TextReveal from '@/components/motion/TextReveal'
import Beat, { type SlideProps } from '@/components/deck/Beat'
import { springs } from '@/lib/motion'

const VIEJO = [
  { title: 'Volantes físicos', desc: 'Caros, inmedibles, y terminan en la basura.' },
  { title: 'Publicaciones aleatorias', desc: 'Publicar sin estrategia es tiempo perdido y cero alcance.' },
  { title: 'Esperar la suerte', desc: 'Que te encuentren por casualidad no es una estrategia.' },
]

const NUEVO = [
  { title: 'Sistema de anuncios Meta', desc: 'Llegas a miles de clientes potenciales segmentados cada día.' },
  { title: 'Directo a WhatsApp', desc: 'Los interesados te escriben al instante, listos para comprar.' },
  { title: 'Resultados predecibles', desc: 'Sabes cuántos contactos estás recibiendo y cuánto te costaron.' },
]

export default function S4Contraste({ step }: SlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center" style={{ padding: '0 140px' }}>
      {/* El lado ganador se enciende cuando llega su beat */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ opacity: step >= 1 ? 1 : 0 }}
        transition={springs.gentle}
        style={{
          background: 'radial-gradient(ellipse 42% 70% at 78% 50%, rgba(212,175,55,0.10) 0%, transparent 64%)',
        }}
      />

      <div className="relative">
        <h2
          className="font-display font-bold text-white tracking-tighter"
          style={{ fontSize: 58, lineHeight: 1.1, marginBottom: 64 }}
        >
          <TextReveal text="Lo que no funciona vs. lo que sí" mode="word" immediate />
        </h2>

        <div className="grid grid-cols-2 relative" style={{ gap: 96 }}>
          {/* Divisoria */}
          <motion.div
            aria-hidden
            className="absolute"
            style={{
              left: '50%',
              top: 0,
              width: 1,
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 20%, rgba(212,175,55,0.28) 80%, transparent)',
            }}
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ ...springs.gentle, delay: 0.4 }}
          />

          {/* Columna muerta */}
          <Beat at={0} step={step} delay={0.45}>
            <div className="flex items-center gap-3" style={{ marginBottom: 36 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.36)',
                }}
              >
                <X size={15} strokeWidth={2} />
              </div>
              <span className="label-sm" style={{ fontSize: 15, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.42)' }}>
                Métodos anticuados
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              {VIEJO.map((v) => (
                <div key={v.title} style={{ borderLeft: '1px solid rgba(255,255,255,0.09)', paddingLeft: 26 }}>
                  <h3
                    className="font-body"
                    style={{ fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}
                  >
                    {v.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-tertiary)' }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </Beat>

          {/* Columna viva */}
          <Beat at={1} step={step} x={14} y={0}>
            <div className="flex items-center gap-3" style={{ marginBottom: 36 }}>
              <div
                style={{
                  width: 30,
                  height: 30,
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px solid rgba(212,175,55,0.45)',
                  color: '#D4AF37',
                }}
              >
                <Check size={15} strokeWidth={2.2} />
              </div>
              <span className="label-sm text-gold" style={{ fontSize: 15, letterSpacing: '0.18em' }}>
                La estrategia ganadora
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              {NUEVO.map((n) => (
                <div key={n.title} style={{ borderLeft: '1px solid rgba(212,175,55,0.35)', paddingLeft: 26 }}>
                  <h3
                    className="font-body"
                    style={{ fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.92)', marginBottom: 8 }}
                  >
                    {n.title}
                  </h3>
                  <p className="font-body" style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                    {n.desc}
                  </p>
                </div>
              ))}
            </div>
          </Beat>
        </div>
      </div>
    </div>
  )
}

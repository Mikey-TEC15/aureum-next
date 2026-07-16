'use client'
import { motion } from 'framer-motion'
import TextReveal from '@/components/motion/TextReveal'
import Beat, { type SlideProps } from '@/components/deck/Beat'
import { springs } from '@/lib/motion'

export default function S1Portada({ step }: SlideProps) {
  return (
    <div className="relative w-full h-full flex items-center" style={{ padding: '0 140px' }}>
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 52% 58% at 74% 50%, rgba(212,175,55,0.11) 0%, transparent 62%)',
        }}
      />

      <div className="relative" style={{ maxWidth: 1240 }}>
        <motion.div
          className="flex items-center gap-4"
          style={{ marginBottom: 44 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...springs.smooth, delay: 0.1 }}
        >
          <motion.span
            className="block bg-gold"
            style={{ height: 1 }}
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ ...springs.snappy, delay: 0.2 }}
          />
          <span
            className="label-sm text-gold"
            style={{ fontSize: 15, letterSpacing: '0.2em', opacity: 0.75 }}
          >
            Aureum · Propuesta
          </span>
        </motion.div>

        <h1
          className="font-display font-bold text-white tracking-tightest"
          style={{ fontSize: 104, lineHeight: 1.04, marginBottom: 40 }}
        >
          <TextReveal text="Tu negocio puede crecer" mode="word" immediate delay={0.25} style={{ display: 'block' }} />
          {/* El espacio va como margen: un espacio dentro del texto le crea
              a TextReveal una palabra vacía y sangra la línea. */}
          <TextReveal
            text="más rápido"
            mode="word"
            immediate
            delay={0.42}
            className="text-gold"
            style={{ display: 'inline-block', marginRight: '0.26em' }}
          />
          <TextReveal text="de lo que piensas" mode="word" immediate delay={0.5} style={{ display: 'inline-block' }} />
        </h1>

        <Beat at={0} step={step} delay={0.85}>
          <p
            className="font-body"
            style={{
              fontSize: 30,
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: '46ch',
            }}
          >
            El sistema probado para atraer clientes diarios desde Facebook e Instagram.
          </p>
        </Beat>
      </div>
    </div>
  )
}

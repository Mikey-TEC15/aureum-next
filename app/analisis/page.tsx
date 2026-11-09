'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { WA } from '@/lib/whatsapp'

/* ──────────────────────────────────────────────────────────────
   PEGA AQUÍ EL ENLACE DE TU VIDEO
   Acepta:
     • YouTube  → 'https://youtu.be/XXXXXXXX'  o  'https://www.youtube.com/watch?v=XXXXXXXX'
     • Vimeo    → 'https://vimeo.com/XXXXXXXX'
     • Archivo  → súbelo a la carpeta /public y pon  '/mi-analisis.mp4'
   Déjalo vacío ('') y la página muestra un aviso para pegarlo.
   ────────────────────────────────────────────────────────────── */
const VIDEO_SRC = 'https://youtu.be/Jx7BXfhsv2I'

/** Convierte un enlace de YouTube/Vimeo en su URL para incrustar. */
function toEmbed(src: string): { kind: 'file' | 'iframe'; url: string } | null {
  if (!src) return null
  if (/\.mp4($|\?)/i.test(src)) return { kind: 'file', url: src }

  const yt =
    src.match(/youtu\.be\/([\w-]+)/)?.[1] ??
    src.match(/[?&]v=([\w-]+)/)?.[1] ??
    src.match(/youtube\.com\/embed\/([\w-]+)/)?.[1]
  if (yt) return { kind: 'iframe', url: `https://www.youtube.com/embed/${yt}?rel=0` }

  const vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/)?.[1]
  if (vm) return { kind: 'iframe', url: `https://player.vimeo.com/video/${vm}` }

  // Cualquier otra URL se intenta incrustar tal cual.
  return { kind: 'iframe', url: src }
}

function Video() {
  const embed = toEmbed(VIDEO_SRC)

  if (!embed) {
    return (
      <div
        className="flex items-center justify-center text-center"
        style={{
          aspectRatio: '16 / 9',
          borderRadius: 16,
          border: '1px dashed rgba(212,175,55,0.4)',
          background: 'rgba(212,175,55,0.04)',
          padding: 24,
        }}
      >
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: '40ch' }}>
          Pega el enlace de tu video en{' '}
          <code style={{ color: 'var(--gold)' }}>app/analisis/page.tsx</code>{' '}
          (constante <code style={{ color: 'var(--gold)' }}>VIDEO_SRC</code>).
        </p>
      </div>
    )
  }

  if (embed.kind === 'file') {
    return (
      <video
        src={embed.url}
        controls
        playsInline
        style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: 16, display: 'block', background: '#000' }}
      />
    )
  }

  return (
    <div style={{ aspectRatio: '16 / 9', borderRadius: 16, overflow: 'hidden', background: '#000' }}>
      <iframe
        src={embed.url}
        title="Análisis Aureum"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
      />
    </div>
  )
}

function Content() {
  const params = useSearchParams()
  // Personalización opcional: /analisis?para=Déntica
  const para = params.get('para')?.trim()

  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center"
      style={{ padding: '72px 24px 96px' }}
    >
      {/* Glow dorado de fondo (misma firma visual del deck) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 60%)',
        }}
      />

      <div className="relative w-full" style={{ maxWidth: 960 }}>
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4"
          style={{ marginBottom: 24 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="block bg-gold" style={{ height: 1, width: 48 }} />
          <span
            className="text-gold"
            style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.8 }}
          >
            Aureum · Análisis
          </span>
        </motion.div>

        {/* Titular */}
        <motion.h1
          className="font-display font-bold text-white"
          style={{ fontSize: 'clamp(34px, 6vw, 60px)', lineHeight: 1.08, marginBottom: 16, letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {para ? (
            <>
              Hola, <span className="text-gold">{para}</span>
            </>
          ) : (
            <>
              Preparé algo <span className="text-gold">para ti</span>
            </>
          )}
        </motion.h1>

        <motion.p
          className="font-body"
          style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '52ch', marginBottom: 40 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Un análisis corto y directo de lo que encontré en tu presencia digital
          — y exactamente qué haría para traerte más clientes.
        </motion.p>

        {/* Video */}
        <motion.div
          style={{
            borderRadius: 16,
            padding: 1,
            background: 'linear-gradient(135deg, rgba(212,175,55,0.5), rgba(212,175,55,0.08))',
            boxShadow: '0 40px 120px -40px rgba(212,175,55,0.35)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Video />
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ marginTop: 48, gap: 16 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <p className="font-body" style={{ fontSize: 17, color: 'var(--text-secondary)' }}>
            ¿Te hizo sentido? Hablemos y lo llevamos a la práctica.
          </p>
          <a
            href={WA.analisis}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable font-body"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--gold)',
              color: '#0D0D0D',
              fontWeight: 600,
              fontSize: 16,
              padding: '14px 28px',
              borderRadius: 999,
              textDecoration: 'none',
            }}
          >
            Escríbeme por WhatsApp →
          </a>
        </motion.div>
      </div>
    </main>
  )
}

export default function AnalisisPage() {
  return (
    <Suspense fallback={null}>
      <Content />
    </Suspense>
  )
}

'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SLIDES, TOTAL_BEATS, BEATS_BEFORE } from '@/components/deck/config'

const STAGE_W = 1920
const STAGE_H = 1080

export default function Deck() {
  const [index, setIndex] = useState(0)
  const [step, setStep] = useState(0)
  const [nonce, setNonce] = useState(0)
  const [notes, setNotes] = useState(false)
  const [chrome, setChrome] = useState(true)
  const [scale, setScale] = useState(1)

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Los handlers leen la posición por ref para no re-suscribir el teclado en cada beat
  const stepRef = useRef(step)
  const indexRef = useRef(index)
  stepRef.current = step
  indexRef.current = index

  const slide = SLIDES[index]

  // ── Entrada directa a una diapositiva ─────────────────────────────────────
  // /presentacion?s=5 abre la 5 — para regrabar una sección suelta sin pasar
  // por todo el deck. &full=1 la abre con todos sus beats ya revelados.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const s = Number(q.get('s'))
    if (Number.isInteger(s) && s >= 1 && s <= SLIDES.length) {
      setIndex(s - 1)
      setStep(q.get('full') === '1' ? SLIDES[s - 1].steps - 1 : 0)
    } else if (q.get('full') === '1') {
      setStep(SLIDES[0].steps - 1)
    }
  }, [])

  // ── El escenario es siempre 1920×1080 y se escala al viewport ─────────────
  // Así lo que grabas es idéntico sin importar el tamaño de la ventana.
  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const goNext = useCallback(() => {
    const i = indexRef.current
    const s = stepRef.current
    if (s < SLIDES[i].steps - 1) {
      setStep(s + 1)
      return
    }
    if (i < SLIDES.length - 1) {
      setIndex(i + 1)
      setStep(0)
      setNonce((n) => n + 1)
    }
  }, [])

  const goPrev = useCallback(() => {
    const i = indexRef.current
    const s = stepRef.current
    if (s > 0) {
      setStep(s - 1)
      return
    }
    if (i > 0) {
      setIndex(i - 1)
      // Al volver atrás la diapositiva aparece ya completa
      setStep(SLIDES[i - 1].steps - 1)
      setNonce((n) => n + 1)
    }
  }, [])

  const goSlide = useCallback((i: number) => {
    if (i < 0 || i >= SLIDES.length) return
    setIndex(i)
    setStep(0)
    setNonce((n) => n + 1)
  }, [])

  /** R vuelve a montar la diapositiva: repite su animación desde cero */
  const replay = useCallback(() => {
    setStep(0)
    setNonce((n) => n + 1)
  }, [])

  // ── Teclado ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          goNext()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          goPrev()
          break
        case 'ArrowDown':
          e.preventDefault()
          goSlide(indexRef.current + 1)
          break
        case 'ArrowUp':
          e.preventDefault()
          goSlide(indexRef.current - 1)
          break
        case 'Home':
          goSlide(0)
          break
        case 'End':
          goSlide(SLIDES.length - 1)
          break
        case 'r':
        case 'R':
          replay()
          break
        case 's':
        case 'S':
          setNotes((v) => !v)
          break
        case 'f':
        case 'F':
          if (document.fullscreenElement) document.exitFullscreen()
          else document.documentElement.requestFullscreen().catch(() => {})
          break
        default:
          if (/^[1-8]$/.test(e.key)) goSlide(Number(e.key) - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev, goSlide, replay])

  // ── La interfaz se esconde sola: lo que se graba es la diapositiva ────────
  useEffect(() => {
    const wake = () => {
      setChrome(true)
      if (hideTimer.current) clearTimeout(hideTimer.current)
      hideTimer.current = setTimeout(() => setChrome(false), 2600)
    }
    wake()
    window.addEventListener('mousemove', wake)
    window.addEventListener('keydown', wake)
    return () => {
      window.removeEventListener('mousemove', wake)
      window.removeEventListener('keydown', wake)
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  const Slide = slide.Component
  const progress = (BEATS_BEFORE[index] + step + 1) / TOTAL_BEATS

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#050505', cursor: chrome ? 'default' : 'none' }}
      onClick={goNext}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: STAGE_W,
          height: STAGE_H,
          transform: `translate(-50%, -50%) scale(${scale})`,
          background: '#0D0D0D',
          overflow: 'hidden',
        }}
      >
        {/* Retícula de puntos — el mismo motivo del hero */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.032) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 100%)',
          }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${index}-${nonce}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            <Slide step={step} />
          </motion.div>
        </AnimatePresence>

        {/* Viñeta — asienta los bordes en video */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.42) 100%)' }}
        />

        {/* Grano muy leve — a más grano, peor comprime YouTube */}
        <div aria-hidden className="deck-grain absolute inset-0 pointer-events-none" />

        {/* Marca + contador: parte del cuadro, siempre visibles */}
        <div
          className="absolute flex items-center justify-between"
          style={{ left: 140, right: 140, bottom: 54 }}
        >
          <span
            className="font-display font-bold"
            style={{ fontSize: 17, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.30)' }}
          >
            AUREUM
          </span>
          <span
            className="font-body nums"
            style={{ fontSize: 14, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.26)' }}
          >
            {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>
        </div>

        <div aria-hidden className="absolute" style={{ left: 0, right: 0, bottom: 0, height: 2, background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(to right, rgba(212,175,55,0.5), #D4AF37)' }}
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 90, damping: 24 }}
          />
        </div>
      </div>

      {/* ── Fuera del escenario: nada de esto entra en la grabación ────────── */}
      <AnimatePresence>
        {chrome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute pointer-events-none"
            style={{ bottom: 14, left: '50%', transform: 'translateX(-50%)' }}
          >
            <div
              className="font-body flex items-center"
              style={{
                gap: 18,
                fontSize: 11,
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.32)',
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '8px 16px',
                borderRadius: 999,
              }}
            >
              <span className="nums">{step + 1}/{slide.steps}</span>
              <span>→ avanzar</span>
              <span>← atrás</span>
              <span>↑↓ diapositiva</span>
              <span>R repetir</span>
              <span>S guion</span>
              <span>F pantalla completa</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute"
            style={{
              left: 24,
              right: 24,
              bottom: 48,
              background: 'rgba(0,0,0,0.92)',
              border: '1px solid rgba(212,175,55,0.3)',
              padding: '20px 26px',
              maxHeight: 220,
              overflowY: 'auto',
            }}
          >
            <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
              <span className="label-sm text-gold" style={{ fontSize: 11, letterSpacing: '0.18em' }}>
                Guion · {String(index + 1).padStart(2, '0')} {slide.label}
              </span>
              <span className="font-body" style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
                Beat {step + 1}/{slide.steps} · S para ocultar (no lo dejes abierto al grabar)
              </span>
            </div>
            <p className="font-body" style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
              {slide.notes}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  baseAlpha: number
  phase: number
  speed: number
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0
    let H = 0
    let particles: Particle[] = []

    function resize() {
      if (!canvas) return
      W = canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth
      H = canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight
      build()
    }

    function build() {
      particles = []
      const count = Math.floor((W * H) / 9000)
      for (let i = 0; i < count; i++) {
        // Bias toward right half
        const x = W * 0.50 + Math.random() * W * 0.55
        const y = Math.random() * H
        const a = 0.15 + Math.random() * 0.55
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -0.12 - Math.random() * 0.18,
          size: 0.8 + Math.random() * 2.2,
          alpha: a,
          baseAlpha: a,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.8,
        })
      }
    }

    function draw(t: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, W, H)

      // Glow orb — right center
      const gx = W * 0.72
      const gy = H * 0.48
      const gr = Math.min(W, H) * 0.52
      const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr)
      grd.addColorStop(0, 'rgba(212,175,55,0.22)')
      grd.addColorStop(0.35, 'rgba(212,175,55,0.10)')
      grd.addColorStop(0.7, 'rgba(212,175,55,0.03)')
      grd.addColorStop(1, 'rgba(212,175,55,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)

      // Particles
      for (const p of particles) {
        const pulse = Math.sin(t * 0.001 * p.speed + p.phase) * 0.3
        const a = Math.max(0, p.baseAlpha + pulse)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,175,55,${a.toFixed(3)})`
        ctx.shadowBlur = p.size * 4
        ctx.shadowColor = `rgba(212,175,55,0.6)`
        ctx.fill()
        ctx.shadowBlur = 0

        p.x += p.vx
        p.y += p.vy
        if (p.y < -4) p.y = H + 4
        if (p.x < W * 0.35) p.x = W * 0.35
        if (p.x > W + 4) p.x = W * 0.42
      }

      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

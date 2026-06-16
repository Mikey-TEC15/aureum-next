'use client'
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * PricingParticles — floating golden dust for the pricing overlay.
 *
 * A single additive Points cloud with a soft radial sprite, slow ambient spin,
 * gentle vertical breathing and a faint cursor parallax. Tuned to read as light
 * mist behind the content — never visual noise. DPR-capped; particle count
 * drops on small screens.
 */

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768

// Soft round gold sprite so points aren't hard squares.
function makeSprite() {
  const size = 64
  const c = document.createElement('canvas')
  c.width = c.height = size
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(232,204,106,1)')
  g.addColorStop(0.25, 'rgba(212,175,55,0.6)')
  g.addColorStop(1, 'rgba(212,175,55,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function Field() {
  const ref = useRef<THREE.Points>(null)
  const COUNT = IS_MOBILE ? 320 : 720

  const { positions, sprite } = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 16   // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12   // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 7 - 1 // z (mostly behind)
    }
    return { positions: arr, sprite: makeSprite() }
  }, [COUNT])

  useFrame((state) => {
    const pts = ref.current
    if (!pts) return
    const t = state.clock.elapsedTime
    // Slow ambient spin + soft breathing for life.
    pts.rotation.y = t * 0.02
    pts.position.y = Math.sin(t * 0.18) * 0.25
    // Subtle cursor parallax.
    pts.rotation.x += (state.pointer.y * 0.12 - pts.rotation.x) * 0.04
    pts.rotation.z += (-state.pointer.x * 0.08 - pts.rotation.z) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        color="#D4AF37"
        size={IS_MOBILE ? 0.13 : 0.11}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function PricingParticles() {
  return (
    <Canvas
      dpr={[1, IS_MOBILE ? 1 : 1.5]}
      camera={{ position: [0, 0, 6], fov: 62 }}
      gl={{ antialias: !IS_MOBILE, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Field />
    </Canvas>
  )
}

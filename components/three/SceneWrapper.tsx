'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense, type RefObject } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ParticleEntity from './ParticleEntity'
import { useMousePosition } from '@/hooks/useMousePosition'

interface SceneWrapperProps {
  scrollProgress?: RefObject<number>
}

const staticProgress = { current: 0 }

export default function SceneWrapper({ scrollProgress }: SceneWrapperProps) {
  const mousePosition = useMousePosition()

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ParticleEntity
          mousePosition={mousePosition}
          scrollProgress={scrollProgress ?? staticProgress}
        />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.18}
            luminanceSmoothing={0.92}
            intensity={0.55}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}

'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense, type RefObject } from 'react'
import ParticleEntity from './ParticleEntity'
import { useMousePosition } from '@/hooks/useMousePosition'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

interface SceneWrapperProps {
  scrollProgress?: RefObject<number>
}

const staticProgress = { current: 0 }

function Scene({ scrollProgress }: SceneWrapperProps) {
  const mousePosition = useMousePosition()

  return (
    <Canvas
      camera={{ position: [1.5, 0, 6], fov: 55 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        gl.setClearColor(0x000000, 0)
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ParticleEntity
          mousePosition={mousePosition}
          scrollProgress={scrollProgress ?? staticProgress}
        />
      </Suspense>
    </Canvas>
  )
}

export default function SceneWrapper({ scrollProgress }: SceneWrapperProps) {
  return (
    <ErrorBoundary>
      <Scene scrollProgress={scrollProgress} />
    </ErrorBoundary>
  )
}

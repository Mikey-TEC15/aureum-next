'use client'
import dynamic from 'next/dynamic'

// Three.js canvas — browser-only, loads after first paint
export const AureumScene = dynamic(
  () => import('@/components/three/AureumScene'),
  { ssr: false, loading: () => null }
)

// GSAP ScrollTrigger — uses window, must be client-only
export const Process = dynamic(
  () => import('@/components/sections/Process'),
  { ssr: false, loading: () => <div style={{ minHeight: '100vh' }} /> }
)

'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CORE_COUNT = 1400
const MID_COUNT = 1900
const OUTER_COUNT = 1100
const TOTAL = CORE_COUNT + MID_COUNT + OUTER_COUNT

const vertexShader = `
  uniform float uTime;
  attribute float aSize;
  attribute float aBrightness;
  attribute float aPhase;
  attribute float aLayer;
  varying float vBrightness;
  varying float vLayer;

  void main() {
    vBrightness = aBrightness;
    vLayer = aLayer;

    vec3 pos = position;
    vec3 dir = normalize(pos);

    // Organic floating: outward breathing + tangential wobble.
    // Outer layers drift further — the entity feels like it is exhaling energy.
    float drift = 0.05 + aLayer * 0.09;
    float angle = uTime * (0.18 + aLayer * 0.05) + aPhase;
    pos += dir * sin(angle) * drift;
    pos.x += sin(uTime * 0.16 + aPhase * 2.1) * drift * 0.5;
    pos.y += cos(uTime * 0.13 + aPhase * 1.7) * drift * 0.5;
    pos.z += sin(uTime * 0.11 + aPhase * 1.3) * drift * 0.4;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform vec3 uColorCore;
  uniform vec3 uColorGold;
  uniform vec3 uColorRim;
  varying float vBrightness;
  varying float vLayer;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.5) discard;

    float core = 1.0 - smoothstep(0.0, 0.2, dist);
    float body = 1.0 - smoothstep(0.04, 0.5, dist);
    // thin bright ring near the edge — reads as a metallic glint catching light
    float rim = smoothstep(0.30, 0.43, dist) * (1.0 - smoothstep(0.43, 0.5, dist));

    vec3 color = mix(uColorGold, uColorCore, vBrightness);
    color = mix(color, uColorRim, rim * vBrightness * 0.55);

    float alpha = pow(body, 1.6) * vBrightness * 0.8 + core * vBrightness * 0.35;

    gl_FragColor = vec4(color, alpha);
  }
`

interface ParticleEntityProps {
  mousePosition: React.RefObject<{ x: number; y: number }>
  scrollProgress: React.RefObject<number>
}

export default function ParticleEntity({ mousePosition, scrollProgress }: ParticleEntityProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const groupRef = useRef<THREE.Group>(null)
  const rotY = useRef(0)
  const currentRotX = useRef(0)
  const currentRotZ = useRef(0)
  const currentScale = useRef(1)

  const { positions, sizes, brightness, phases, layers } = useMemo(() => {
    const positions = new Float32Array(TOTAL * 3)
    const sizes = new Float32Array(TOTAL)
    const brightness = new Float32Array(TOTAL)
    const phases = new Float32Array(TOTAL)
    const layers = new Float32Array(TOTAL)

    let cursor = 0

    // Layer 0 — dense nucleus: tight, bright, the "intelligence" at the center
    for (let i = 0; i < CORE_COUNT; i++, cursor++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / CORE_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      const r = 0.5 + (Math.random() - 0.5) * 0.32

      positions[cursor * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[cursor * 3 + 1] = r * Math.cos(phi)
      positions[cursor * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      sizes[cursor] = Math.random() * 2.2 + 1.1
      brightness[cursor] = Math.random() * 0.35 + 0.65
      phases[cursor] = Math.random() * Math.PI * 2
      layers[cursor] = 0
    }

    // Layer 1 — orbital halo: looser, the "connection" ring around the core
    for (let i = 0; i < MID_COUNT; i++, cursor++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / MID_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i * 1.13
      const r = 1.15 + (Math.random() - 0.5) * 0.7

      positions[cursor * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[cursor * 3 + 1] = r * Math.cos(phi) * 0.88
      positions[cursor * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      sizes[cursor] = Math.random() * 3.0 + 1.3
      brightness[cursor] = Math.random() * 0.4 + 0.32
      phases[cursor] = Math.random() * Math.PI * 2
      layers[cursor] = 1
    }

    // Layer 2 — outward drift: sparse particles emanating outward, the "growth"
    for (let i = 0; i < OUTER_COUNT; i++, cursor++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / OUTER_COUNT)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i * 0.79
      const r = 1.95 + Math.random() * 1.35

      positions[cursor * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[cursor * 3 + 1] = r * Math.cos(phi) * 0.82
      positions[cursor * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      sizes[cursor] = Math.random() * 2.4 + 0.7
      brightness[cursor] = Math.random() * 0.3 + 0.16
      phases[cursor] = Math.random() * Math.PI * 2
      layers[cursor] = 2
    }

    return { positions, sizes, brightness, phases, layers }
  }, [])

  const material = useMemo(() => new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColorCore: { value: new THREE.Color('#FFF6DE') },
      uColorGold: { value: new THREE.Color('#D4AF37') },
      uColorRim: { value: new THREE.Color('#F4E8C8') },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), [])

  useFrame((state) => {
    if (!pointsRef.current || !groupRef.current) return
    const mx = mousePosition.current?.x ?? 0
    const my = mousePosition.current?.y ?? 0
    const scroll = scrollProgress.current ?? 0

    material.uniforms.uTime.value = state.clock.elapsedTime

    // Base rotation drifts slowly on its own; the mouse nudges it, scroll accelerates it —
    // as if the entity leans toward the visitor's attention.
    rotY.current += 0.0022 + scroll * 0.0028
    currentRotX.current += (my * 0.32 - currentRotX.current) * 0.04
    currentRotZ.current += (mx * 0.1 - currentRotZ.current) * 0.04

    pointsRef.current.rotation.y = rotY.current + mx * 0.14
    pointsRef.current.rotation.x = currentRotX.current
    pointsRef.current.rotation.z = currentRotZ.current

    // The entity opens up slightly as the visitor scrolls past it — a quiet "exhale".
    const targetScale = 1 + scroll * 0.22
    currentScale.current += (targetScale - currentScale.current) * 0.05
    groupRef.current.scale.setScalar(currentScale.current)
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} material={material}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
          <bufferAttribute attach="attributes-aBrightness" args={[brightness, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
          <bufferAttribute attach="attributes-aLayer" args={[layers, 1]} />
        </bufferGeometry>
      </points>
    </group>
  )
}

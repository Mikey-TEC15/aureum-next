'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─── Types ────────────────────────────────────────────────────────────────────
export type FormationKey =
  | 'sphere' | 'scatter' | 'network'
  | 'flow'   | 'grid'    | 'neural' | 'logo'

const N = 2800

// ─── Formation generators ─────────────────────────────────────────────────────
function makeSphere(n: number): Float32Array {
  const p = new Float32Array(n * 3)
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const t = phi * i
    p[i*3]   = r * Math.cos(t) * 1.8
    p[i*3+1] = y * 1.8
    p[i*3+2] = r * Math.sin(t) * 1.8
  }
  return p
}

function makeScatter(n: number): Float32Array {
  const p = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    const r     = 3 + Math.random() * 8
    p[i*3]   = r * Math.sin(phi) * Math.cos(theta)
    p[i*3+1] = r * Math.cos(phi)
    p[i*3+2] = r * Math.sin(phi) * Math.sin(theta)
  }
  return p
}

function makeNetwork(n: number): Float32Array {
  const p = new Float32Array(n * 3)
  const nc = 18
  const nodes: [number, number, number][] = Array.from({ length: nc }, () => [
    (Math.random() - 0.5) * 7,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 1.5,
  ])
  for (let i = 0; i < n; i++) {
    if (i < nc * 10) {
      const nd = nodes[i % nc]
      p[i*3]   = nd[0] + (Math.random() - 0.5) * 0.25
      p[i*3+1] = nd[1] + (Math.random() - 0.5) * 0.25
      p[i*3+2] = nd[2] + (Math.random() - 0.5) * 0.25
    } else {
      const a = nodes[Math.floor(Math.random() * nc)]
      const b = nodes[Math.floor(Math.random() * nc)]
      const t = Math.random()
      p[i*3]   = a[0] + (b[0] - a[0]) * t
      p[i*3+1] = a[1] + (b[1] - a[1]) * t
      p[i*3+2] = a[2] + (b[2] - a[2]) * t
    }
  }
  return p
}

function makeFlow(n: number): Float32Array {
  const p = new Float32Array(n * 3)
  const streams = 10
  for (let i = 0; i < n; i++) {
    const s = i % streams
    const t = Math.random()
    const x = (s / (streams - 1) - 0.5) * 7
    p[i*3]   = x + Math.sin(t * Math.PI * 3 + s * 0.8) * 0.4 + (Math.random() - 0.5) * 0.1
    p[i*3+1] = t * 6 - 3
    p[i*3+2] = Math.cos(t * Math.PI * 2 + s) * 0.5
  }
  return p
}

function makeGrid(n: number): Float32Array {
  const p = new Float32Array(n * 3)
  const side = Math.ceil(Math.cbrt(n))
  for (let i = 0; i < n; i++) {
    p[i*3]   = ((i % side) / (side - 1) - 0.5) * 7
    p[i*3+1] = ((Math.floor(i / side) % side) / (side - 1) - 0.5) * 4
    p[i*3+2] = ((Math.floor(i / (side * side))) / (side - 1) - 0.5) * 2.5
  }
  return p
}

function makeNeural(n: number): Float32Array {
  const p = new Float32Array(n * 3)
  const layers = [5, 8, 12, 8, 5, 3]
  const total  = layers.reduce((a, b) => a + b, 0)
  const perNode = Math.floor(n / total)
  let idx = 0
  for (let l = 0; l < layers.length; l++) {
    const count = layers[l]
    const x     = (l / (layers.length - 1) - 0.5) * 9
    for (let nd = 0; nd < count && idx < n; nd++) {
      const y   = count > 1 ? (nd / (count - 1) - 0.5) * 5 : 0
      const end = Math.min(idx + perNode, n)
      while (idx < end) {
        p[idx*3]   = x + (Math.random() - 0.5) * 0.25
        p[idx*3+1] = y + (Math.random() - 0.5) * 0.25
        p[idx*3+2] = (Math.random() - 0.5) * 1.2
        idx++
      }
    }
  }
  while (idx < n) {
    p[idx*3]   = (Math.random() - 0.5) * 9
    p[idx*3+1] = (Math.random() - 0.5) * 5
    p[idx*3+2] = (Math.random() - 0.5) * 1.2
    idx++
  }
  return p
}

function makeLogo(n: number): Float32Array {
  const p = new Float32Array(n * 3)
  const third = Math.floor(n / 3)
  for (let i = 0; i < n; i++) {
    const t = Math.random()
    const j = 0.06
    if (i < third) {
      p[i*3]   = -1.8 + t * 1.8 + (Math.random() - 0.5) * j
      p[i*3+1] = -2.0 + t * 4.0 + (Math.random() - 0.5) * j
      p[i*3+2] = (Math.random() - 0.5) * 0.15
    } else if (i < third * 2) {
      p[i*3]   =  1.8 - t * 1.8 + (Math.random() - 0.5) * j
      p[i*3+1] = -2.0 + t * 4.0 + (Math.random() - 0.5) * j
      p[i*3+2] = (Math.random() - 0.5) * 0.15
    } else {
      p[i*3]   = (Math.random() - 0.5) * 2.0
      p[i*3+1] = 0.2 + (Math.random() - 0.5) * j
      p[i*3+2] = (Math.random() - 0.5) * 0.15
    }
  }
  return p
}

// ─── Formation cache ──────────────────────────────────────────────────────────
const GEN: Record<FormationKey, (n: number) => Float32Array> = {
  sphere:  makeSphere,
  scatter: makeScatter,
  network: makeNetwork,
  flow:    makeFlow,
  grid:    makeGrid,
  neural:  makeNeural,
  logo:    makeLogo,
}
const CACHE = new Map<FormationKey, Float32Array>()

function getFormation(key: FormationKey): Float32Array {
  if (!CACHE.has(key)) CACHE.set(key, GEN[key](N))
  return CACHE.get(key)!
}

// ─── Shaders ──────────────────────────────────────────────────────────────────
const VERT = /* glsl */ `
  uniform float uTime;
  uniform float uT;

  attribute vec3  aFrom;
  attribute vec3  aTo;
  attribute float aSize;
  attribute float aPhase;
  attribute float aDelay;

  varying float vAlpha;
  varying float vDepth;

  float ss(float t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  void main() {
    float local = clamp((uT - aDelay * 0.45) / 0.55, 0.0, 1.0);
    local = ss(local);

    vec3 pos = mix(aFrom, aTo, local);

    // Gentle organic drift
    float b = sin(uTime * 0.65 + aPhase) * 0.025
            + cos(uTime * 0.44 + aPhase * 1.3) * 0.015;
    pos += normalize(pos + vec3(0.001)) * b;

    vec4 mv   = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (-280.0 / mv.z);
    gl_Position  = projectionMatrix * mv;

    // Subtle pulse — range 0.2 to 0.7 (never fully opaque)
    vAlpha = 0.35 + 0.35 * sin(uTime * 0.55 + aPhase);
    vDepth = clamp(length(pos) / 6.0, 0.0, 1.0);
  }
`

const FRAG = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;

  varying float vAlpha;
  varying float vDepth;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;
    float d    = length(uv);
    if (d > 0.5) discard;

    // Tighter core, softer glow — less overpowering
    float core = 1.0 - smoothstep(0.0, 0.12, d);
    float glow = 1.0 - smoothstep(0.0, 0.5,  d);
    vec3  col  = mix(uColA, uColB, vDepth * 0.5 + 0.1);
    float a    = (core * 0.55 + glow * 0.13) * vAlpha;

    gl_FragColor = vec4(col, a);
  }
`

// ─── Particle mesh ────────────────────────────────────────────────────────────
interface ParticlesProps {
  target: FormationKey
  mouse:  React.MutableRefObject<{ x: number; y: number }>
}

function Particles({ target, mouse }: ParticlesProps) {
  const groupRef   = useRef<THREE.Group>(null)
  const morphT     = useRef(1)
  const prevTarget = useRef<FormationKey>('sphere')
  const rotX       = useRef(0)
  const rotY       = useRef(0)
  const autoY      = useRef(0) // slow ambient rotation

  const { geo, mat } = useMemo(() => {
    const init   = getFormation('sphere')
    const sizes  = new Float32Array(N)
    const phases = new Float32Array(N)
    const delays = new Float32Array(N)

    for (let i = 0; i < N; i++) {
      sizes[i]  = 0.5 + Math.random() * 1.2
      phases[i] = Math.random() * Math.PI * 2
      delays[i] = Math.random()
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(init.slice(), 3))
    g.setAttribute('aFrom',    new THREE.BufferAttribute(init.slice(), 3))
    g.setAttribute('aTo',      new THREE.BufferAttribute(init.slice(), 3))
    g.setAttribute('aSize',    new THREE.BufferAttribute(sizes,  1))
    g.setAttribute('aPhase',   new THREE.BufferAttribute(phases, 1))
    g.setAttribute('aDelay',   new THREE.BufferAttribute(delays, 1))

    const m = new THREE.ShaderMaterial({
      vertexShader:   VERT,
      fragmentShader: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uT:    { value: 1 },
        uColA: { value: new THREE.Color('#D4AF37') },
        uColB: { value: new THREE.Color('#F5E6A3') },
      },
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    })

    return { geo: g, mat: m }
  }, [])

  useEffect(() => () => { geo.dispose(); mat.dispose() }, [geo, mat])

  useEffect(() => {
    if (target === prevTarget.current) return

    const fromAttr = geo.getAttribute('aFrom') as THREE.BufferAttribute
    const toAttr   = geo.getAttribute('aTo')   as THREE.BufferAttribute
    const fromArr  = fromAttr.array as Float32Array
    const toArr    = toAttr.array   as Float32Array
    const curT     = morphT.current

    for (let i = 0; i < N * 3; i++) {
      fromArr[i] = fromArr[i] + (toArr[i] - fromArr[i]) * curT
    }
    fromAttr.needsUpdate = true

    toArr.set(getFormation(target))
    toAttr.needsUpdate = true

    morphT.current = 0
    mat.uniforms.uT.value = 0
    prevTarget.current = target
  }, [target, geo, mat])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    mat.uniforms.uTime.value += delta

    if (morphT.current < 1) {
      morphT.current = Math.min(1, morphT.current + delta * 0.50)
      mat.uniforms.uT.value = morphT.current
    }

    // Ambient auto-rotation — subtle, never stops
    autoY.current += delta * 0.12

    // Mouse adds a gentle tilt on top of auto-rotation
    rotY.current += (mouse.current.x * 0.5 - rotY.current) * 0.045
    rotX.current += (-mouse.current.y * 0.25 - rotX.current) * 0.045

    groupRef.current.rotation.y = autoY.current + rotY.current
    groupRef.current.rotation.x = rotX.current
  })

  return (
    <group ref={groupRef}>
      <points geometry={geo} material={mat} />
    </group>
  )
}

// ─── Section → formation mapping ──────────────────────────────────────────────
const SECTION_FORMATIONS: Record<string, FormationKey> = {
  inicio:    'sphere',
  leads:     'network',
  'meta-ads':'flow',
  web:       'grid',
  ia:        'neural',
  contacto:  'logo',
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function AureumScene() {
  const [target, setTarget] = useState<FormationKey>('sphere')
  const mouse               = useRef({ x: 0, y: 0 })
  const activeSection       = useRef('inicio')
  const timer               = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const detect = (): string => {
      let found = activeSection.current
      const mid = window.innerHeight * 0.5
      document.querySelectorAll<HTMLElement>('[data-formation]').forEach(el => {
        const { top, bottom } = el.getBoundingClientRect()
        if (top <= mid && bottom >= mid) {
          found = el.getAttribute('data-formation') ?? found
        }
      })
      return found
    }

    const onScroll = () => {
      const section = detect()
      if (section === activeSection.current) return

      activeSection.current = section
      const next = (SECTION_FORMATIONS[section] ?? 'sphere') as FormationKey

      clearTimeout(timer.current)
      setTarget('scatter')
      timer.current = setTimeout(() => setTarget(next), 650)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer.current)
    }
  }, [])

  return (
    // z-index: -1 → paints behind non-positioned elements (white sections cover it naturally)
    <div
      aria-hidden
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1 }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <Particles target={target} mouse={mouse} />
      </Canvas>
    </div>
  )
}

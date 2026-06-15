'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * ShaderWaves — Aureum adaptation of 21st.dev web-gl-shader.
 *
 * Flowing horizontal sine waves with chromatic offset. The original was neon RGB;
 * here the channels are warm-weighted (blue dropped) so the glow reads gold over
 * black, with a faint warm aberration at the edges. Dimmed for text legibility,
 * DPR-capped. Fixed background, z-index -1.
 */

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768

const VERT = /* glsl */ `void main(){ gl_Position = vec4(position, 1.0); }`

const FRAG = /* glsl */ `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform float xScale;
  uniform float yScale;
  uniform float distortion;
  uniform float uScroll;     // continuous: waves drift with scroll position
  uniform float uScrollVel;  // decaying: scrolling adds energy + steepens the tilt
  uniform vec2  uMouse;      // cursor position in p-space; the band bends toward it

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

    // Background layer only — slow, opposite-tilted, faint. With the bright front
    // band removed it stays out of the way of the content above it. Scroll still
    // drives its drift and amplitude; a tight cursor ripple keeps it interactive.
    float md   = length(p - uMouse);
    float infl = exp(-md * md * 16.0);

    float bTilt  = -0.16 + uScrollVel * 0.3;
    float bAmp   = yScale * 0.8 * (1.0 + uScrollVel * 1.5);
    float bph    = time * 0.45 + uScroll * 1.6;
    float bBaseY = p.y * 1.35 + p.x * bTilt;
    bBaseY += infl * sin(md * 30.0 - time * 4.0) * 0.03;   // soft ripple from cursor
    float back   = 0.05 / abs(bBaseY + sin((p.x * 0.85 + bph) * xScale) * bAmp);

    vec3 gold = vec3(0.831, 0.686, 0.216); // #D4AF37
    vec3 col = gold * back * 0.14;          // single faint background wave
    gl_FragColor = vec4(col, 1.0);
  }
`

export default function ShaderWaves() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: !IS_MOBILE })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, IS_MOBILE ? 1 : 1.5))
    renderer.setClearColor(0x000000)
    const el = renderer.domElement
    el.style.width = '100%'; el.style.height = '100%'; el.style.display = 'block'
    container.appendChild(el)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      resolution: { value: new THREE.Vector2() },
      time: { value: 0.0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.06 },
      uScroll: { value: 0.0 },
      uScrollVel: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }
    const material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
    const geometry = new THREE.PlaneGeometry(2, 2)
    scene.add(new THREE.Mesh(geometry, material))

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight
      renderer.setSize(w, h)
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(container)
    onResize()

    // Scroll feeds the waves: position drifts them, velocity energizes them.
    let lastY = window.scrollY
    let scrollAccum = 0
    const onScroll = () => { scrollAccum += Math.abs(window.scrollY - lastY); lastY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Cursor in p-space (matches the shader's normalised coords, y flipped).
    const mouseTarget = new THREE.Vector2(0, 0)
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth, h = window.innerHeight, m = Math.min(w, h)
      mouseTarget.set((e.clientX * 2 - w) / m, -((e.clientY * 2 - h) / m))
    }
    if (!IS_MOBILE) window.addEventListener('mousemove', onMove)

    let raf = 0
    const animate = () => {
      raf = requestAnimationFrame(animate)
      uniforms.time.value += 0.01
      uniforms.uScroll.value = window.scrollY * 0.0012
      const velTarget = Math.min(scrollAccum, 120) * 0.004
      uniforms.uScrollVel.value += (velTarget - uniforms.uScrollVel.value) * 0.12
      scrollAccum *= 0.85
      uniforms.uMouse.value.lerp(mouseTarget, 0.08)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      if (el.parentNode) el.parentNode.removeChild(el)
      geometry.dispose(); material.dispose(); renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none', background: '#000' }}
    />
  )
}

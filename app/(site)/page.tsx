import dynamic from 'next/dynamic'
import { ShaderWaves, Process } from '@/components/ClientSections'

// ── Critical path — SSR'd + above fold ──────────────────────────────────────
import Hero           from '@/components/sections/Hero'
import MarqueeSection from '@/components/ui/Marquee'
import Benefits       from '@/components/sections/Benefits'
import Services       from '@/components/sections/Services'

// ── Below fold — SSR'd HTML, JS split into separate async chunks ─────────────
const CaseStudies  = dynamic(() => import('@/components/sections/CaseStudies'))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'))
const FAQ          = dynamic(() => import('@/components/sections/FAQ'))
const Contact      = dynamic(() => import('@/components/sections/Contact'))
const Footer       = dynamic(() => import('@/components/sections/Footer'))

function LightToDark() {
  return (
    <div
      aria-hidden
      style={{
        height: 80,
        background: 'linear-gradient(to bottom, #ffffff, #0D0D0D)',
        pointerEvents: 'none',
      }}
    />
  )
}

export default function Home() {
  return (
    <>
      <ShaderWaves />
      <Hero />
      <MarqueeSection />
      <Benefits />
      <Services />
      <Process />
      <CaseStudies />
      <Testimonials />
      <FAQ />
      <LightToDark />
      <Contact />
      <Footer />
    </>
  )
}

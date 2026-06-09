import Hero from '@/components/sections/Hero'
import MarqueeSection from '@/components/ui/Marquee'
import Benefits from '@/components/sections/Benefits'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import CaseStudies from '@/components/sections/CaseStudies'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

// Gradient bridges — ease the eye between light and dark sections
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

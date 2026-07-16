import LenisProvider from '@/components/LenisProvider'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import SectionProgress from '@/components/SectionProgress'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'
import PricingProvider from '@/components/pricing/PricingContext'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LenisProvider>
      <PricingProvider>
        <CustomCursor />
        <ScrollProgress />
        <SectionProgress />
        <Navbar />
        <main>{children}</main>
        <FloatingWhatsApp />
      </PricingProvider>
    </LenisProvider>
  )
}

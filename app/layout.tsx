import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import SectionProgress from '@/components/SectionProgress'
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aureum Studio — Marketing Digital Premium',
  description:
    'Leads calificados, Meta Ads con ROAS real, desarrollo web de alta conversión y automatización con IA. Todo en un solo estudio con foco en resultados.',
  keywords: ['marketing digital', 'meta ads', 'generación de leads', 'automatización IA', 'agencia premium'],
  openGraph: {
    title: 'Aureum Studio — Marketing Digital Premium',
    description: 'Resultados medibles. Sin excusas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-hidden" style={{ background: '#0D0D0D', color: '#ffffff' }}>
        <LenisProvider>
          <CustomCursor />
          <ScrollProgress />
          <SectionProgress />
          <Navbar />
          <main>{children}</main>
          <FloatingWhatsApp />
        </LenisProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import SectionProgress from '@/components/SectionProgress'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
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
      className={`${playfair.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-hidden" style={{ background: '#0D0D0D', color: '#ffffff' }}>
        <LenisProvider>
          <CustomCursor />
          <ScrollProgress />
          <SectionProgress />
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  )
}

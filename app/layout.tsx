import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { GlassFilter } from '@/components/ui/LiquidGlassButton'

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
    'Leads calificados, Meta Ads con ROAS real y desarrollo web de alta conversión. Todo en un solo estudio con foco en resultados.',
  keywords: ['marketing digital', 'meta ads', 'generación de leads', 'desarrollo web', 'agencia premium'],
  openGraph: {
    title: 'Aureum Studio — Marketing Digital Premium',
    description: 'Resultados medibles. Sin excusas.',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

// Separate Viewport export prevents the deprecated viewport meta warning
export const viewport: Viewport = {
  themeColor: '#0D0D0D',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
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
        {children}
        <GlassFilter />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aureum — Presentación',
  // El deck es material de venta, no una página del sitio: fuera del índice.
  robots: { index: false, follow: false },
}

export default function DeckLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

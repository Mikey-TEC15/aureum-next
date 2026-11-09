import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aureum — Análisis para tu negocio',
  description: 'Un análisis corto, hecho a la medida de tu negocio.',
  // Es material de venta que se comparte por enlace directo, no una
  // página del sitio: fuera del índice de buscadores.
  robots: { index: false, follow: false },
}

export default function AnalisisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

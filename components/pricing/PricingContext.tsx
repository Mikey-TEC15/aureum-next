'use client'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'

// Overlay is heavy (R3F particle canvas) — only ship its JS once the provider
// mounts, and never render it on the server.
const PricingOverlay = dynamic(() => import('@/components/pricing/PricingOverlay'), {
  ssr: false,
  loading: () => null,
})

interface PricingContextValue {
  open: boolean
  openPricing: () => void
  closePricing: () => void
}

const PricingContext = createContext<PricingContextValue>({
  open: false,
  openPricing: () => {},
  closePricing: () => {},
})

export const usePricing = () => useContext(PricingContext)

export default function PricingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openPricing = useCallback(() => setOpen(true), [])
  const closePricing = useCallback(() => setOpen(false), [])

  return (
    <PricingContext.Provider value={{ open, openPricing, closePricing }}>
      {children}
      <PricingOverlay open={open} onClose={closePricing} />
    </PricingContext.Provider>
  )
}

'use client'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface UseRevealOptions {
  once?: boolean
  amount?: number
}

export function useReveal<T extends Element = HTMLDivElement>(options: UseRevealOptions = {}) {
  const ref = useRef<T>(null)
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: options.once ?? true,
    margin: '-80px' as `${number}${'px' | '%'}`,
    amount: options.amount ?? 0,
  })
  return { ref, isInView }
}

'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'proceso', label: 'Proceso' },
  { id: 'casos', label: 'Casos' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contacto', label: 'Contacto' },
]

export default function SectionProgress() {
  const [activeId, setActiveId] = useState<string>('inicio')
  const [dark, setDark] = useState(true) // indicator color scheme

  useEffect(() => {
    const darkSections = new Set(['inicio', 'servicios', 'proceso', 'contacto'])

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveId(id)
            setDark(!darkSections.has(id))
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const dotColor = dark ? 'rgba(17,17,17,0.35)' : 'rgba(255,255,255,0.3)'
  const activeColor = '#D4AF37'

  return (
    <nav
      aria-label="Navegación de secciones"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 items-center"
    >
      {sections.map((s) => {
        const isActive = s.id === activeId
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={isActive ? 'true' : undefined}
            title={s.label}
          >
            <motion.div
              animate={{
                width: isActive ? 20 : 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: isActive ? activeColor : dotColor,
              }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            />
          </a>
        )
      })}
    </nav>
  )
}

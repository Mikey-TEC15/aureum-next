'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { WA } from '@/lib/whatsapp'

const E = [0.23, 1, 0.32, 1] as const

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso',   href: '#proceso'   },
  { label: 'Casos',     href: '#casos'     },
  { label: 'Contacto',  href: '#contacto'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: E }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5"
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-500"
          style={{
            background:         scrolled ? 'rgba(10,10,10,0.86)' : 'transparent',
            backdropFilter:     scrolled ? 'blur(20px) saturate(180%)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
            borderRadius:       scrolled ? '12px' : '0',
            padding:            scrolled ? '0.6rem 1.4rem' : '0',
            border:             scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div
              className="w-5 h-5 flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #C9A035 0%, #E8CC6A 100%)',
                borderRadius: 4,
              }}
              aria-hidden
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10.2 5.9L15.6 6.5L11.8 10.1L12.8 15.5L8 12.7L3.2 15.5L4.2 10.1L0.4 6.5L5.8 5.9L8 1Z" fill="#0F0F0F"/>
              </svg>
            </div>
            <span className="font-display font-bold text-[0.82rem] tracking-[0.08em] text-white">
              AUREUM <span className="text-gold">STUDIO</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: E }}
                className="gold-link label-sm text-white/40 hover:text-white/80 transition-colors duration-200"
              >
                {l.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.a
              href={WA.navbar}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.45, ease: E }}
              className="hidden md:inline-flex pressable items-center gap-1.5 bg-gold text-ink label-sm font-semibold px-5 py-2.5 hover:bg-gold-light transition-colors duration-200"
              style={{ borderRadius: 8 }}
            >
              Consulta Gratis
            </motion.a>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-white/60 hover:text-white p-1 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu size={19} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex flex-col p-6"
            style={{ background: 'rgba(7,7,7,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="flex justify-between items-center mb-14">
              <span className="font-display font-bold text-[0.82rem] tracking-[0.08em] text-white">
                AUREUM <span className="text-gold">STUDIO</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X size={19} strokeWidth={1.6} />
              </button>
            </div>
            <nav className="flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ x: -18, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: E }}
                  onClick={() => setOpen(false)}
                  className="font-display text-[2.2rem] font-bold text-white py-3.5 border-b hover:text-gold transition-colors duration-200"
                  style={{ borderColor: 'rgba(255,255,255,0.05)', letterSpacing: '-0.02em' }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href={WA.navbar}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex justify-center items-center bg-gold text-ink font-body font-semibold label-sm py-4"
                style={{ borderRadius: 10 }}
              >
                Consulta Gratis por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

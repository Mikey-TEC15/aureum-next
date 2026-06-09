'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const E = [0.23, 1, 0.32, 1] as const

const links = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Casos', href: '#casos' },
  { label: 'Contacto', href: '#contacto' },
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
            background: scrolled ? 'rgba(13,13,13,0.88)' : 'transparent',
            backdropFilter: scrolled ? 'blur(24px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
            borderRadius: scrolled ? '14px' : '0',
            padding: scrolled ? '0.65rem 1.5rem' : '0',
            border: scrolled ? '1px solid rgba(255,255,255,0.055)' : 'none',
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#C9A035] to-[#E8CC6A] flex items-center justify-center flex-shrink-0">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L10.2 5.9L15.6 6.5L11.8 10.1L12.8 15.5L8 12.7L3.2 15.5L4.2 10.1L0.4 6.5L5.8 5.9L8 1Z" fill="#111"/>
              </svg>
            </div>
            <span className="font-display font-bold text-sm tracking-[0.06em] text-white">
              AUREUM <span className="text-gold">STUDIO</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: E }}
                className="gold-link text-xs font-body text-white/50 hover:text-white uppercase tracking-widest transition-colors duration-200"
              >
                {l.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#contacto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.45, ease: E }}
              className="hidden md:inline-flex pressable items-center gap-2 bg-gold text-ink text-xs font-bold uppercase tracking-[0.06em] px-5 py-2.5 rounded-[7px] hover:bg-gold-light transition-colors duration-200"
            >
              Agendar Consulta
            </motion.a>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-white p-1"
              aria-label="Abrir menú"
            >
              <Menu size={20} strokeWidth={1.8} />
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[rgba(8,8,8,0.97)] backdrop-blur-2xl flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display font-bold text-sm tracking-[0.06em] text-white">
                AUREUM <span className="text-gold">STUDIO</span>
              </span>
              <button onClick={() => setOpen(false)} className="text-white">
                <X size={20} strokeWidth={1.8} />
              </button>
            </div>
            <nav className="flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: E }}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl font-bold text-white py-3 border-b border-white/5 hover:text-gold transition-colors duration-200"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="flex justify-center items-center bg-gold text-ink font-bold text-sm tracking-wide py-4 rounded-xl"
              >
                Agendar Consulta
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

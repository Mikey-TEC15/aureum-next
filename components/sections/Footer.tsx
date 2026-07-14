'use client'
import { motion } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import { springs } from '@/lib/motion'

const links = {
  Servicios: ['Meta Ads', 'Generación de Leads', 'Desarrollo Web'],
  Empresa:   ['Proceso', 'Casos de Éxito', 'Testimonios', 'FAQ'],
  Contacto:  ['WhatsApp', 'Instagram', 'Email'],
}

export default function Footer() {
  const { ref, isInView } = useReveal()

  return (
    <footer
      className="relative overflow-hidden pt-[clamp(5rem,8vw,8rem)] pb-10 px-6 md:px-10"
      style={{ background: '#0D0D0D' }}
    >
      {/* Subtle bottom glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50vw] h-[18vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.035) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...springs.smooth }}
        >
          {/* Top: brand + links */}
          <div className="grid grid-cols-2 md:grid-cols-[2fr_repeat(3,1fr)] gap-10 mb-16">

            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="inline-flex items-center gap-2.5 mb-5 group">
                <div
                  className="w-5 h-5 flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C9A035, #E8CC6A)', borderRadius: 4 }}
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
              <p
                className="font-body leading-[1.7] max-w-[26ch]"
                style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}
              >
                Agencia de marketing digital enfocada en resultados medibles.
              </p>
            </div>

            {/* Nav columns */}
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="label-sm mb-5" style={{ color: 'var(--text-ghost)', fontSize: '0.6rem' }}>
                  {group}
                </p>
                <ul className="space-y-3.5">
                  {items.map((item) => {
                    const href =
                      item === 'WhatsApp'  ? 'https://wa.me/5534347955'
                      : item === 'Instagram' ? 'https://instagram.com/miguel_alvarezra'
                      : item === 'Email'     ? 'mailto:santiago.alvrmz@gmail.com'
                      : `#${item.toLowerCase().replace(/\s+/g, '-')}`

                    return (
                      <li key={item}>
                        <a
                          href={href}
                          className="font-body transition-colors duration-200"
                          style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-tertiary)')}
                        >
                          {item}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px mb-8" style={{ background: 'var(--border)' }} />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <p className="font-body" style={{ fontSize: '0.67rem', color: 'var(--text-ghost)' }}>
              © {new Date().getFullYear()} Aureum Studio. Todos los derechos reservados.
            </p>
            <p className="font-body" style={{ fontSize: '0.67rem', color: 'rgba(255,255,255,0.08)', letterSpacing: '0.04em' }}>
              Diseñado y construido con precisión.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

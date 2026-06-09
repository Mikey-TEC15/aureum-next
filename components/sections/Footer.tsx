'use client'
import { motion } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'

const E = [0.23, 1, 0.32, 1] as const

const links = {
  Servicios: ['Meta Ads', 'Generación de Leads', 'Desarrollo Web', 'Automatización IA'],
  Empresa: ['Proceso', 'Casos de Éxito', 'Testimonios', 'FAQ'],
  Contacto: ['WhatsApp', 'Instagram', 'Email'],
}

export default function Footer() {
  const { ref, isInView } = useReveal()

  return (
    <footer
      className="relative overflow-hidden pt-[clamp(5rem,8vw,7rem)] pb-10 px-6 md:px-10"
      style={{ background: 'transparent' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[20vh] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: E }}
        >
          {/* Top: brand + links */}
          <div className="grid grid-cols-2 md:grid-cols-[2fr_repeat(3,1fr)] gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-5 h-5 border border-gold/40 flex items-center justify-center"
                  aria-hidden
                >
                  <div className="w-1.5 h-1.5 bg-gold" />
                </div>
                <span className="font-display font-bold text-white text-base tracking-tight">
                  Aureum Studio
                </span>
              </div>
              <p className="font-body text-white/25 text-[0.78rem] leading-[1.7] max-w-[28ch]">
                Agencia de marketing digital enfocada en resultados medibles.
              </p>
            </div>

            {/* Nav columns */}
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="font-body text-[0.6rem] tracking-[0.16em] uppercase text-white/25 mb-4">
                  {group}
                </p>
                <ul className="space-y-3">
                  {items.map((item) => {
                    const href =
                      item === 'WhatsApp'
                        ? 'https://wa.me/5534347955'
                        : item === 'Instagram'
                        ? 'https://instagram.com/miguel_alvarezra'
                        : item === 'Email'
                        ? 'mailto:santiago.alvrmz@gmail.com'
                        : `#${item.toLowerCase().replace(/\s+/g, '-')}`

                    return (
                      <li key={item}>
                        <a
                          href={href}
                          className="font-body text-[0.78rem] text-white/35 hover:text-white transition-colors duration-200"
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
          <div className="h-px bg-white/[0.05] mb-8" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="font-body text-[0.68rem] text-white/18">
              © {new Date().getFullYear()} Aureum Studio. Todos los derechos reservados.
            </p>
            <p className="font-body text-[0.68rem] text-white/12">
              Diseñado y construido con precisión.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

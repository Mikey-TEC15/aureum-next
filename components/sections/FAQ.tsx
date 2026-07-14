'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '@/hooks/useReveal'
import { Plus } from 'lucide-react'

const E = [0.23, 1, 0.32, 1] as const

const faqs = [
  {
    q: '¿Cuánto tiempo tarda en verse resultados?',
    a: 'Las primeras señales (leads, tráfico cualificado, datos de campaña) llegan en la primera semana. Resultados significativos y medibles en 15-30 días. Escalamiento real en 60 días.',
  },
  {
    q: '¿Trabajamos con contrato o mes a mes?',
    a: 'Mes a mes. No atamos a nuestros clientes con contratos largos porque no los necesitamos: los resultados son los que retienen. Puedes salir cuando quieras.',
  },
  {
    q: '¿Qué presupuesto mínimo necesito para Meta Ads?',
    a: 'Trabajamos desde $300 USD/mes en inversión publicitaria. Con menos de eso no hay datos suficientes para optimizar bien. El sweet spot para empresas pequeñas y medianas está entre $500 y $2,000 USD/mes.',
  },
  {
    q: '¿Se especializan en alguna industria?',
    a: 'Tenemos experiencia probada en salud, retail, inmobiliario y servicios B2B. Pero nuestra metodología es transferible: cualquier negocio con ticket de venta definido y capacidad de escalar puede beneficiarse.',
  },
  {
    q: '¿Qué incluye la consulta inicial?',
    a: 'Diagnóstico de tu situación actual, análisis de tus métricas (si las tienes), identificación de las 2-3 palancas de crecimiento más directas, y propuesta concreta sin compromiso. Dura 45 minutos.',
  },
  {
    q: '¿Ustedes gestionan todo o nos enseñan a hacerlo?',
    a: 'Gestionamos todo: estrategia, ejecución, optimización y reportes. No somos una escuela ni una consultoría que te deja tareas. Nosotros hacemos el trabajo.',
  },
]

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const { ref, isInView } = useReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.06, ease: E }}
      className="border-b border-ink/[0.07] last:border-none"
    >
      <button
        onClick={() => setOpen(!open)}
        className="group w-full flex items-start justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span
          className="font-body font-medium text-ink leading-snug group-hover:text-gold transition-colors duration-200"
          style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
        >
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0.5 transition-all duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <Plus
            size={16}
            strokeWidth={1.8}
            className={open ? 'text-gold' : 'text-ink/30 group-hover:text-gold'}
            style={{ transition: 'color 200ms ease' }}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: E }}
            className="overflow-hidden"
          >
            <p className="font-body text-[#666666] text-sm leading-[1.85] pb-6 max-w-[70ch]">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const { ref: headerRef, isInView: headerInView } = useReveal()

  return (
    <section id="faq" className="bg-white py-[clamp(6rem,10vw,10rem)] px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
          {/* Left: header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: E }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-px bg-gold" />
              <span className="font-body text-[0.65rem] tracking-[0.22em] uppercase text-gold font-medium">
                FAQ
              </span>
            </div>
            <h2
              className="font-display font-bold text-ink leading-[1.08] tracking-tightest mb-5"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
            >
              Preguntas que{' '}
              <em className="not-italic text-gold">siempre recibimos.</em>
            </h2>
            <p className="font-body text-[#777777] text-[0.88rem] leading-[1.75] max-w-[34ch]">
              Si tienes una duda que no está aquí, escríbenos directamente por WhatsApp.
            </p>

            <a
              href="https://wa.me/5534347955"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 font-body text-[0.78rem] text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-200"
            >
              Preguntar por WhatsApp →
            </a>
          </motion.div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

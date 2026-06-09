'use client'
import { useRef } from 'react'

interface MarqueeProps {
  items: React.ReactNode[]
  speed?: number        // seconds for one full cycle
  direction?: 'left' | 'right'
  className?: string
}

export function MarqueeRow({ items, speed = 28, direction = 'left', className = '' }: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {/* Double for seamless loop */}
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center flex-shrink-0">
            {items.map((item, i) => (
              <span key={i} className="flex items-center">
                {item}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

const Separator = () => (
  <span className="mx-6 text-gold/40 font-body text-[0.6rem]">◆</span>
)

const stats = [
  { value: '248%', label: 'más leads' },
  { value: '5.8×', label: 'ROAS' },
  { value: '89%', label: 'retención' },
  { value: '+127', label: 'proyectos' },
  { value: '60d', label: 'primeros resultados' },
  { value: '#1', label: 'Meta Ads Partner' },
]

const tags = [
  'Meta Ads', 'Lead Generation', 'Desarrollo Web',
  'Automatización IA', 'Email Marketing', 'CRM Automation',
  'Google Ads', 'Analítica Avanzada', 'Funnel Strategy',
]

export default function MarqueeSection() {
  const statItems = stats.flatMap((s, i) => [
    <span key={`stat-${i}`} className="flex items-center gap-2 font-body text-[0.8rem]">
      <span className="font-display font-bold text-gold text-[1.05rem]">{s.value}</span>
      <span className="text-white/35 tracking-wide">{s.label}</span>
    </span>,
    <Separator key={`sep-${i}`} />,
  ])

  const tagItems = tags.flatMap((t, i) => [
    <span key={`tag-${i}`} className="font-body text-[0.72rem] tracking-[0.12em] uppercase text-white/25">
      {t}
    </span>,
    <Separator key={`sep-${i}`} />,
  ])

  return (
    <div
      className="py-5 overflow-hidden select-none"
      style={{ background: '#0D0D0D', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
    >
      <style>{`
        @keyframes marquee-left  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
      <MarqueeRow items={statItems} speed={30} direction="left" className="mb-3" />
      <MarqueeRow items={tagItems} speed={22} direction="right" />
    </div>
  )
}

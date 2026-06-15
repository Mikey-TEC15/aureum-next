'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * LiquidGlassButton — Aureum adaptation of 21st.dev's liquid-glass-button.
 *
 * The "liquid glass" look is an SVG turbulence/displacement filter used as a
 * backdrop-filter (Chromium) that refracts whatever sits behind the button,
 * plus layered inset shadows for the glass bevel and a faint outer glow.
 * Here it's tinted to the Aureum gold/ink system over dark backgrounds, with a
 * backdrop-blur fallback for browsers that don't honour SVG backdrop filters
 * (Safari/Firefox). Renders as <a> when `href` is set, otherwise <button>.
 */

const liquidGlass = cva(
  'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden ' +
    'font-body font-semibold label-sm transition-transform duration-200 ' +
    'active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60',
  {
    variants: {
      variant: {
        // Gold-tinted glass — the primary CTA look
        gold: 'text-ink',
        // Neutral glass with gold text — secondary / on-image
        clear: 'text-gold',
      },
      size: {
        md: 'px-6 py-3',
        lg: 'px-7 py-3.5',
        xl: 'px-9 py-4 text-[0.95rem]',
      },
    },
    defaultVariants: { variant: 'gold', size: 'lg' },
  }
)

// Tints sit *behind* the content (-z-10) so the refracted backdrop shows through.
const tintByVariant = {
  gold: 'bg-gold/85',
  clear: 'bg-white/[0.06]',
} as const

type LiquidGlassButtonProps = VariantProps<typeof liquidGlass> & {
  children: React.ReactNode
  className?: string
  /** When provided, renders an anchor instead of a button. */
  href?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

export default function LiquidGlassButton({
  children,
  className,
  variant = 'gold',
  size,
  href,
  ...props
}: LiquidGlassButtonProps) {
  const radius = 9

  const inner = (
    <>
      {/* Refraction layer: SVG filter on Chromium, blur fallback elsewhere */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 backdrop-blur-[3px]"
        style={{ borderRadius: radius, backdropFilter: 'url(#aureum-glass) blur(3px)' }}
      />
      {/* Colour tint */}
      <span
        aria-hidden
        className={cn('absolute inset-0 -z-10 transition-colors duration-200', tintByVariant[variant ?? 'gold'])}
        style={{ borderRadius: radius }}
      />
      {/* Glass bevel + specular highlight + outer glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          borderRadius: radius,
          boxShadow:
            'inset 1px 1px 1px -0.5px rgba(255,255,255,0.55),' +
            'inset -1px -1px 1px -0.5px rgba(0,0,0,0.45),' +
            'inset 0 0 6px 2px rgba(255,255,255,0.10),' +
            '0 1px 8px rgba(212,175,55,0.25),' +
            '0 0 0 1px rgba(212,175,55,0.30)',
        }}
      />
      {/* Top sheen that brightens on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 opacity-60 transition-opacity duration-300 group-hover:opacity-90"
        style={{
          borderRadius: `${radius}px ${radius}px 0 0`,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)',
        }}
      />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  )

  const classes = cn(liquidGlass({ variant, size }), className)
  const style = { borderRadius: radius }

  if (href) {
    return (
      <a href={href} className={classes} style={style} {...props}>
        {inner}
      </a>
    )
  }
  return (
    <button className={classes} style={style} {...props}>
      {inner}
    </button>
  )
}

/**
 * GlassFilter — render ONCE near the root (e.g. in layout). Defines the SVG
 * turbulence/displacement filter that the buttons reference via backdrop-filter.
 */
export function GlassFilter() {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0" focusable="false">
      <defs>
        <filter id="aureum-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves={1} seed={4} result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation={2} result="softNoise" />
          <feDisplacementMap in="SourceGraphic" in2="softNoise" scale={42} xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </defs>
    </svg>
  )
}

import { motion } from 'framer-motion'
import { cardEntrance } from '../lib/utils'
import type { Coffee } from '../data/coffeeData'

interface CoffeeCardProps {
  coffee: Coffee
}

export default function CoffeeCard({ coffee }: CoffeeCardProps) {
  return (
    <motion.article
      variants={cardEntrance}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="relative group flex flex-col justify-between rounded-2xl p-6 overflow-hidden cursor-default"
      style={{
        background: 'rgba(26,16,8,0.7)',
        border: '1px solid rgba(193,127,69,0.12)',
        backdropFilter: 'blur(12px)',
        minHeight: '280px',
      }}
    >
      {/* ── Hover glow layer ──────────────────────────────────────────── */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 100%, ${coffee.accentColor}30 0%, transparent 70%)`,
        }}
      />

      {/* ── Border glow on hover ──────────────────────────────────────── */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px ${coffee.accentColor}40`,
        }}
      />

      {/* ── Top row: origin + intensity ──────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <span
          className="text-xs tracking-widest uppercase"
          style={{
            color: 'var(--color-coffee-accent)',
            fontFamily: 'var(--font-body)',
            opacity: 0.8,
          }}
        >
          {coffee.origin}
        </span>

        {/* Intensity dots */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              style={{
                width: '6px',
                height: '6px',
                background:
                  i < coffee.intensity
                    ? coffee.accentColor
                    : 'rgba(245,234,216,0.1)',
                boxShadow:
                  i < coffee.intensity
                    ? `0 0 6px ${coffee.accentColor}80`
                    : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Name ─────────────────────────────────────────────────────── */}
      <motion.h3
        variants={{
          rest: { y: 0 },
          hover: { y: -2 },
        }}
        transition={{ duration: 0.3 }}
        className="relative z-10 mb-3 leading-tight"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
          color: 'var(--color-cream-light)',
          fontWeight: 700,
        }}
      >
        {coffee.name}
      </motion.h3>

      {/* ── Description ──────────────────────────────────────────────── */}
      <p
        className="relative z-10 leading-relaxed flex-1 mb-5"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--color-cream-muted)',
          fontWeight: 300,
          lineHeight: '1.65',
        }}
      >
        {coffee.description}
      </p>

      {/* ── Tags ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {coffee.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs tracking-wide"
            style={{
              background: 'rgba(193,127,69,0.1)',
              border: '1px solid rgba(193,127,69,0.2)',
              color: 'var(--color-cream-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── Subtle top-left corner accent line ───────────────────────── */}
      <motion.div
        variants={{
          rest: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="absolute top-0 left-6 right-6 h-px origin-left"
        style={{ background: `linear-gradient(to right, ${coffee.accentColor}, transparent)` }}
      />
    </motion.article>
  )
}
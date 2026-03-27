import { Suspense, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, fadeIn } from '../lib/utils'

// Lazy import so Three.js doesn't block initial paint
import CoffeeCup3D from './CoffeeCup3d'

function CanvasFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ color: 'var(--color-coffee-warm)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', opacity: 0.5 }}
    >
      Loading 3D scene…
    </div>
  )
}

export default function FeaturedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden px-6 py-24"
      style={{ background: 'var(--color-coffee-dark)' }}
    >
      {/* ── Background glow ───────────────────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 55% 50%, rgba(124,74,45,0.22) 0%, transparent 70%)',
        }}
      />

      {/* ── Horizontal divider top ────────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: 'linear-gradient(to right, transparent, rgba(193,127,69,0.3), transparent)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── Left — text content ───────────────────────────────────────── */}
        <div className="flex flex-col justify-center order-2 lg:order-1">

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.1}
            className="mb-4 text-xs tracking-[0.3em] uppercase"
            style={{
              color: 'var(--color-coffee-accent)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Featured
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.2}
            className="mb-6 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              color: 'var(--color-cream-light)',
              fontWeight: 700,
            }}
          >
            The art of{' '}
            <em style={{ color: 'var(--color-coffee-accent)', fontStyle: 'italic' }}>
              the perfect cup.
            </em>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.32}
            className="mb-8 leading-relaxed max-w-md"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--color-cream-muted)',
              fontWeight: 300,
              lineHeight: '1.8',
            }}
          >
            Every element matters — the grind size, the water temperature, the pour angle.
            We obsess over the details so each cup is a small, perfect moment.
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.44}
            className="flex gap-10 mb-10"
          >
            {[
              { value: '93°C', label: 'Brew temp' },
              { value: '18g', label: 'Dose weight' },
              { value: '28s', label: 'Extraction' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.9rem',
                    color: 'var(--color-coffee-accent)',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {value}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--color-cream-muted)',
                    fontWeight: 300,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginTop: '6px',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={0.56}
          >
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(193,127,69,0.3)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="px-8 py-3.5 rounded-full text-sm font-medium tracking-wide cursor-pointer"
              style={{
                background: 'transparent',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.05em',
                border: '1px solid rgba(193,127,69,0.4)',
              }}
            >
              Learn our process →
            </motion.button>
          </motion.div>
        </div>

        {/* ── Right — 3D canvas ─────────────────────────────────────────── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          custom={0.3}
          className="order-1 lg:order-2 relative flex items-center justify-center"
          style={{ height: 'clamp(380px, 55vw, 580px)' }}
        >
          {/* Glow ring behind the 3D object */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 55%, rgba(193,127,69,0.18) 0%, transparent 65%)',
              filter: 'blur(32px)',
            }}
          />

          {/* Hint label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase pointer-events-none"
            style={{
              color: 'var(--color-cream-muted)',
              fontFamily: 'var(--font-body)',
              opacity: 0.4,
            }}
          >
            Drag to rotate
          </motion.p>

          <Suspense fallback={<CanvasFallback />}>
            <CoffeeCup3D />
          </Suspense>
        </motion.div>
      </div>

      {/* ── Bottom divider ────────────────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-px origin-right"
        style={{ background: 'linear-gradient(to left, transparent, rgba(193,127,69,0.3), transparent)' }}
      />
    </section>
  )
}
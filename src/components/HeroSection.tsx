import { motion } from 'framer-motion'
import { fadeUp, fadeIn, scaleIn } from '../lib/utils'
import RevealSection from './RevealSection'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">

      {/* ── Background radial glow ──────────────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0.2}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(124,74,45,0.28) 0%, transparent 70%)',
        }}
      />

      {/* ── Decorative horizontal rule ──────────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={0.4}
        className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-4 w-64 opacity-30"
      >
        <div className="h-px flex-1" style={{ background: 'var(--color-cream-muted)' }} />
        <span className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--color-cream-muted)', fontFamily: 'var(--font-body)' }}>
          Est. 2024
        </span>
        <div className="h-px flex-1" style={{ background: 'var(--color-cream-muted)' }} />
      </motion.div>

      {/* ── Main content ────────────────────────────────────────────────── */}
      <RevealSection margin="-150px" delay={0}>
        <div className="relative z-10 text-center max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="inline-flex items-center gap-2 mb-8 rounded-full border text-xs tracking-widest uppercase"
          style={{
            borderColor: 'rgba(193,127,69,0.35)',
            color: 'var(--color-coffee-accent)',
            background: 'rgba(193,127,69,0.08)',
            fontFamily: 'var(--font-body)',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '0.375rem',
            paddingBottom: '0.375rem',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-coffee-accent)' }} />
          Premium Coffee Experience
        </motion.div>

        {/* Headline — line 1 */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="leading-none tracking-tight mb-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.2rem, 9vw, 8rem)',
            color: 'var(--color-cream-light)',
            fontWeight: 900,
          }}
        >
          Crafted with
        </motion.h1>

        {/* Headline — line 2 (italic accent) */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="leading-none tracking-tight mb-8"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.2rem, 9vw, 8rem)',
            color: 'var(--color-coffee-accent)',
            fontWeight: 700,
            fontStyle: 'italic',
          }}
        >
          intention.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
          className="mb-12 leading-relaxed text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--color-cream-muted)',
            fontWeight: 300,
            maxWidth: '42rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          From single-origin pour overs to bold espresso blends — every cup is a
          deliberate act of craft. Discover flavours that demand your full attention.
        </motion.p>

        {/* CTA group */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.65}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(193,127,69,0.35)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-full text-sm font-medium tracking-wide cursor-pointer"
            style={{
              background: 'var(--color-coffee-accent)',
              color: 'var(--color-coffee-black)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.05em',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            }}
          >
            Explore the Menu
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-full text-sm font-medium tracking-wide border cursor-pointer"
            style={{
              borderColor: 'rgba(245,234,216,0.2)',
              color: 'var(--color-cream)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.05em',
              background: 'transparent',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
            }}
          >
            Our Story
          </motion.button>
        </motion.div>
        </div>
      </RevealSection>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={1.1}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-widest uppercase opacity-40"
          style={{ color: 'var(--color-cream-muted)', fontFamily: 'var(--font-body)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 origin-top"
          style={{ background: 'linear-gradient(to bottom, rgba(193,127,69,0.7), transparent)' }}
        />
      </motion.div>

      {/* ── Bottom vignette ─────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--color-coffee-black))',
        }}
      />
    </section>
  )
}
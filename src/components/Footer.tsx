import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  const columns = [
    {
      heading: 'Visit',
      items: ['Mon–Fri: 7am – 8pm', 'Sat–Sun: 8am – 6pm', '12 Roastery Lane, SF'],
    },
    {
      heading: 'Explore',
      items: ['The Menu', 'Our Process', 'Origin Stories', 'Brewing Guides'],
    },
    {
      heading: 'Connect',
      items: ['Instagram', 'Newsletter', 'Press', 'Wholesale'],
    },
  ]

  return (
    <footer
      ref={ref}
      className="relative px-6 py-20 overflow-hidden"
      style={{ background: 'var(--color-coffee-dark)', borderTop: '1px solid rgba(193,127,69,0.1)' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(44,26,14,0.6) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full flex justify-center">
        <div className="max-w-7xl w-full">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-1"
          >
            <div className="mb-4">
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'var(--color-cream-light)',
                  fontWeight: 700,
                }}
              >
                Noir
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'var(--color-coffee-accent)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                }}
              >
                {' '}& Brew
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--color-cream-muted)',
                fontWeight: 300,
                lineHeight: 1.7,
                opacity: 0.7,
                maxWidth: '200px',
              }}
            >
              Crafted with intention. Served with care. Every cup, a small ceremony.
            </p>
          </motion.div>

          {/* Link columns */}
          {columns.map((col, ci) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + ci * 0.1 }}
            >
              <p
                className="mb-4 text-xs tracking-widest uppercase"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-coffee-accent)',
                  opacity: 0.8,
                }}
              >
                {col.heading}
              </p>
              <ul className="space-y-2.5 list-none">
                {col.items.map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ color: 'var(--color-cream-light)', x: 3 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'var(--color-cream-muted)',
                        textDecoration: 'none',
                        fontWeight: 300,
                        opacity: 0.65,
                        display: 'inline-block',
                      }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="h-px mb-8 origin-left"
          style={{ background: 'linear-gradient(to right, rgba(193,127,69,0.3), transparent)' }}
        />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-cream-muted)',
              opacity: 0.35,
              letterSpacing: '0.06em',
            }}
          >
            © 2024 Noir & Brew. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--color-cream-muted)',
              opacity: 0.35,
              letterSpacing: '0.06em',
            }}
          >
            Roasted with love in San Francisco
          </p>
        </motion.div>
        </div>
      </div>
    </footer>
  )
}
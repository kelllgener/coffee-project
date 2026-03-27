import { motion, useScroll, useTransform } from 'framer-motion'

export default function Navbar() {
  const { scrollY } = useScroll()

  // Background opacity: transparent at top → frosted at scroll
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])

  const links = ['Menu', 'Our Story', 'Process', 'Visit Us']

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
    >
      {/* Frosted glass background — fades in on scroll */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bgOpacity,
          background: 'rgba(13,10,8,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      />

      {/* Bottom border — fades in on scroll */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          opacity: borderOpacity,
          background: 'linear-gradient(to right, transparent, rgba(193,127,69,0.25), transparent)',
        }}
      />

      <nav className="relative z-10 w-full flex items-center justify-center">
        <div className="max-w-7xl w-full flex items-center justify-between px-6">
          {/* Logo */}
          <motion.div
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ cursor: 'pointer' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-cream-light)',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}
            >
              Noir
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                color: 'var(--color-coffee-accent)',
                fontWeight: 400,
                fontStyle: 'italic',
              }}
            >
              {' '}& Brew
            </span>
          </motion.div>

          {/* Nav links — hidden on mobile */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {links.map((link) => (
              <li key={link}>
                <motion.a
                  href="#"
                  whileHover={{ color: 'var(--color-coffee-accent)' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--color-cream-muted)',
                    textDecoration: 'none',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                  }}
                >
                  {link}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(193,127,69,0.25)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-full text-xs tracking-widest uppercase cursor-pointer"
            style={{
              background: 'rgba(193,127,69,0.12)',
              border: '1px solid rgba(193,127,69,0.35)',
              color: 'var(--color-coffee-accent)',
              fontFamily: 'var(--font-body)',
              paddingLeft: '1.25rem',
              paddingRight: '1.25rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              marginTop: '2px',
              marginBottom: '2px',
            }}
          >
            Order Now
          </motion.button>
        </div>
      </nav>
    </motion.header>
  )
}
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const steps = [15, 35, 55, 72, 88, 100]
    let i = 0
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i])
        i++
        setTimeout(tick, 280 + Math.random() * 220)
      } else {
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 900)
        }, 400)
      }
    }
    setTimeout(tick, 200)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'var(--color-coffee-black)' }}
        >
          {/* Cup SVG with coffee fill animation */}
          <div className="relative mb-10" style={{ width: 64, height: 72 }}>
            <svg viewBox="0 0 64 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 64, height: 72 }}>
              {/* Cup outline */}
              <path
                d="M8 12 L56 12 L50 60 Q50 64 46 64 L18 64 Q14 64 14 60 Z"
                stroke="#c17f45"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
                opacity="0.4"
              />
              {/* Handle */}
              <path
                d="M50 24 Q64 24 64 36 Q64 48 50 48"
                stroke="#c17f45"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
              />
              {/* Rim line */}
              <line x1="8" y1="12" x2="56" y2="12" stroke="#c17f45" strokeWidth="2" opacity="0.6" />

              {/* Coffee fill — clip to cup shape */}
              <clipPath id="cupClip">
                <path d="M9 14 L55 14 L49.5 60 Q49.5 63 46 63 L18 63 Q14.5 63 14.5 60 Z" />
              </clipPath>
              <motion.rect
                x="8"
                y="14"
                width="48"
                height="50"
                fill="#7c4a2d"
                clipPath="url(#cupClip)"
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: progress / 100 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ transformOrigin: 'bottom' }}
              />

              {/* Steam lines */}
              {progress > 60 && (
                <>
                  <motion.path
                    d="M24 8 Q26 4 24 0"
                    stroke="#c8b89a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.5, pathLength: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.path
                    d="M32 6 Q34 2 32 0"
                    stroke="#c8b89a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.4, pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                  />
                  <motion.path
                    d="M40 8 Q42 4 40 0"
                    stroke="#c8b89a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 0.5, pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </>
              )}
            </svg>
          </div>

          {/* Brand name */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              color: 'var(--color-cream-light)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '2rem',
            }}
          >
            Noir & Brew
          </motion.p>

          {/* Progress bar */}
          <div
            style={{
              width: 180,
              height: 1,
              background: 'rgba(193,127,69,0.15)',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'var(--color-coffee-accent)',
                borderRadius: 1,
              }}
            />
          </div>

          {/* Progress number */}
          <motion.p
            animate={{ opacity: 1 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              color: 'var(--color-cream-muted)',
              opacity: 0.4,
              marginTop: '0.75rem',
              letterSpacing: '0.15em',
            }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
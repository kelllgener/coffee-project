import { motion } from 'framer-motion'
import { fadeIn } from '../lib/utils'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface RevealSectionProps {
  children: React.ReactNode
  margin?: string
  delay?: number
}

export default function RevealSection({ children, margin = '-80px', delay = 0 }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin })

  return (
    <motion.div
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

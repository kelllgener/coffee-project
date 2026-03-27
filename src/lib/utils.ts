import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Variants } from 'framer-motion'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── Fade up (used for hero text blocks) ────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
}

// ── Fade in (used for subtle overlays, images) ─────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 1.0, ease: 'easeOut', delay },
  }),
}

// ── Stagger container (wraps a list of children) ───────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

// ── Card entrance (used in coffee grid) ───────────────────────────────────
export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ── Slide in from left ─────────────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
}

// ── Scale in (for buttons, badges) ────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'backOut', delay },
  }),
}
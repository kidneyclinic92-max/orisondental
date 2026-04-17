import type { Variants } from 'framer-motion'

/** Smooth ease-out curve */
export const easeOutExpo = [0.22, 1, 0.36, 1] as const

export const defaultViewport = {
  once: true,
  amount: 0.2,
  margin: '-56px 0px',
} as const

/** Whole block fades up (simple sections) */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: easeOutExpo },
  },
}

/** Parent orchestrates stagger of direct children (header + grid row, etc.) */
export const sectionStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
}

/** Grid of cards: stagger each item */
export const gridStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
}

/** Single block fade-up (header line, card, etc.) */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOutExpo },
  },
}

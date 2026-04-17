import { motion, useReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { defaultViewport, sectionReveal } from '../motion/variants'

type Props = HTMLMotionProps<'section'>

export function MotionSection({ children, ...props }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.section
      variants={sectionReveal}
      initial={reduce ? 'visible' : 'hidden'}
      whileInView={reduce ? undefined : 'visible'}
      viewport={defaultViewport}
      {...props}
    >
      {children}
    </motion.section>
  )
}

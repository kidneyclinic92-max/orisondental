import { motion, useReducedMotion } from 'framer-motion'
import { CalendarPlus } from 'lucide-react'
import { AppointmentForm } from '../components/AppointmentForm'
import { CardIcon } from '../components/CardIcon'
import { useContent } from '../content/useContent'
import { defaultViewport, fadeUp, sectionStagger } from '../motion/variants'

export function BookPage() {
  const reduce = useReducedMotion()
  const { content } = useContent()
  const page = content.pages.book

  return (
    <main id="top">
      <section
        id="book"
        className="booking-section"
        aria-labelledby="book-heading"
      >
        <motion.div
          className="booking-wrap"
          variants={sectionStagger}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={defaultViewport}
        >
          <motion.div className="booking-aside" variants={fadeUp}>
            <CardIcon icon={CalendarPlus} />
            <h2 id="book-heading">{page.heading}</h2>
            <p>{page.intro}</p>
            <ul className="booking-list">
              {page.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeUp}>
            <AppointmentForm />
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}

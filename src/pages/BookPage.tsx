import { motion, useReducedMotion } from 'framer-motion'
import { CalendarPlus } from 'lucide-react'
import { AppointmentForm } from '../components/AppointmentForm'
import { CardIcon } from '../components/CardIcon'
import { defaultViewport, fadeUp, sectionStagger } from '../motion/variants'

export function BookPage() {
  const reduce = useReducedMotion()

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
            <h2 id="book-heading">Request an appointment</h2>
            <p>
              Share a few details and we will confirm by phone or email. Prefer
              to call? Reach us at <strong>(555) 014‑2290</strong> during
              office hours.
            </p>
            <ul className="booking-list">
              <li>Typical response within one business day</li>
              <li>Encrypted handling of your contact information</li>
              <li>Insurance and billing questions welcome in the notes field</li>
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

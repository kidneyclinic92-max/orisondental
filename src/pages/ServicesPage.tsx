import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pillars } from '../data/homeCards'
import {
  defaultViewport,
  fadeUp,
  gridStagger,
  sectionStagger,
} from '../motion/variants'

export function ServicesPage() {
  const reduce = useReducedMotion()

  return (
    <main id="top" className="services-page">
      <motion.section
        id="services"
        className="section"
        aria-labelledby="services-heading"
        variants={sectionStagger}
        initial={reduce ? 'visible' : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={defaultViewport}
      >
        <motion.header className="section-header" variants={fadeUp}>
          <h2 id="services-heading">Services</h2>
          <p>
            From braces to aligners and implant-based restoration, our care is
            designed to solve real dental concerns with practical treatment plans.
          </p>
        </motion.header>

        <motion.div className="home-ref-services-grid" variants={gridStagger}>
          {pillars.map((p) => (
            <motion.article
              key={p.title}
              className="home-ref-service-card"
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="home-ref-service-graphic">
                <img
                  src={p.imageSrc}
                  alt={p.imageAlt}
                  className="home-ref-service-image"
                  loading="lazy"
                />
              </div>
              <Link to="/book" className="home-ref-service-link">
                Book consultation <ArrowRight size={16} />
              </Link>
            </motion.article>
          ))}
        </motion.div>

      </motion.section>
    </main>
  )
}

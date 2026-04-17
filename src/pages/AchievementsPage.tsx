import { motion, useReducedMotion } from 'framer-motion'
import { achievements } from '../data/achievements'
import {
  defaultViewport,
  fadeUp,
  gridStagger,
  sectionStagger,
} from '../motion/variants'

export function AchievementsPage() {
  const reduce = useReducedMotion()

  return (
    <main id="top" className="achievements-page">
      <section
        id="achievements"
        className="achievements"
        aria-labelledby="achievements-heading"
      >
        <div className="achievements-ambient" aria-hidden="true">
          <span className="achievements-ambient-glow achievements-ambient-glow--a" />
          <span className="achievements-ambient-glow achievements-ambient-glow--b" />
          <span className="achievements-ambient-grid" />
        </div>

        <motion.div
          className="achievements-inner"
          variants={sectionStagger}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={defaultViewport}
        >
          <motion.header className="achievements-hero" variants={fadeUp}>
            <h2 id="achievements-heading" className="achievements-title">
              Awards and Achievements
            </h2>
            <p className="achievements-lede">
              A record built in the treatment room—not on a template. Metrics
              that reflect real outcomes, patient respect, and the standard we
              hold ourselves to every day.
            </p>
            <div className="achievements-hero-line" aria-hidden="true" />
          </motion.header>

          <motion.div className="achievements-showcase" variants={gridStagger}>
            {achievements.map((a, index) => (
              <motion.article
                key={a.title}
                className={`achievement-tile ${index === 0 ? 'achievement-tile--spotlight' : ''}`}
                variants={fadeUp}
                whileHover={
                  reduce
                    ? undefined
                    : { y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }
                }
              >
                <div className="achievement-tile-shine" aria-hidden="true" />
                <div className="achievement-tile-media">
                  <img src={a.imageSrc} alt={a.imageAlt} loading="lazy" />
                </div>
                <div className="achievement-tile-stat" aria-label={`Statistic: ${a.stat}`}>
                  {a.stat}
                </div>
                <h3 className="achievement-tile-heading">{a.title}</h3>
                <p className="achievement-tile-copy">{a.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}

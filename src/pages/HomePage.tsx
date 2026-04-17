import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  HeartPulse,
  Leaf,
  ScanSearch,
  ShieldCheck,
  SmilePlus,
  Sparkles,
  Stethoscope,
  Timer,
  UtensilsCrossed,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { MotionSection } from '../components/MotionSection'
import {
  fadeUp,
  gridStagger,
  heroContainer,
  heroItem,
} from '../motion/variants'

const HERO_VIDEO_SRC = '/assets/Dental_Surgery_Video_Generation.mp4'
const CLINIC_IMAGE = '/assets/homepage.png'

const servicePreview = [
  {
    Icon: Stethoscope,
    title: 'General Dentistry',
    text: 'Checkups, hygiene care, fillings, and routine treatment.',
  },
  {
    Icon: SmilePlus,
    title: 'Braces & Aligners',
    text: 'Orthodontic options to straighten teeth and improve your bite.',
  },
  {
    Icon: HeartPulse,
    title: 'Restorative Care',
    text: 'Crowns, implants, and treatments that restore function and confidence.',
  },
] as const

const trustPoints = [
  {
    Icon: Stethoscope,
    title: 'Experienced Team',
    text: 'Professional dentists focused on careful treatment and patient comfort.',
  },
  {
    Icon: ScanSearch,
    title: 'Modern Equipment',
    text: 'Digital diagnostics for more efficient assessment and planning.',
  },
  {
    Icon: ShieldCheck,
    title: 'Clean & Safe',
    text: 'Sterilized instruments and organized treatment spaces at every visit.',
  },
] as const

const dentalTips = [
  {
    Icon: Timer,
    title: 'Brush Twice Daily',
    text: 'Brush for at least two minutes in the morning and before bed using fluoride toothpaste.',
  },
  {
    Icon: Droplets,
    title: 'Floss Every Day',
    text: 'Flossing removes plaque and food particles from areas your toothbrush cannot reach.',
  },
  {
    Icon: UtensilsCrossed,
    title: 'Watch Your Diet',
    text: 'Limit sugary snacks and acidic drinks that can erode enamel and cause cavities.',
  },
  {
    Icon: Sparkles,
    title: 'Use Mouthwash',
    text: 'An antibacterial rinse helps reduce plaque, prevent gum disease, and freshen breath.',
  },
  {
    Icon: Leaf,
    title: 'Stay Hydrated',
    text: 'Drinking water throughout the day helps wash away bacteria and keeps your mouth moist.',
  },
  {
    Icon: Stethoscope,
    title: 'Visit Your Dentist',
    text: 'Schedule checkups every six months for professional cleaning and early issue detection.',
  },
] as const

const TOTAL = dentalTips.length

function getSignedOffset(index: number, current: number) {
  let diff = index - current
  const half = Math.floor(TOTAL / 2)

  if (diff > half) diff -= TOTAL
  if (diff < -half) diff += TOTAL

  return diff
}

function TipsCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent((value) => (value + 1) % TOTAL), 3000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <MotionSection
      className="home-tips"
      aria-labelledby="home-tips-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="home-tips-shell">
        <motion.header className="home-tips-header" variants={fadeUp}>
          <h2 id="home-tips-heading">Tips for a Healthier Smile</h2>
          <p>Simple daily habits that help protect your teeth and gums between visits.</p>
        </motion.header>

        <div className="c3d-scene">
          <div className="c3d-stage">
            {dentalTips.map((tip, i) => {
              const offset = getSignedOffset(i, current)
              const absOffset = Math.abs(offset)

              const pose =
                offset === 0
                  ? { x: 0, y: 30, scale: 1.08, rotateY: 0, opacity: 1, zIndex: 50 }
                  : offset === -1
                    ? { x: -260, y: 24, scale: 0.88, rotateY: -35, opacity: 0.92, zIndex: 40 }
                    : offset === 1
                      ? { x: 260, y: 24, scale: 0.88, rotateY: 35, opacity: 0.92, zIndex: 40 }
                      : offset === -2
                        ? { x: -185, y: -20, scale: 0.68, rotateY: 55, opacity: 0.45, zIndex: 20 }
                        : offset === 2
                          ? { x: 185, y: -20, scale: 0.68, rotateY: -55, opacity: 0.45, zIndex: 20 }
                          : { x: 0, y: -50, scale: 0.5, rotateY: 180, opacity: 0, zIndex: 5 }

              return (
                <motion.div
                  key={tip.title}
                  className={`c3d-card ${offset === 0 ? 'c3d-card--front' : ''} ${absOffset <= 2 ? 'c3d-card--visible' : ''}`}
                  initial={false}
                  animate={pose}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="c3d-card-icon">
                    <tip.Icon size={26} aria-hidden="true" />
                  </div>
                  <h3>{tip.title}</h3>
                  <p>{tip.text}</p>
                </motion.div>
              )
            })}
          </div>

          <div className="c3d-ground" aria-hidden="true" />
        </div>

        <div className="c3d-nav">
          <button
            className="c3d-btn"
            onClick={() => setCurrent((value) => (value - 1 + TOTAL) % TOTAL)}
            aria-label="Previous tip"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="c3d-dots">
            {dentalTips.map((t, i) => (
              <button
                key={t.title}
                className={`c3d-dot ${current === i ? 'c3d-dot--on' : ''}`}
                onClick={() => setCurrent(i)}
                aria-label={`Tip ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="c3d-btn"
            onClick={() => setCurrent((value) => (value + 1) % TOTAL)}
            aria-label="Next tip"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </MotionSection>
  )
}

export function HomePage() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 200])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <main id="top" className="home-premium">
      {/* ── Hero ── */}
      <section className="hero-outer home-premium-hero" aria-labelledby="hero-heading">
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay home-premium-hero-overlay" aria-hidden="true" />
        <div className="home-premium-gridlines" aria-hidden="true" />

        <motion.div
          className="home-premium-hero-shell"
          variants={heroContainer}
          initial={reduce ? false : 'hidden'}
          animate="visible"
          style={reduce ? undefined : { y: heroY, opacity: heroOpacity }}
        >
          <div className="home-premium-copy">

            <motion.h1 id="hero-heading" variants={heroItem}>
              Orison Dental Clinic
            </motion.h1>
            <motion.p className="hero-tagline home-premium-tagline" variants={heroItem}>
              Transform Your Smile with Expert Care
            </motion.p>

            <motion.div className="home-premium-actions" variants={heroItem}>
              <Link to="/book" className="btn btn-primary home-premium-cta">
                Book Consultation
              </Link>
              <Link to="/services" className="btn btn-secondary home-premium-link">
                Explore Services
              </Link>
            </motion.div>
          </div>

        </motion.div>
      </section>

      {/* ── About + image split ── */}
      <MotionSection className="home-split" aria-labelledby="home-svc-heading">
        <div className="home-split-shell">
          <motion.div
            className="home-split-media"
            variants={fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="home-split-accent" aria-hidden="true" />
            <div className="home-split-frame">
              <img
                src={CLINIC_IMAGE}
                alt="Modern dental treatment room at Orison Dental Clinic"
                className="home-split-img"
                loading="lazy"
              />
              <div className="home-split-caption">
                <Stethoscope size={16} aria-hidden="true" />
                <span>Orison Dental Clinic</span>
              </div>
            </div>
          </motion.div>

          <motion.div className="home-split-content" variants={gridStagger}>
            <motion.h2 id="home-svc-heading" variants={fadeUp}>
              Orison Dental and Implant Clinic
            </motion.h2>

            <motion.p className="home-about-text" variants={fadeUp}>
              A modern dental care provider dedicated to delivering high-quality, patient-focused
              treatments using advanced technology and expert care. The clinic specializes in
              creating healthy, confident smiles through a range of orthodontic and restorative
              solutions.
            </motion.p>
            <motion.p className="home-about-text" variants={fadeUp}>
              With a strong emphasis on comfort, precision, and personalized treatment, Orison
              offers a seamless and stress-free dental experience.
            </motion.p>

            <motion.div className="home-about-divider" variants={fadeUp} aria-hidden="true" />

            <motion.div className="home-svc-cards" variants={gridStagger}>
              {servicePreview.map((svc) => (
                <motion.div key={svc.title} className="home-svc-card" variants={fadeUp}>
                  <svc.Icon size={24} className="home-svc-card-icon" aria-hidden="true" />
                  <span>{svc.title}</span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </MotionSection>

      {/* ── Dental Tips 3D Carousel ── */}
      <TipsCarousel />

      {/* ── Trust strip ── */}
      <MotionSection className="home-trust" aria-labelledby="home-trust-heading">
        <h2 id="home-trust-heading" className="sr-only">Why choose Orison Dental</h2>
        <motion.div className="home-trust-shell" variants={gridStagger}>
          {trustPoints.map((tp, i) => (
            <motion.div key={tp.title} className="home-trust-item" variants={fadeUp}>
              <tp.Icon size={28} className="home-trust-icon" aria-hidden="true" />
              <h3>{tp.title}</h3>
              <p>{tp.text}</p>
              {i < trustPoints.length - 1 && (
                <span className="home-trust-divider" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* ── CTA ── */}
      <MotionSection className="home-cta-section" aria-labelledby="cta-heading">
        <div className="home-cta-panel">
          <motion.div className="home-cta-body" variants={fadeUp}>
            <h2 id="cta-heading">Ready to book your next visit?</h2>
            <p>Get in touch with our team to arrange a consultation or routine dental appointment.</p>
            <div className="home-cta-actions">
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.03 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                <Link to="/book" className="btn home-cta-button">
                  Schedule Your Consultation
                </Link>
              </motion.div>
              <span className="home-cta-hint">
                <CalendarCheck2 size={16} aria-hidden="true" />
                Quick and simple online booking
              </span>
            </div>
          </motion.div>
        </div>
      </MotionSection>
    </main>
  )
}

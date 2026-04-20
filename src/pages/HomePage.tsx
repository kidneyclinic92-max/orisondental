import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  ScanSearch,
  ShieldCheck,
  Stethoscope,
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
    img: '/assets/general_dentistry.png',
    title: 'General Dentistry',
    text: 'Checkups, hygiene care, fillings, and routine treatment.',
  },
  {
    img: '/assets/braces_aligners.png',
    title: 'Braces & Aligners',
    text: 'Orthodontic options to straighten teeth and improve your bite.',
  },
  {
    img: '/assets/restoration.png',
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
    title: 'Brush Twice Daily',
    text: 'Brush for at least two minutes in the morning and before bed using fluoride toothpaste.',
    imageSrc: '/assets/brushtwice.png',
    imageAlt: 'Person brushing teeth',
  },
  {
    title: 'Floss Every Day',
    text: 'Flossing removes plaque and food particles from areas your toothbrush cannot reach.',
    imageSrc: '/assets/floss.png',
    imageAlt: 'Dental floss close-up',
  },
  {
    title: 'Watch Your Diet',
    text: 'Limit sugary snacks and acidic drinks that can erode enamel and cause cavities.',
    imageSrc: '/assets/diet.png',
    imageAlt: 'Healthy smile-friendly foods',
  },
  {
    title: 'Use Mouthwash',
    text: 'An antibacterial rinse helps reduce plaque, prevent gum disease, and freshen breath.',
    imageSrc: '/assets/mouthwash.png',
    imageAlt: 'Mouthwash bottle and cup',
  },
  {
    title: 'Stay Hydrated',
    text: 'Drinking water throughout the day helps wash away bacteria and keeps your mouth moist.',
    imageSrc: '/assets/hydrated.png',
    imageAlt: 'Person drinking water',
  },
  {
    title: 'Visit Your Dentist',
    text: 'Schedule checkups every six months for professional cleaning and early issue detection.',
    imageSrc: '/assets/dentist.png',
    imageAlt: 'Dental checkup in clinic',
  },
] as const

const TOTAL = dentalTips.length

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

        <div className="tips-slider">
          <button
            className="tips-arrow"
            onClick={() => setCurrent((value) => (value - 1 + TOTAL) % TOTAL)}
            aria-label="Previous tip"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="tips-viewport">
            {[((current - 1 + TOTAL) % TOTAL), current, ((current + 1) % TOTAL)].map((idx, pos) => {
              const tip = dentalTips[idx]
              const isCenter = pos === 1
              return (
                <motion.article
                  key={`${tip.title}-${idx}-${current}`}
                  className={`tips-card ${isCenter ? 'tips-card--center' : 'tips-card--side'}`}
                  initial={{ opacity: 0, scale: 0.92, y: 8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.45,
                    scale: isCenter ? 1 : 0.82,
                    filter: isCenter ? 'blur(0px)' : 'blur(2.5px)',
                    y: isCenter ? -8 : 0,
                  }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="tips-card-img">
                    <img src={tip.imageSrc} alt={tip.imageAlt} loading="lazy" />
                  </div>
                  <h3>{tip.title}</h3>
                  <p>{tip.text}</p>
                </motion.article>
              )
            })}
          </div>

          <button
            className="tips-arrow"
            onClick={() => setCurrent((value) => (value + 1) % TOTAL)}
            aria-label="Next tip"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="tips-dots">
          {dentalTips.map((t, i) => (
            <button
              key={t.title}
              className={`tips-dot ${current === i ? 'tips-dot--on' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Tip ${i + 1}`}
            />
          ))}
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
                  <img src={svc.img} alt={svc.title} className="home-svc-card-img" loading="lazy" />
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

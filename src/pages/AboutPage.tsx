import { Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MotionSection } from '../components/MotionSection'

const PHONE_DISPLAY = '0336-001-1925'
const PHONE_HREF = 'tel:+923360011925'

const metrics = [
  {
    value: '150+',
    label: 'Patients cared for',
    hint: 'Trusted outcomes across routine and advanced treatment.',
  },
  {
    value: '15',
    label: 'Specialists on staff',
    hint: 'Orthodontics, surgery, and restorative expertise in one place.',
  },
] as const

const offerings = [
  {
    title: 'Braces for all ages',
    text: 'Customized orthodontic plans that align teeth and balance your bite with clarity at every step.',
  },
  {
    title: 'Clear aligners',
    text: 'Discreet, comfortable aligner therapy for confident smiles without traditional brackets.',
  },
  {
    title: 'Implants & restoration',
    text: 'Durable implant solutions and restorative work that feels natural and functions beautifully.',
  },
] as const

export function AboutPage() {
  return (
    <main id="top" className="about-page">
      <MotionSection
        id="about"
        className="about-hero"
        aria-labelledby="about-heading"
      >
        <div className="about-ambient" aria-hidden="true">
          <span className="about-ambient-glow about-ambient-glow--a" />
          <span className="about-ambient-glow about-ambient-glow--b" />
          <span className="about-ambient-grid" />
        </div>

        <div className="about-hero-inner">
          <h1 id="about-heading" className="about-hero-title">
            Where precision meets calm, confident care
          </h1>
          <p className="about-hero-lede">
            We combine advanced diagnostics, meticulous technique, and a patient-first mindset—so
            every visit feels considered, never rushed. Your oral health deserves a practice that
            treats detail as seriously as you do.
          </p>
          <div className="about-hero-line" aria-hidden="true" />
        </div>
      </MotionSection>

      <MotionSection className="about-metrics-section" aria-labelledby="about-stats-heading">
        <h2 id="about-stats-heading" className="visually-hidden">
          Clinic highlights
        </h2>
        <div className="about-metrics-grid">
          {metrics.map((m) => (
            <article key={m.label} className="about-metric-card">
              <div className="about-metric-shine" aria-hidden="true" />
              <p className="about-metric-value">{m.value}</p>
              <p className="about-metric-label">{m.label}</p>
              <p className="about-metric-hint">{m.hint}</p>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection
        className="about-offerings-section"
        aria-labelledby="about-services-heading"
      >
        <div className="about-offerings-head">
          <h2 id="about-services-heading" className="about-offerings-title">
            Clinical focus
          </h2>
          <p className="about-offerings-sub">
            Orthodontics, digital planning, and restorative excellence—built around your goals and
            your timeline.
          </p>
        </div>

        <div className="about-offerings-grid">
          {offerings.map(({ title, text }) => (
            <article key={title} className="about-offering-card">
              <h3 className="about-offering-title">{title}</h3>
              <p className="about-offering-text">{text}</p>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="about-cta-strip" aria-labelledby="about-cta-heading">
        <div className="about-cta-inner">
          <div className="about-cta-copy">
            <h2 id="about-cta-heading" className="about-cta-title">
              Ready when you are
            </h2>
            <p className="about-cta-lede">
              Call for a conversation, or book online—we’ll align the next step to your schedule.
            </p>
            <a href={PHONE_HREF} className="about-cta-phone-link">
              <Phone size={18} aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </div>
          <div className="about-cta-actions">
            <a href={PHONE_HREF} className="about-btn about-btn--ghost">
              Call now
            </a>
            <Link to="/book" className="about-btn about-btn--solid">
              Book consultation
            </Link>
          </div>
        </div>
      </MotionSection>
    </main>
  )
}

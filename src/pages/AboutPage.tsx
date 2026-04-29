import { Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MotionSection } from '../components/MotionSection'
import { useContent } from '../content/useContent'

export function AboutPage() {
  const { content } = useContent()
  const page = content.pages.about
  const { site } = content

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
            {page.heading}
          </h1>
          <p className="about-hero-lede">
            {page.intro}
          </p>
          <div className="about-hero-line" aria-hidden="true" />
        </div>
      </MotionSection>

      <MotionSection className="about-metrics-section" aria-labelledby="about-stats-heading">
        <h2 id="about-stats-heading" className="visually-hidden">
          Clinic highlights
        </h2>
        <div className="about-metrics-grid">
          {page.metrics.map((m) => (
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
            {page.offeringsHeading}
          </h2>
          <p className="about-offerings-sub">
            {page.offeringsIntro}
          </p>
        </div>

        <div className="about-offerings-grid">
          {page.offerings.map(({ title, text }) => (
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
              {page.ctaHeading}
            </h2>
            <p className="about-cta-lede">
              {page.ctaText}
            </p>
            <a href={site.phoneHref} className="about-cta-phone-link">
              <Phone size={18} aria-hidden />
              {site.phoneDisplay}
            </a>
          </div>
          <div className="about-cta-actions">
            <a href={site.phoneHref} className="about-btn about-btn--ghost">
              {page.ctaCallLabel}
            </a>
            <Link to={page.ctaBookPath} className="about-btn about-btn--solid">
              {page.ctaBookLabel}
            </Link>
          </div>
        </div>
      </MotionSection>
    </main>
  )
}

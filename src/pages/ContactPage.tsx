import { motion, useReducedMotion } from 'framer-motion'
import { CircleCheck, Mail, MapPin, Phone } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../content/ContentContext'
import { defaultViewport, fadeUp, sectionStagger } from '../motion/variants'

export function ContactPage() {
  const reduce = useReducedMotion()
  const { content } = useContent()
  const page = content.pages.contact
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setError(page.emailRequiredError)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(page.emailInvalidError)
      return
    }
    setError('')

    console.log('Contact inquiry', trimmed)
    setSent(true)
    setEmail('')
    window.setTimeout(() => setSent(false), 5000)
  }

  return (
    <main id="top" className="contact-shell">
      <section
        id="contact"
        className="contact-page"
        aria-labelledby="contact-heading"
      >
        <div className="contact-ambient" aria-hidden="true">
          <span className="contact-ambient-glow contact-ambient-glow--a" />
          <span className="contact-ambient-glow contact-ambient-glow--b" />
          <span className="contact-ambient-grid" />
        </div>

        <motion.div
          className="contact-inner"
          variants={sectionStagger}
          initial={reduce ? 'visible' : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={defaultViewport}
        >
          <motion.header className="contact-hero" variants={fadeUp}>
            <p className="contact-hero-kicker">{page.kicker}</p>
            <h1 id="contact-heading" className="contact-hero-title">
              {page.heading}
            </h1>
            <p className="contact-hero-lede">{page.intro}</p>
            <div className="contact-hero-line" aria-hidden="true" />
          </motion.header>

          <div className="contact-grid">
            <motion.aside className="contact-aside" variants={fadeUp}>
              <div className="contact-card">
                <div className="contact-card-head">
                  <span className="contact-card-icon" aria-hidden="true">
                    <Phone size={18} strokeWidth={1.75} />
                  </span>
                  <h2 className="contact-card-title">{page.cards[0]?.title ?? 'Phone'}</h2>
                </div>
                <a href={page.cards[0]?.href ?? '#'} className="contact-card-link">
                  {page.cards[0]?.value}
                </a>
                <p className="contact-card-hint">{page.cards[0]?.text}</p>
              </div>

              <div className="contact-card">
                <div className="contact-card-head">
                  <span className="contact-card-icon" aria-hidden="true">
                    <Mail size={18} strokeWidth={1.75} />
                  </span>
                  <h2 className="contact-card-title">{page.cards[1]?.title ?? 'Email'}</h2>
                </div>
                <p className="contact-card-text">{page.cards[1]?.text}</p>
              </div>

              <div className="contact-card contact-card--muted">
                <div className="contact-card-head">
                  <span className="contact-card-icon" aria-hidden="true">
                    <MapPin size={18} strokeWidth={1.75} />
                  </span>
                  <h2 className="contact-card-title">{page.cards[2]?.title ?? 'Practice'}</h2>
                </div>
                <p className="contact-card-text">{page.cards[2]?.text}</p>
              </div>

              <div className="contact-quick-actions">
                <a href={page.callNowPath} className="contact-btn contact-btn--ghost">
                  {page.callNowLabel}
                </a>
                <Link to={page.bookPath} className="contact-btn contact-btn--solid">
                  {page.bookLabel}
                </Link>
              </div>
            </motion.aside>

            <motion.div className="contact-form-column" variants={fadeUp}>
              {sent ? (
                <div className="contact-success" role="status">
                  <div className="contact-success-icon" aria-hidden="true">
                    <CircleCheck size={36} strokeWidth={1.6} />
                  </div>
                  <h2 className="contact-success-title">{page.successHeading}</h2>
                  <p className="contact-success-text">{page.successText}</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-header">
                    <p className="contact-form-label">{page.formLabel}</p>
                    <p className="contact-form-sub">{page.formSubheading}</p>
                  </div>

                  <div className="form-group contact-form-group">
                    <label htmlFor="contact-email">{page.emailLabel}</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder={page.emailPlaceholder}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                      }}
                      aria-invalid={!!error}
                    />
                    {error ? (
                      <p className="form-error contact-form-error" role="alert">
                        {error}
                      </p>
                    ) : null}
                  </div>

                  <button type="submit" className="contact-form-submit">
                    {page.submitLabel}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}

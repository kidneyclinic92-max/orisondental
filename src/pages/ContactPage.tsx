import { motion, useReducedMotion } from 'framer-motion'
import { CircleCheck, Mail, MapPin, Phone } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { defaultViewport, fadeUp, sectionStagger } from '../motion/variants'

const PHONE_DISPLAY = '0336-001-1925'
const PHONE_HREF = 'tel:+923360011925'

export function ContactPage() {
  const reduce = useReducedMotion()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Please enter your email address.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email address.')
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
            <p className="contact-hero-kicker">Orison Dental &amp; Implant Clinic</p>
            <h1 id="contact-heading" className="contact-hero-title">
              Let’s start a conversation
            </h1>
            <p className="contact-hero-lede">
              Questions about treatment, timing, or your first visit—reach out by phone or leave
              your email and we’ll respond with clear next steps.
            </p>
            <div className="contact-hero-line" aria-hidden="true" />
          </motion.header>

          <div className="contact-grid">
            <motion.aside className="contact-aside" variants={fadeUp}>
              <div className="contact-card">
                <div className="contact-card-head">
                  <span className="contact-card-icon" aria-hidden="true">
                    <Phone size={18} strokeWidth={1.75} />
                  </span>
                  <h2 className="contact-card-title">Phone</h2>
                </div>
                <a href={PHONE_HREF} className="contact-card-link">
                  {PHONE_DISPLAY}
                </a>
                <p className="contact-card-hint">Call during office hours for the fastest answer.</p>
              </div>

              <div className="contact-card">
                <div className="contact-card-head">
                  <span className="contact-card-icon" aria-hidden="true">
                    <Mail size={18} strokeWidth={1.75} />
                  </span>
                  <h2 className="contact-card-title">Email</h2>
                </div>
                <p className="contact-card-text">
                  Use the form — we monitor inquiries and reply as soon as we can.
                </p>
              </div>

              <div className="contact-card contact-card--muted">
                <div className="contact-card-head">
                  <span className="contact-card-icon" aria-hidden="true">
                    <MapPin size={18} strokeWidth={1.75} />
                  </span>
                  <h2 className="contact-card-title">Practice</h2>
                </div>
                <p className="contact-card-text">
                  Advanced diagnostics and restorative care in one calm, patient-focused setting.
                </p>
              </div>

              <div className="contact-quick-actions">
                <a href={PHONE_HREF} className="contact-btn contact-btn--ghost">
                  Call now
                </a>
                <Link to="/book" className="contact-btn contact-btn--solid">
                  Book consultation
                </Link>
              </div>
            </motion.aside>

            <motion.div className="contact-form-column" variants={fadeUp}>
              {sent ? (
                <div className="contact-success" role="status">
                  <div className="contact-success-icon" aria-hidden="true">
                    <CircleCheck size={36} strokeWidth={1.6} />
                  </div>
                  <h2 className="contact-success-title">Thank you</h2>
                  <p className="contact-success-text">
                    We’ve received your note and will be in touch soon.
                  </p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-header">
                    <p className="contact-form-label">Email inquiry</p>
                    <p className="contact-form-sub">
                      Share your address—we’ll follow up with scheduling or answers.
                    </p>
                  </div>

                  <div className="form-group contact-form-group">
                    <label htmlFor="contact-email">Your email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
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
                    Send message
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

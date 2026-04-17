import { motion, useReducedMotion } from 'framer-motion'
import { Link, Outlet } from 'react-router-dom'
import { sectionReveal } from '../motion/variants'

const LOGO_SRC = '/assets/logo.png'

const headerTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }

export function Layout() {
  const reduce = useReducedMotion()

  return (
    <div className="app">
      <motion.header
        className="header"
        initial={reduce ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={headerTransition}
      >
        <div className="header-inner">
          <Link to="/" className="logo logo--with-wordmark" title="Orison Dental Clinic">
            <img
              src={LOGO_SRC}
              alt=""
              className="logo-img"
              width={232}
              height={58}
              decoding="async"
            />
            <span className="logo-text">
              Orison <span className="logo-text-accent">Dental Clinic</span>
            </span>
          </Link>
          <nav className="nav nav-center" aria-label="Primary sections">
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/achievements">Achievements</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="header-cta">
            <Link to="/book" className="nav-cta">
              Book Consultation
            </Link>
          </div>
        </div>
      </motion.header>

      <Outlet />

      <motion.footer
        className="footer"
        variants={sectionReveal}
        initial={reduce ? 'visible' : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="footer-inner">
          <Link to="/" className="logo" title="Orison Dental Clinic">
            <img
              src={LOGO_SRC}
              alt="Orison Dental Clinic"
              className="logo-img logo-img--footer"
              width={232}
              height={58}
              decoding="async"
            />
          </Link>
          <div className="footer-aside">
            <p className="footer-line">1200 Wellness Blvd, Suite 200</p>
            <p className="footer-line">
              <a href="tel:+923360011925" className="footer-phone">
                0336-001-1925
              </a>
            </p>
            <nav className="footer-social" aria-label="Social media">
              <a
                href="https://www.facebook.com/"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden>
                  <path
                    fill="currentColor"
                    d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 5.996 4.388 10.963 10.125 11.854V15.47H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.458C19.612 23.037 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden>
                  <path
                    fill="currentColor"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.07-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                  />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden>
                  <path
                    fill="currentColor"
                    d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"
                  />
                </svg>
              </a>
              <a
                href="https://x.com/"
                className="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" width={22} height={22} aria-hidden>
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              </a>
            </nav>
            <p className="footer-line footer-line--muted">
              © {new Date().getFullYear()} Orison Dental Clinic. All rights
              reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

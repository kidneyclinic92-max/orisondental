import { Link } from 'react-router-dom'

const cards = [
  { title: 'Site Settings', desc: 'Brand, header links, footer, socials', path: '/admin/site' },
  { title: 'Home', desc: 'Hero, service previews, tips carousel, trust, CTA', path: '/admin/home' },
  { title: 'Services', desc: 'Intro and service cards', path: '/admin/services' },
  { title: 'Achievements', desc: 'Hero and achievement tiles', path: '/admin/achievements' },
  { title: 'About', desc: 'Hero, metrics, offerings, CTA', path: '/admin/about' },
  { title: 'Contact', desc: 'Hero, cards, inquiry form labels/messages', path: '/admin/contact' },
  { title: 'Book', desc: 'Booking intro, bullets, appointment form labels/options', path: '/admin/book' },
]

export function AdminDashboardPage() {
  return (
    <div className="admin-page">
      <h2>Content Dashboard</h2>
      <p>Select a page to edit. Changes are saved immediately to local storage.</p>
      <div className="admin-card-grid">
        {cards.map((card) => (
          <Link key={card.path} to={card.path} className="admin-card-link">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

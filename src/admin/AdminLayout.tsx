import { Link, NavLink, Outlet } from 'react-router-dom'
import { useContent } from '../content/ContentContext'
import { defaultContent } from '../content/defaultContent'
import { validateContent } from '../content/validation'

const links = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Site Settings', path: '/admin/site' },
  { label: 'Home', path: '/admin/home' },
  { label: 'Services', path: '/admin/services' },
  { label: 'Achievements', path: '/admin/achievements' },
  { label: 'About', path: '/admin/about' },
  { label: 'Contact', path: '/admin/contact' },
  { label: 'Book', path: '/admin/book' },
]

export function AdminLayout() {
  const { content, setContent, resetToDefault } = useContent()

  function handleExport() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'orison-content.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(evt: React.ChangeEvent<HTMLInputElement>) {
    const file = evt.target.files?.[0]
    if (!file) return
    file
      .text()
      .then((text) => {
        const next = JSON.parse(text)
        setContent({
          ...defaultContent,
          ...next,
          site: { ...defaultContent.site, ...next.site },
          pages: { ...defaultContent.pages, ...next.pages },
        })
      })
      .catch(() => {
        alert('Invalid JSON file.')
      })
  }

  const errors = validateContent(content)

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <h1>Admin Panel</h1>
        <nav className="admin-nav">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} end={link.path === '/admin'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link to="/" className="admin-back-link">
          Back to website
        </Link>
      </aside>

      <section className="admin-main">
        <header className="admin-toolbar">
          <div>
            <strong>Content status:</strong> {errors.length ? `${errors.length} validation issues` : 'Valid'}
          </div>
          <div className="admin-toolbar-actions">
            <label className="admin-btn">
              Import JSON
              <input type="file" accept="application/json" onChange={handleImport} hidden />
            </label>
            <button type="button" className="admin-btn" onClick={handleExport}>
              Export JSON
            </button>
            <button type="button" className="admin-btn admin-btn-danger" onClick={resetToDefault}>
              Reset default
            </button>
          </div>
        </header>

        {errors.length ? (
          <div className="admin-errors">
            {errors.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        ) : null}

        <Outlet />
      </section>
    </main>
  )
}

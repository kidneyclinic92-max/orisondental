import { JsonEditor, TextField, TextAreaField } from '../components/AdminFields'
import { useContent } from '../../content/ContentContext'

export function ServicesEditorPage() {
  const { content, updateContent } = useContent()
  const page = content.pages.services
  const setPage = (patch: Partial<typeof page>) =>
    updateContent((prev) => ({ ...prev, pages: { ...prev.pages, services: { ...prev.pages.services, ...patch } } }))

  return (
    <div className="admin-page">
      <h2>Services Editor</h2>
      <div className="admin-grid">
        <TextField label="Heading" value={page.heading} onChange={(value) => setPage({ heading: value })} />
        <TextField label="Card CTA label" value={page.cardCtaLabel} onChange={(value) => setPage({ cardCtaLabel: value })} />
        <TextField label="Card CTA path" value={page.cardCtaPath} onChange={(value) => setPage({ cardCtaPath: value })} />
      </div>
      <TextAreaField label="Intro text" value={page.intro} onChange={(value) => setPage({ intro: value })} />
      <JsonEditor label="Service cards" value={page.cards} onChange={(value) => setPage({ cards: value })} />
    </div>
  )
}

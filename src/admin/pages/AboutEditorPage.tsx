import { JsonEditor, TextAreaField, TextField } from '../components/AdminFields'
import { useContent } from '../../content/useContent'

export function AboutEditorPage() {
  const { content, updateContent } = useContent()
  const page = content.pages.about
  const setPage = (patch: Partial<typeof page>) =>
    updateContent((prev) => ({ ...prev, pages: { ...prev.pages, about: { ...prev.pages.about, ...patch } } }))

  return (
    <div className="admin-page">
      <h2>About Editor</h2>
      <div className="admin-grid">
        <TextField label="Hero heading" value={page.heading} onChange={(value) => setPage({ heading: value })} />
        <TextField
          label="Offerings heading"
          value={page.offeringsHeading}
          onChange={(value) => setPage({ offeringsHeading: value })}
        />
        <TextField label="CTA heading" value={page.ctaHeading} onChange={(value) => setPage({ ctaHeading: value })} />
        <TextField label="CTA call label" value={page.ctaCallLabel} onChange={(value) => setPage({ ctaCallLabel: value })} />
        <TextField label="CTA book label" value={page.ctaBookLabel} onChange={(value) => setPage({ ctaBookLabel: value })} />
        <TextField label="CTA book path" value={page.ctaBookPath} onChange={(value) => setPage({ ctaBookPath: value })} />
      </div>
      <TextAreaField label="Hero intro" value={page.intro} onChange={(value) => setPage({ intro: value })} />
      <TextAreaField
        label="Offerings intro"
        value={page.offeringsIntro}
        onChange={(value) => setPage({ offeringsIntro: value })}
      />
      <TextAreaField label="CTA text" value={page.ctaText} onChange={(value) => setPage({ ctaText: value })} />
      <JsonEditor label="Metrics" value={page.metrics} onChange={(value) => setPage({ metrics: value })} />
      <JsonEditor label="Offerings" value={page.offerings} onChange={(value) => setPage({ offerings: value })} />
    </div>
  )
}

import { JsonEditor, TextAreaField, TextField } from '../components/AdminFields'
import { useContent } from '../../content/useContent'

export function ContactEditorPage() {
  const { content, updateContent } = useContent()
  const page = content.pages.contact

  const setPage = (patch: Partial<typeof page>) =>
    updateContent((prev) => ({ ...prev, pages: { ...prev.pages, contact: { ...prev.pages.contact, ...patch } } }))

  return (
    <div className="admin-page">
      <h2>Contact Editor</h2>
      <div className="admin-grid">
        <TextField label="Kicker" value={page.kicker} onChange={(value) => setPage({ kicker: value })} />
        <TextField label="Heading" value={page.heading} onChange={(value) => setPage({ heading: value })} />
        <TextField label="Call now label" value={page.callNowLabel} onChange={(value) => setPage({ callNowLabel: value })} />
        <TextField label="Call now path" value={page.callNowPath} onChange={(value) => setPage({ callNowPath: value })} />
        <TextField label="Book label" value={page.bookLabel} onChange={(value) => setPage({ bookLabel: value })} />
        <TextField label="Book path" value={page.bookPath} onChange={(value) => setPage({ bookPath: value })} />
        <TextField label="Form label" value={page.formLabel} onChange={(value) => setPage({ formLabel: value })} />
        <TextField label="Email label" value={page.emailLabel} onChange={(value) => setPage({ emailLabel: value })} />
        <TextField
          label="Email placeholder"
          value={page.emailPlaceholder}
          onChange={(value) => setPage({ emailPlaceholder: value })}
        />
        <TextField label="Submit label" value={page.submitLabel} onChange={(value) => setPage({ submitLabel: value })} />
        <TextField
          label="Success heading"
          value={page.successHeading}
          onChange={(value) => setPage({ successHeading: value })}
        />
      </div>
      <TextAreaField label="Intro" value={page.intro} onChange={(value) => setPage({ intro: value })} />
      <TextAreaField
        label="Form subheading"
        value={page.formSubheading}
        onChange={(value) => setPage({ formSubheading: value })}
      />
      <TextAreaField
        label="Success text"
        value={page.successText}
        onChange={(value) => setPage({ successText: value })}
      />
      <TextField
        label="Email required error"
        value={page.emailRequiredError}
        onChange={(value) => setPage({ emailRequiredError: value })}
      />
      <TextField
        label="Email invalid error"
        value={page.emailInvalidError}
        onChange={(value) => setPage({ emailInvalidError: value })}
      />
      <JsonEditor label="Contact cards" value={page.cards} onChange={(value) => setPage({ cards: value })} />
    </div>
  )
}

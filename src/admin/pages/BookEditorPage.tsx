import { JsonEditor, TextAreaField, TextField } from '../components/AdminFields'
import { useContent } from '../../content/ContentContext'

export function BookEditorPage() {
  const { content, updateContent } = useContent()
  const page = content.pages.book

  const setPage = (patch: Partial<typeof page>) =>
    updateContent((prev) => ({ ...prev, pages: { ...prev.pages, book: { ...prev.pages.book, ...patch } } }))

  const setForm = (patch: Partial<typeof page.form>) =>
    updateContent((prev) => ({
      ...prev,
      pages: { ...prev.pages, book: { ...prev.pages.book, form: { ...prev.pages.book.form, ...patch } } },
    }))

  return (
    <div className="admin-page">
      <h2>Book Editor</h2>
      <div className="admin-grid">
        <TextField label="Heading" value={page.heading} onChange={(value) => setPage({ heading: value })} />
        <TextField
          label="Form title"
          value={page.form.title}
          onChange={(value) => setForm({ title: value })}
        />
        <TextField
          label="Submit label"
          value={page.form.submitLabel}
          onChange={(value) => setForm({ submitLabel: value })}
        />
        <TextField
          label="Success title"
          value={page.form.successTitle}
          onChange={(value) => setForm({ successTitle: value })}
        />
        <TextField
          label="Book another label"
          value={page.form.bookAnotherLabel}
          onChange={(value) => setForm({ bookAnotherLabel: value })}
        />
      </div>
      <TextAreaField label="Intro" value={page.intro} onChange={(value) => setPage({ intro: value })} />
      <TextAreaField
        label="Success text"
        value={page.form.successText}
        onChange={(value) => setForm({ successText: value })}
      />
      <JsonEditor label="Booking bullets" value={page.bullets} onChange={(value) => setPage({ bullets: value })} />
      <JsonEditor
        label="Form fields"
        value={page.form.fields}
        onChange={(value) => setForm({ fields: value })}
      />
      <JsonEditor
        label="Form validation messages"
        value={page.form.validation}
        onChange={(value) => setForm({ validation: value })}
      />
      <JsonEditor
        label="Service options"
        value={page.form.serviceOptions}
        onChange={(value) => setForm({ serviceOptions: value })}
      />
      <JsonEditor
        label="Time options"
        value={page.form.timeOptions}
        onChange={(value) => setForm({ timeOptions: value })}
      />
    </div>
  )
}

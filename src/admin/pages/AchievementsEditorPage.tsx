import { JsonEditor, TextAreaField, TextField } from '../components/AdminFields'
import { useContent } from '../../content/ContentContext'

export function AchievementsEditorPage() {
  const { content, updateContent } = useContent()
  const page = content.pages.achievements
  const setPage = (patch: Partial<typeof page>) =>
    updateContent((prev) => ({ ...prev, pages: { ...prev.pages, achievements: { ...prev.pages.achievements, ...patch } } }))

  return (
    <div className="admin-page">
      <h2>Achievements Editor</h2>
      <TextField label="Heading" value={page.heading} onChange={(value) => setPage({ heading: value })} />
      <TextAreaField label="Intro text" value={page.intro} onChange={(value) => setPage({ intro: value })} />
      <JsonEditor label="Achievement tiles" value={page.items} onChange={(value) => setPage({ items: value })} />
    </div>
  )
}

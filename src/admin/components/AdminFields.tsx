type InputProps = {
  label: string
  value: string
  onChange: (value: string) => void
}

export function TextField({ label, value, onChange }: InputProps) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

export function TextAreaField({ label, value, onChange }: InputProps) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  )
}

type JsonEditorProps<T> = {
  label: string
  value: T
  onChange: (value: T) => void
}

export function JsonEditor<T>({ label, value, onChange }: JsonEditorProps<T>) {
  return (
    <label className="admin-field">
      <span>{label} (JSON)</span>
      <textarea
        rows={12}
        value={JSON.stringify(value, null, 2)}
        onChange={(e) => {
          try {
            onChange(JSON.parse(e.target.value) as T)
          } catch {
            // keep editable while user types invalid JSON
          }
        }}
      />
    </label>
  )
}

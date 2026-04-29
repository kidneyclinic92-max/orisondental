import { CircleCheck, ClipboardList } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useContent } from '../content/useContent'
import { CardIcon } from './CardIcon'
import { addAppointment } from '../appointments/store'

const initial = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  service: '',
  notes: '',
}

export function AppointmentForm() {
  const { content } = useContent()
  const formContent = content.pages.book.form
  const [values, setValues] = useState(initial)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const next: Record<string, string> = {}
    if (!values.name.trim()) next.name = formContent.validation.nameRequired
    if (!values.email.trim()) next.email = formContent.validation.emailRequired
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = formContent.validation.emailInvalid
    if (!values.phone.trim()) next.phone = formContent.validation.phoneRequired
    if (!values.date) next.date = formContent.validation.dateRequired
    if (!values.service) next.service = formContent.validation.serviceRequired
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    console.log('Appointment request', values)
    addAppointment({
      name: values.name,
      email: values.email,
      phone: values.phone,
      date: values.date,
      time: values.time,
      service: values.service,
      notes: values.notes,
    })
    setSubmitted(true)
    setValues(initial)
  }

  if (submitted) {
    return (
      <div className="form-panel form-success" role="status">
        <CardIcon icon={CircleCheck} />
        <h3>{formContent.successTitle}</h3>
        <p>{formContent.successText}</p>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginTop: '1.25rem' }}
          onClick={() => setSubmitted(false)}
        >
          {formContent.bookAnotherLabel}
        </button>
      </div>
    )
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <CardIcon icon={ClipboardList} />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="appt-name">{formContent.fields.nameLabel}</label>
          <input
            id="appt-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            aria-invalid={!!errors.name}
          />
          {errors.name ? (
            <p className="form-error" role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="appt-email">{formContent.fields.emailLabel}</label>
          <input
            id="appt-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            aria-invalid={!!errors.email}
          />
          {errors.email ? (
            <p className="form-error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="appt-phone">{formContent.fields.phoneLabel}</label>
          <input
            id="appt-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            aria-invalid={!!errors.phone}
          />
          {errors.phone ? (
            <p className="form-error" role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="appt-service">{formContent.fields.serviceLabel}</label>
          <select
            id="appt-service"
            name="service"
            value={values.service}
            onChange={(e) =>
              setValues((v) => ({ ...v, service: e.target.value }))
            }
            aria-invalid={!!errors.service}
          >
            {formContent.serviceOptions.map((option, idx) => (
              <option key={`${option}-${idx}`} value={idx === 0 ? '' : option.toLowerCase().replace(/\s+/g, '-')}>
                {option}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p className="form-error" role="alert">
              {errors.service}
            </p>
          ) : null}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="appt-date">{formContent.fields.dateLabel}</label>
          <input
            id="appt-date"
            name="date"
            type="date"
            value={values.date}
            onChange={(e) => setValues((v) => ({ ...v, date: e.target.value }))}
            aria-invalid={!!errors.date}
          />
          {errors.date ? (
            <p className="form-error" role="alert">
              {errors.date}
            </p>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="appt-time">{formContent.fields.timeLabel}</label>
          <select
            id="appt-time"
            name="time"
            value={values.time}
            onChange={(e) => setValues((v) => ({ ...v, time: e.target.value }))}
          >
            {formContent.timeOptions.map((option, idx) => (
              <option key={`${option}-${idx}`} value={idx === 0 ? '' : option.toLowerCase().replace(/\s+/g, '-')}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="appt-notes">{formContent.fields.notesLabel}</label>
        <textarea
          id="appt-notes"
          name="notes"
          placeholder={formContent.fields.notesPlaceholder}
          value={values.notes}
          onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
        />
      </div>
      <button type="submit" className="btn btn-primary form-submit">
        {formContent.submitLabel}
      </button>
    </form>
  )
}

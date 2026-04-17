import { CircleCheck, ClipboardList } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { CardIcon } from './CardIcon'

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
  const [values, setValues] = useState(initial)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const next: Record<string, string> = {}
    if (!values.name.trim()) next.name = 'Please enter your name.'
    if (!values.email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = 'Enter a valid email address.'
    if (!values.phone.trim()) next.phone = 'Please enter a phone number.'
    if (!values.date) next.date = 'Choose a preferred date.'
    if (!values.service) next.service = 'Select a service or visit type.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    // Replace with your API, Formspree, or email integration.
    console.log('Appointment request', values)
    setSubmitted(true)
    setValues(initial)
  }

  if (submitted) {
    return (
      <div className="form-panel form-success" role="status">
        <CardIcon icon={CircleCheck} />
        <h3>Thank you</h3>
        <p>
          We have received your request. Our team will contact you shortly to
          confirm your appointment.
        </p>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ marginTop: '1.25rem' }}
          onClick={() => setSubmitted(false)}
        >
          Book another visit
        </button>
      </div>
    )
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit} noValidate>
      <CardIcon icon={ClipboardList} />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="appt-name">Full name</label>
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
          <label htmlFor="appt-email">Email</label>
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
          <label htmlFor="appt-phone">Phone</label>
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
          <label htmlFor="appt-service">Service / visit type</label>
          <select
            id="appt-service"
            name="service"
            value={values.service}
            onChange={(e) =>
              setValues((v) => ({ ...v, service: e.target.value }))
            }
            aria-invalid={!!errors.service}
          >
            <option value="">Select…</option>
            <option value="general">General consultation</option>
            <option value="preventive">Preventive care</option>
            <option value="followup">Follow-up visit</option>
            <option value="urgent">Urgent same-day</option>
            <option value="other">Other</option>
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
          <label htmlFor="appt-date">Preferred date</label>
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
          <label htmlFor="appt-time">Preferred time</label>
          <select
            id="appt-time"
            name="time"
            value={values.time}
            onChange={(e) => setValues((v) => ({ ...v, time: e.target.value }))}
          >
            <option value="">Flexible</option>
            <option value="morning">Morning (8–12)</option>
            <option value="afternoon">Afternoon (12–5)</option>
            <option value="evening">Evening (by arrangement)</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="appt-notes">Notes (optional)</label>
        <textarea
          id="appt-notes"
          name="notes"
          placeholder="Symptoms, questions, or accessibility needs"
          value={values.notes}
          onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
        />
      </div>
      <button type="submit" className="btn btn-primary form-submit">
        Request appointment
      </button>
    </form>
  )
}

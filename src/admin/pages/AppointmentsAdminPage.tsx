import { useMemo, useState } from 'react'
import { useContent } from '../../content/useContent'
import type { AppointmentRequest, AppointmentStatus } from '../../appointments/types'
import { loadAppointments, setAppointmentStatus } from '../../appointments/store'
import { sendAppointmentConfirmationEmail } from '../../appointments/email'
import { motion, useReducedMotion } from 'framer-motion'
import { CalendarCheck2, CircleCheck, X } from 'lucide-react'

type Filter = 'pending' | 'approved' | 'all'

function formatLocal(iso: string) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString()
}

export function AppointmentsAdminPage() {
  const reduce = useReducedMotion()
  const { content } = useContent()
  const clinicName = content.site.brandName

  const [filter, setFilter] = useState<Filter>('pending')
  const [reloadKey, setReloadKey] = useState(0)
  const [sendingId, setSendingId] = useState<string | null>(null)
  const [error, setError] = useState<string>('')

  const appointments = useMemo(() => {
    const list = loadAppointments()
    if (filter === 'all') return list
    const status: AppointmentStatus = filter
    return list.filter((a) => a.status === status)
  }, [filter, reloadKey])

  async function handleApprove(appt: AppointmentRequest) {
    setError('')
    setSendingId(appt.id)

    const updated = setAppointmentStatus(appt.id, { status: 'approved', approvedAt: new Date().toISOString() })
    if (!updated) {
      setSendingId(null)
      setError('Appointment not found.')
      return
    }

    const res = await sendAppointmentConfirmationEmail(updated, clinicName)
    setSendingId(null)

    if (!res.ok) {
      setError(res.error ?? 'Failed to send confirmation email.')
    }

    // Re-render from localStorage after status change.
    setReloadKey((k) => k + 1)
  }

  function handleReject(appt: AppointmentRequest) {
    setError('')
    setAppointmentStatus(appt.id, { status: 'rejected', rejectedAt: new Date().toISOString() })
    // After status change, simply switch filter to force re-render.
    setFilter('pending')
    setReloadKey((k) => k + 1)
  }

  return (
    <div className="admin-page">
      <h2>Appointments</h2>
      <p>Approve pending appointment requests. On approval, a confirmation email is sent to the patient.</p>

      <div className="admin-filter-row">
        <button type="button" className={`admin-chip ${filter === 'pending' ? 'is-active' : ''}`} onClick={() => setFilter('pending')}>
          Pending
        </button>
        <button type="button" className={`admin-chip ${filter === 'approved' ? 'is-active' : ''}`} onClick={() => setFilter('approved')}>
          Approved
        </button>
        <button type="button" className={`admin-chip ${filter === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('all')}>
          All
        </button>
      </div>

      {error ? (
        <div className="admin-errors" role="alert">
          <p>{error}</p>
        </div>
      ) : null}

      <div className="admin-appointments-grid">
        {appointments.length === 0 ? (
          <div className="admin-empty">
            <CalendarCheck2 size={22} />
            <p>No appointments for this filter.</p>
          </div>
        ) : (
          appointments.map((appt) => (
            <motion.article
              key={appt.id}
              className="admin-appointment-card"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="admin-appointment-top">
                <div>
                  <h3>
                    {appt.patientName} <span className="admin-appointment-email">({appt.email})</span>
                  </h3>
                  <p className="admin-appointment-meta">
                    {appt.service} • {appt.date} • {appt.time}
                  </p>
                  <p className="admin-appointment-created">Requested: {formatLocal(appt.createdAt)}</p>
                </div>
                <div className="admin-appointment-actions">
                  <button
                    type="button"
                    className="admin-btn admin-btn-solid"
                    disabled={sendingId === appt.id || appt.status !== 'pending'}
                    onClick={() => handleApprove(appt)}
                  >
                    {sendingId === appt.id ? 'Sending…' : 'Approve'}
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn-danger"
                    disabled={appt.status !== 'pending' || sendingId === appt.id}
                    onClick={() => handleReject(appt)}
                    aria-label="Reject appointment"
                  >
                    <X size={16} />
                    Reject
                  </button>
                </div>
              </div>

              {appt.notes ? <p className="admin-appointment-notes">Notes: {appt.notes}</p> : null}

              {appt.status === 'approved' ? (
                <div className="admin-appointment-badge admin-appointment-badge--ok">
                  <CircleCheck size={16} />
                  Approved
                </div>
              ) : null}
              {appt.status === 'rejected' ? (
                <div className="admin-appointment-badge admin-appointment-badge--bad">
                  <X size={16} />
                  Rejected
                </div>
              ) : null}
            </motion.article>
          ))
        )}
      </div>
    </div>
  )
}


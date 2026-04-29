import type { AppointmentInput, AppointmentRequest } from './types'

const STORAGE_KEY = 'orison_appointments_v1'

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function nowIso() {
  return new Date().toISOString()
}

function makeId() {
  // Prefer randomUUID when available.
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `appt_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

export function loadAppointments(): AppointmentRequest[] {
  const parsed = safeJsonParse<unknown>(window.localStorage.getItem(STORAGE_KEY))
  if (!parsed || !Array.isArray(parsed)) return []

  function isAppointmentLike(x: unknown): x is AppointmentRequest {
    if (!x || typeof x !== 'object') return false
    const a = x as Record<string, unknown>
    return (
      typeof a.id === 'string' &&
      typeof a.createdAt === 'string' &&
      typeof a.patientName === 'string' &&
      typeof a.email === 'string' &&
      typeof a.phone === 'string' &&
      typeof a.date === 'string' &&
      typeof a.time === 'string' &&
      typeof a.service === 'string' &&
      typeof a.notes === 'string'
    )
  }

  return parsed
    .filter(isAppointmentLike)
    .map((a) => ({
      ...a,
      status: (a.status ?? 'pending') as AppointmentRequest['status'],
    }))
}

export function saveAppointments(list: AppointmentRequest[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function addAppointment(input: AppointmentInput): AppointmentRequest {
  const list = loadAppointments()
  const created: AppointmentRequest = {
    id: makeId(),
    createdAt: nowIso(),
    status: 'pending',
    patientName: input.name,
    email: input.email,
    phone: input.phone,
    date: input.date,
    time: input.time,
    service: input.service,
    notes: input.notes,
  }
  list.push(created)
  // Keep newest first.
  list.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
  saveAppointments(list)
  return created
}

export function setAppointmentStatus(id: string, next: Partial<AppointmentRequest>) {
  const list = loadAppointments()
  const idx = list.findIndex((a) => a.id === id)
  if (idx < 0) return null
  const updated = { ...list[idx], ...next } as AppointmentRequest
  list[idx] = updated
  saveAppointments(list)
  return updated
}


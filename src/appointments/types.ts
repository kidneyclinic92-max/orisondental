export type AppointmentStatus = 'pending' | 'approved' | 'rejected'

export type AppointmentRequest = {
  id: string
  createdAt: string // ISO
  status: AppointmentStatus
  patientName: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  notes: string
  approvedAt?: string // ISO
  rejectedAt?: string // ISO
  adminMessage?: string
}

export type AppointmentInput = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  notes: string
}


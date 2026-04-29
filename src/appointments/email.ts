import type { AppointmentRequest } from './types'

export async function sendAppointmentConfirmationEmail(
  appointment: AppointmentRequest,
  clinicName: string,
): Promise<{ ok: boolean; error?: string }> {
  const endpoint = '/api/appointments/confirm'
  try {
    const resp = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clinicName, appointment }),
    })

    if (!resp.ok) {
      const text = await resp.text().catch(() => '')
      return {
        ok: false,
        error: text || `Email API failed with ${resp.status} at ${endpoint} (origin: ${window.location.origin})`,
      }
    }

    const data = (await resp.json().catch(() => null)) as { ok?: boolean; error?: string } | null
    if (data?.ok) return { ok: true }
    return { ok: false, error: data?.error ?? 'Failed to send confirmation email.' }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Failed to send email.' }
  }
}


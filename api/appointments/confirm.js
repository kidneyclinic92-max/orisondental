import nodemailer from 'nodemailer'

function getEnv(name) {
  return (process.env[name] ?? '').toString()
}

function setCorsHeaders(req, res) {
  const configured = getEnv('CORS_ORIGIN').trim()
  const allowed = configured
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  const requestOrigin = req.headers.origin ?? ''
  const allowOrigin =
    allowed.length === 0
      ? requestOrigin || '*'
      : allowed.includes(requestOrigin)
        ? requestOrigin
        : allowed[0]

  if (allowOrigin) {
    res.setHeader('Access-Control-Allow-Origin', allowOrigin)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function parseBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return {}
    }
  }
  return req.body
}

export default async function handler(req, res) {
  setCorsHeaders(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }

  const body = parseBody(req)
  const clinicName = body?.clinicName ?? 'Orison Dental Clinic'
  const appt = body?.appointment ?? body

  const to = appt?.email
  const patientName = appt?.patientName
  const date = appt?.date
  const time = appt?.time
  const service = appt?.service

  if (!to || !patientName || !date || !time || !service) {
    return res.status(400).json({ ok: false, error: 'Missing appointment fields.' })
  }

  const gmailUser = getEnv('GMAIL_USER').trim()
  const gmailPass = getEnv('GMAIL_APP_PASSWORD').replace(/\s+/g, '').trim()
  if (!gmailUser || !gmailPass) {
    return res.status(500).json({
      ok: false,
      error: 'Gmail is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.',
    })
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  })

  const subject = `Appointment confirmed - ${clinicName}`
  const text = [
    `Hello ${patientName},`,
    '',
    'Your appointment request has been approved.',
    `Clinic: ${clinicName}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Service: ${service}`,
    '',
    'If you have questions, reply to this email or contact the clinic.',
    '',
    `- ${clinicName}`,
  ].join('\n')

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;line-height:1.5">
      <p>Hello <strong>${patientName}</strong>,</p>
      <p>Your appointment request has been approved.</p>
      <p><strong>Clinic:</strong> ${clinicName}<br/>
         <strong>Date:</strong> ${date}<br/>
         <strong>Time:</strong> ${time}<br/>
         <strong>Service:</strong> ${service}
      </p>
      <p>If you have questions, reply to this email or contact the clinic.</p>
      <p>- ${clinicName}</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: gmailUser,
      to,
      subject,
      text,
      html,
    })
    return res.status(200).json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Email send failed.'
    return res.status(500).json({ ok: false, error: `Email send failed: ${message}` })
  }
}

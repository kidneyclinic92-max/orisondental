import express from 'express'
import nodemailer from 'nodemailer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const configuredCorsOrigin = getEnv('CORS_ORIGIN').trim()
const allowedOrigins = configuredCorsOrigin
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }),
)
app.use(express.json({ limit: '1mb' }))
const TROUBLESHOOTING = getEnv('API_TROUBLESHOOTING').toLowerCase() === 'true'

function getEnv(name) {
  return (process.env[name] ?? '').toString()
}

if (TROUBLESHOOTING) {
  app.use((req, _res, next) => {
    const stamp = new Date().toISOString()
    console.log(`[api-debug ${stamp}] ${req.method} ${req.originalUrl}`)
    next()
  })
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mode: 'node-server',
    troubleshooting: TROUBLESHOOTING,
    corsOrigin:
      allowedOrigins.length > 0 ? allowedOrigins : 'all-origins-allowed (set CORS_ORIGIN to restrict)',
    hasGmailUser: !!getEnv('GMAIL_USER').trim(),
    hasGmailPassword: !!getEnv('GMAIL_APP_PASSWORD').replace(/\s+/g, '').trim(),
  })
})

app.post('/api/appointments/confirm', async (req, res) => {
  const clinicName = req.body?.clinicName ?? 'Orison Dental Clinic'
  const appt = req.body?.appointment ?? req.body

  const to = appt?.email
  const patientName = appt?.patientName
  const date = appt?.date
  const time = appt?.time
  const service = appt?.service

  if (!to || !patientName || !date || !time || !service) {
    if (TROUBLESHOOTING) {
      console.log('[api-debug] Missing required appointment payload fields')
    }
    return res.status(400).json({ ok: false, error: 'Missing appointment fields.' })
  }

  const gmailUser = getEnv('GMAIL_USER').trim()
  const gmailPassRaw = getEnv('GMAIL_APP_PASSWORD')
  const gmailPass = gmailPassRaw.replace(/\s+/g, '').trim()

  if (!gmailUser || !gmailPass) {
    if (TROUBLESHOOTING) {
      console.log('[api-debug] Gmail env vars missing')
    }
    return res.status(500).json({
      ok: false,
      error: 'Gmail is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.',
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

  const subject = `Appointment confirmed — ${clinicName}`

  const text = [
    `Hello ${patientName},`,
    ``,
    `Your appointment request has been approved.`,
    `Clinic: ${clinicName}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Service: ${service}`,
    ``,
    `If you have questions, reply to this email or contact the clinic.`,
    ``,
    `— ${clinicName}`,
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
      <p>— ${clinicName}</p>
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
    if (TROUBLESHOOTING) {
      console.log(`[api-debug] Confirmation email sent to ${to}`)
    }
    return res.json({ ok: true })
  } catch (e) {
    if (TROUBLESHOOTING) {
      console.log('[api-debug] Email send failure:', e?.message ?? e)
    }
    return res.status(500).json({
      ok: false,
      error: e?.message ? `Email send failed: ${e.message}` : 'Email send failed.',
    })
  }
})

// Serve built React app
const distPath = path.join(__dirname, '../dist')
const indexPath = path.join(distPath, 'index.html')

app.use(express.static(distPath))

app.get('/{*any}', (req, res) => {
  res.sendFile(indexPath, (err) => {
    if (err) res.status(500).send('Failed to load app.')
  })
})

const port = Number(process.env.PORT ?? '3000')
app.listen(port, () => {
  console.log(`Admin/email server listening on port ${port}`)
})


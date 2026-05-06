import nodemailer from 'nodemailer'

function getEnv(name) {
  return (process.env[name] ?? '').toString()
}

function getSmtpCandidates(gmailUser, gmailPass) {
  const host = getEnv('SMTP_HOST').trim() || 'smtp.gmail.com'
  const explicitPort = Number(getEnv('SMTP_PORT').trim())
  const explicitSecure = getEnv('SMTP_SECURE').trim().toLowerCase()

  if (explicitPort) {
    const secure = explicitSecure ? explicitSecure === 'true' : explicitPort === 465
    return [
      {
        host,
        port: explicitPort,
        secure,
        requireTLS: !secure,
        auth: { user: gmailUser, pass: gmailPass },
      },
    ]
  }

  return [
    { host, port: 465, secure: true, auth: { user: gmailUser, pass: gmailPass } },
    { host, port: 587, secure: false, requireTLS: true, auth: { user: gmailUser, pass: gmailPass } },
  ]
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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-email-debug-token')
}

function canUseEmailDebug(req) {
  const token = getEnv('EMAIL_DEBUG_TOKEN').trim()
  if (!token) return false
  const headerToken = (req.headers['x-email-debug-token'] ?? '').toString().trim()
  const queryToken = (req.query?.token ?? '').toString().trim()
  return headerToken === token || queryToken === token
}

export default async function handler(req, res) {
  setCorsHeaders(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' })
  }
  if (!canUseEmailDebug(req)) {
    return res.status(403).json({
      ok: false,
      error: 'Forbidden. Set EMAIL_DEBUG_TOKEN and send it via x-email-debug-token header or ?token=.',
    })
  }

  const gmailUser = getEnv('GMAIL_USER').trim()
  const gmailPass = getEnv('GMAIL_APP_PASSWORD').replace(/\s+/g, '').trim()
  if (!gmailUser || !gmailPass) {
    return res.status(500).json({
      ok: false,
      error: 'Missing GMAIL_USER or GMAIL_APP_PASSWORD.',
    })
  }

  const smtpCandidates = getSmtpCandidates(gmailUser, gmailPass)
  const attempts = []

  for (const config of smtpCandidates) {
    const attempt = {
      host: config.host,
      port: config.port,
      secure: !!config.secure,
    }
    try {
      const transporter = nodemailer.createTransport(config)
      await transporter.verify()
      attempts.push({ ...attempt, ok: true })
      return res.status(200).json({ ok: true, attempts })
    } catch (error) {
      attempts.push({
        ...attempt,
        ok: false,
        error: {
          name: error?.name ?? null,
          message: error?.message ?? 'Unknown SMTP error',
          code: error?.code ?? null,
          responseCode: error?.responseCode ?? null,
          command: error?.command ?? null,
          response: error?.response ?? null,
        },
      })
    }
  }

  return res.status(500).json({ ok: false, attempts })
}

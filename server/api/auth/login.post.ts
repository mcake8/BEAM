import { loginSchema } from '~~/server/validation/auth'
import { adminSession } from '~~/server/utils/auth'
import { verifyAdminPassword } from '~~/server/services/auth'

defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Log in to the admin panel',
    responses: {
      200: {
        description: 'Logged in (session cookie set)',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/EmptyResponse' } } },
      },
      401: {
        description: 'Invalid password',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
      429: {
        description: 'Too many attempts',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
    },
    description: 'Verifies the password and sets a sealed HttpOnly session cookie.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['password'],
            properties: { password: { type: 'string' } },
          },
          example: { password: 'admin' },
        },
      },
    },
  },
})

// Simple in-memory brute-force guard (per IP).
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const attempts = new Map<string, { count: number; first: number }>()

export default defineApiHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  const now = Date.now()
  const rec = attempts.get(ip)
  if (rec && now - rec.first < WINDOW_MS && rec.count >= MAX_ATTEMPTS) {
    throw createError({ statusCode: 429, statusMessage: 'Too many attempts, try again later' })
  }

  const { password } = await readValidatedBody(event, (b) => loginSchema.parse(b))

  const ok = await verifyAdminPassword(password)
  if (!ok) {
    const r = rec && now - rec.first < WINDOW_MS ? rec : { count: 0, first: now }
    r.count++
    attempts.set(ip, r)
    throw createError({ statusCode: 401, statusMessage: 'Invalid password' })
  }

  attempts.delete(ip)
  const session = await adminSession(event)
  await session.update({ admin: true })
  return null
})

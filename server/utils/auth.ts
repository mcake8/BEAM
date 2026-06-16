import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { useSession, createError, type H3Event } from 'h3'

const scryptAsync = promisify(scrypt)
const KEYLEN = 64

// --- password hashing (node:crypto, no external deps) ---

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derived = (await scryptAsync(password, salt, KEYLEN)) as Buffer
  return `${salt}:${derived.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const derived = (await scryptAsync(password, salt, KEYLEN)) as Buffer
  const hashBuf = Buffer.from(hash, 'hex')
  if (hashBuf.length !== derived.length) return false
  return timingSafeEqual(hashBuf, derived)
}

// --- session (h3 sealed cookie, no external deps) ---

interface AdminSession {
  admin?: boolean
}

export function adminSession(event: H3Event) {
  const password = process.env.AUTH_SECRET
  if (!password || password.length < 32) {
    throw createError({
      statusCode: 500,
      statusMessage: 'AUTH_SECRET is not configured (min 32 chars)',
    })
  }
  return useSession<AdminSession>(event, {
    password,
    name: 'beam_session',
    maxAge: 60 * 60 * 24, // 24h
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  })
}

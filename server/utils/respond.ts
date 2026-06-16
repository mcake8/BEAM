import { defineEventHandler, createError, setResponseStatus, type H3Event } from 'h3'
import { adminSession } from './auth'

/** Wraps a successful payload in the standard { ok, data } response shape. */
export function ok<T>(data: T, meta?: Record<string, unknown>) {
  return meta ? { ok: true as const, data, meta } : { ok: true as const, data }
}

interface ApiHandlerOptions {
  /** Require a valid admin session; responds 401 otherwise. */
  admin?: boolean
}

/**
 * Wraps a route handler so that every response follows one shape:
 *   success -> { ok: true, data, meta? }
 *   error   -> { ok: false, error: { code, message } }
 * HTTP status codes stay meaningful. Optionally enforces an admin session.
 */
export function defineApiHandler<T>(
  handler: (event: H3Event) => T | Promise<T>,
  opts: ApiHandlerOptions = {},
) {
  return defineEventHandler(async (event) => {
    try {
      if (opts.admin) {
        const session = await adminSession(event)
        if (!session.data.admin) {
          throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }
      }
      const data = await handler(event)
      return ok(data)
    } catch (err) {
      const e = err as { statusCode?: number; statusMessage?: string; message?: string }
      const code = e.statusCode ?? 500
      if (code >= 500) console.error('[api error]', err)
      const message =
        code >= 500 ? 'Internal Server Error' : e.statusMessage || e.message || 'Error'
      setResponseStatus(event, code)
      return { ok: false as const, error: { code, message } }
    }
  })
}

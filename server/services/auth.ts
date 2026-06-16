import { db } from '~~/server/db'
import { admins } from '~~/server/db/schema'
import { verifyPassword } from '~~/server/utils/auth'

/** Returns true if the password matches any stored admin (scrypt). */
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const rows = await db.select().from(admins)
  for (const admin of rows) {
    if (await verifyPassword(password, admin.passwordHash)) {
      return true
    }
  }
  return false
}

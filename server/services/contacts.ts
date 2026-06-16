import { asc, eq } from 'drizzle-orm'
import { createError } from 'h3'
import { db } from '~~/server/db'
import { contacts } from '~~/server/db/schema'

type ContactInsert = typeof contacts.$inferInsert

export function listContacts() {
  return db.select().from(contacts).orderBy(asc(contacts.contactId))
}

export async function createContact(input: ContactInsert) {
  const [row] = await db.insert(contacts).values(input).returning()
  return row
}

export async function updateContact(id: number, patch: Partial<ContactInsert>) {
  const [row] = await db.update(contacts).set(patch).where(eq(contacts.contactId, id)).returning()
  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Contact not found' })
  }
  return row
}

export async function deleteContact(id: number) {
  const [row] = await db.delete(contacts).where(eq(contacts.contactId, id)).returning()
  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Contact not found' })
  }
  return { id }
}

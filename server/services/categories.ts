import { asc, eq, sql } from 'drizzle-orm'
import { createError } from 'h3'
import { db } from '~~/server/db'
import { categories, products } from '~~/server/db/schema'

type CategoryInsert = typeof categories.$inferInsert

export function listCategories() {
  return db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder), asc(categories.categoryId))
}

export async function createCategory(input: CategoryInsert) {
  const [row] = await db.insert(categories).values(input).returning()
  return row
}

export async function updateCategory(id: number, patch: Partial<CategoryInsert>) {
  const [row] = await db
    .update(categories)
    .set(patch)
    .where(eq(categories.categoryId, id))
    .returning()
  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }
  return row
}

export async function deleteCategory(id: number) {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(products)
    .where(eq(products.categoryId, id))
  if (count > 0) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Category has products and cannot be deleted',
    })
  }

  const [row] = await db.delete(categories).where(eq(categories.categoryId, id)).returning()
  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }
  return { id }
}

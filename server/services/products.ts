import { eq } from 'drizzle-orm'
import { createError } from 'h3'
import { db } from '~~/server/db'
import { products, categories } from '~~/server/db/schema'

type ProductInsert = typeof products.$inferInsert

async function assertCategoryExists(categoryId: number | null | undefined) {
  if (categoryId == null) return
  const [cat] = await db
    .select({ categoryId: categories.categoryId })
    .from(categories)
    .where(eq(categories.categoryId, categoryId))
  if (!cat) {
    throw createError({ statusCode: 400, statusMessage: 'categoryId does not exist' })
  }
}

export async function getProduct(id: number) {
  const [row] = await db.select().from(products).where(eq(products.productId, id))
  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return row
}

export async function createProduct(input: ProductInsert) {
  await assertCategoryExists(input.categoryId)
  const [row] = await db.insert(products).values(input).returning()
  return row
}

export async function updateProduct(id: number, patch: Partial<ProductInsert>) {
  await assertCategoryExists(patch.categoryId)
  const [row] = await db.update(products).set(patch).where(eq(products.productId, id)).returning()
  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return row
}

export async function deleteProduct(id: number) {
  const [row] = await db.delete(products).where(eq(products.productId, id)).returning()
  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return { id }
}

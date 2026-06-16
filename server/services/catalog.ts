import { asc } from 'drizzle-orm'
import { db } from '~~/server/db'
import { categories, products } from '~~/server/db/schema'
import type { ProductRow } from '~~/server/db/schema'
import type { CatalogItem } from '~~/shared/types'

/**
 * Builds the public catalog: a flat array interleaving each category with the
 * products belonging to it (Category, then its Products, then the next Category).
 * Products without an existing category are appended at the end.
 */
export async function buildCatalog(): Promise<CatalogItem[]> {
  const [cats, prods] = await Promise.all([
    db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.categoryId)),
    db.select().from(products).orderBy(asc(products.categoryId), asc(products.productId)),
  ])

  const catIds = new Set(cats.map((c) => c.categoryId))
  const byCategory = new Map<number, ProductRow[]>()
  const orphans: ProductRow[] = []

  for (const p of prods) {
    if (p.categoryId != null && catIds.has(p.categoryId)) {
      const list = byCategory.get(p.categoryId) ?? []
      list.push(p)
      byCategory.set(p.categoryId, list)
    } else {
      orphans.push(p)
    }
  }

  const toCatalogProduct = (p: ProductRow): CatalogItem => ({
    type: 'Product',
    productId: p.productId,
    label: p.label,
    price: p.price,
    previewImages: p.previewImages,
  })

  const result: CatalogItem[] = []
  for (const c of cats) {
    result.push({
      type: 'Category',
      categoryId: c.categoryId,
      label: c.label,
      images: c.images,
    })
    for (const p of byCategory.get(c.categoryId) ?? []) {
      result.push(toCatalogProduct(p))
    }
  }
  for (const p of orphans) {
    result.push(toCatalogProduct(p))
  }

  return result
}

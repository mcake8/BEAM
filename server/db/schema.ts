import { pgTable, serial, text, integer, jsonb, index } from 'drizzle-orm/pg-core'
import type { Image, Variation } from '~~/shared/types'

export const categories = pgTable('categories', {
  // JS property is `categoryId` (API shape); physical column stays `id`.
  categoryId: serial('id').primaryKey(),
  label: text('label').notNull(),
  images: jsonb('images').$type<Image[]>().notNull().default([]),
  sortOrder: integer('sort_order').notNull().default(0),
})

export const products = pgTable(
  'products',
  {
    // JS property is `productId` (API shape); physical column stays `id`.
    productId: serial('id').primaryKey(),
    label: text('label').notNull(),
    description: text('description'),
    comment: text('comment'),
    // preview price
    price: integer('price').notNull(),
    // nullable — a product may have no category. Deleting a category that still
    // has products is forbidden at the app level (409) and by FK restrict.
    categoryId: integer('category_id').references(() => categories.categoryId, {
      onDelete: 'restrict',
    }),
    previewImages: jsonb('preview_images').$type<Image[]>().notNull().default([]),
    variations: jsonb('variations').$type<Variation[]>().notNull().default([]),
  },
  (table) => [index('products_category_id_idx').on(table.categoryId)],
)

export const contacts = pgTable('contacts', {
  // JS property is `contactId` (API shape); physical column stays `id`.
  contactId: serial('id').primaryKey(),
  icon: jsonb('icon').$type<Image>(),
  label: text('label'),
  link: text('link').notNull(),
})

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  // scrypt hash stored as "salt:hash"
  passwordHash: text('password_hash').notNull(),
})

export type CategoryRow = typeof categories.$inferSelect
export type ProductRow = typeof products.$inferSelect
export type ContactRow = typeof contacts.$inferSelect
export type AdminRow = typeof admins.$inferSelect

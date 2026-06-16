import { drizzle } from 'drizzle-orm/postgres-js'
import { sql } from 'drizzle-orm'
import postgres from 'postgres'
import * as schema from './schema'
import { hashPassword } from '~~/server/utils/auth'

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

const client = postgres(connectionString, { max: 1 })
const db = drizzle(client, { schema })

const img = (alt: string): { src: string; alt: string } => ({
  src: 'https://placehold.co/600x400',
  alt,
})

async function seed() {
  // Reset everything (FK-safe order + identity reset).
  await db.execute(
    sql`TRUNCATE TABLE ${schema.products}, ${schema.categories}, ${schema.contacts}, ${schema.admins} RESTART IDENTITY CASCADE`,
  )

  // --- admin ---
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin'
  await db.insert(schema.admins).values({ passwordHash: await hashPassword(adminPassword) })

  // --- categories ---
  const [chairs, tables] = await db
    .insert(schema.categories)
    .values([
      { label: 'Стулья', images: [img('Стулья')], sortOrder: 1 },
      { label: 'Столы', images: [img('Столы')], sortOrder: 2 },
    ])
    .returning()

  // --- products ---
  await db.insert(schema.products).values([
    {
      label: 'Люнн',
      description:
        'Этот стул сочетает тёплую текстуру натурального дерева с лаконичным дизайном в духе минимализма.',
      comment: 'Нет в наличии, только на заказ',
      price: 1000,
      categoryId: chairs.categoryId,
      previewImages: [img('Люнн')],
      variations: [
        {
          id: 1,
          label: 'Без покрытия',
          price: 1000,
          colors: [{ id: 1, label: 'Белый', images: [img('Люнн белый')] }],
        },
      ],
    },
    {
      label: 'Осло',
      description: 'Удобный стул со спинкой.',
      comment: '',
      price: 1500,
      categoryId: chairs.categoryId,
      previewImages: [img('Осло')],
      variations: [],
    },
    {
      label: 'Берген',
      description: 'Обеденный стол из массива.',
      comment: '',
      price: 5000,
      categoryId: tables.categoryId,
      previewImages: [img('Берген')],
      variations: [],
    },
    // Orphan product (no category) — should appear at the end of getCatalog.
    {
      label: 'Без категории',
      description: 'Товар без категории для проверки каталога.',
      comment: '',
      price: 300,
      categoryId: null,
      previewImages: [img('Без категории')],
      variations: [],
    },
  ])

  // --- contacts ---
  await db.insert(schema.contacts).values([
    { icon: img('Telegram'), label: 'Telegram', link: 'https://t.me/beam' },
    { icon: img('Phone'), label: 'Телефон', link: 'tel:+70000000000' },
  ])

  console.log('✓ Seed complete')
}

seed()
  .then(() => client.end())
  .catch(async (err) => {
    console.error(err)
    await client.end()
    process.exit(1)
  })

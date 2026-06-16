import { z } from 'zod'
import { imageSchema, variationSchema } from './common'

export const productInputSchema = z.object({
  label: z.string().min(1),
  description: z.string().nullish(),
  comment: z.string().nullish(),
  price: z.number().int(),
  categoryId: z.number().int().nullable().default(null),
  previewImages: z.array(imageSchema).default([]),
  variations: z.array(variationSchema).default([]),
})

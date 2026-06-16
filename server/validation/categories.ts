import { z } from 'zod'
import { imageSchema } from './common'

export const categoryInputSchema = z.object({
  label: z.string().min(1),
  images: z.array(imageSchema).default([]),
  sortOrder: z.number().int().default(0),
})

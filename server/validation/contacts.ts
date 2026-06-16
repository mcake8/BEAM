import { z } from 'zod'
import { imageSchema } from './common'

export const contactInputSchema = z.object({
  icon: imageSchema.nullish(),
  label: z.string().nullish(),
  link: z.string().min(1),
})

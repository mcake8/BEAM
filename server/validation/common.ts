import { z } from 'zod'

export const imageSchema = z.object({
  src: z.string(),
  alt: z.string().default(''),
})

export const colorSchema = z.object({
  id: z.number().int(),
  label: z.string(),
  images: z.array(imageSchema).default([]),
})

export const variationSchema = z.object({
  id: z.number().int(),
  label: z.string(),
  price: z.number().int(),
  colors: z.array(colorSchema).default([]),
})

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
})

// Shared types — auto-imported by Nuxt 4 on both client and server (shared/).

export interface Image {
  src: string
  alt: string
}

export interface Color {
  id: number
  label: string
  images: Image[]
}

export interface Variation {
  id: number
  label: string
  price: number
  colors: Color[]
}

// Public catalog item — a flat list interleaving categories and their products.
export interface CatalogCategory {
  type: 'Category'
  categoryId: number
  label: string
  images: Image[]
}

export interface CatalogProduct {
  type: 'Product'
  productId: number
  label: string
  price: number
  previewImages: Image[]
}

export type CatalogItem = CatalogCategory | CatalogProduct

// --- API response shape ---

export interface ApiSuccess<T> {
  ok: true
  data: T
  meta?: Record<string, unknown>
}

export interface ApiError {
  ok: false
  error: { code: number; message: string }
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError

import { idParamSchema } from '~~/server/validation/common'
import { getProduct } from '~~/server/services/products'

defineRouteMeta({
  openAPI: {
    tags: ['Products'],
    summary: 'Get a product by id',
    responses: {
      200: {
        description: 'Product',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductResponse' } } },
      },
      404: {
        description: 'Product not found',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
    },
    description: 'Public. Returns the full product including variations.',
  },
})

export default defineApiHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (p) => idParamSchema.parse(p))
  return getProduct(id)
})

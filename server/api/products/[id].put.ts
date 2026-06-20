import { productInputSchema } from '~~/server/validation/products'
import { idParamSchema } from '~~/server/validation/common'
import { updateProduct } from '~~/server/services/products'

defineRouteMeta({
  openAPI: {
    tags: ['Products'],
    summary: 'Update a product (admin)',
    responses: {
      200: {
        description: 'Updated product',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductResponse' } } },
      },
      400: {
        description: 'categoryId does not exist',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
      404: {
        description: 'Product not found',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
    },
    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              label: { type: 'string' },
              description: { type: 'string', nullable: true },
              comment: { type: 'string', nullable: true },
              price: { type: 'integer' },
              categoryId: { type: 'integer', nullable: true },
              previewImages: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: { src: { type: 'string' }, alt: { type: 'string' } },
                },
              },
              variations: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer' },
                    label: { type: 'string' },
                    price: { type: 'integer' },
                    colors: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          label: { type: 'string' },
                          images: {
                            type: 'array',
                            items: {
                              type: 'object',
                              properties: { src: { type: 'string' }, alt: { type: 'string' } },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          example: { price: 1200 },
        },
      },
    },
  },
})

export default defineApiHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (p) => idParamSchema.parse(p))
  const body = await readValidatedBody(event, (b) => productInputSchema.partial().parse(b))
  return updateProduct(id, body)
}, { admin: true })

import { productInputSchema } from '~~/server/validation/products'
import { createProduct } from '~~/server/services/products'

defineRouteMeta({
  openAPI: {
    tags: ['Products'],
    summary: 'Create a product (admin)',
    responses: {
      201: {
        description: 'Created product',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ProductResponse' } } },
      },
      400: {
        description: 'categoryId does not exist',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
    },
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['label', 'price'],
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
          example: {
            label: 'Люнн',
            description: 'Минималистичный стул из натурального дерева.',
            comment: 'Нет в наличии, только на заказ',
            price: 1000,
            categoryId: 1,
            previewImages: [{ src: 'https://placehold.co/600x400', alt: 'Люнн' }],
            variations: [
              {
                id: 1,
                label: 'Без покрытия',
                price: 1000,
                colors: [
                  {
                    id: 1,
                    label: 'Белый',
                    images: [{ src: 'https://placehold.co/600x400', alt: 'Люнн белый' }],
                  },
                ],
              },
            ],
          },
        },
      },
    },
  },
})

export default defineApiHandler(async (event) => {
  const body = await readValidatedBody(event, (b) => productInputSchema.parse(b))
  setResponseStatus(event, 201)
  return createProduct(body)
}, { admin: true })

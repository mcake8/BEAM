import { categoryInputSchema } from '~~/server/validation/categories'
import { createCategory } from '~~/server/services/categories'

defineRouteMeta({
  openAPI: {
    tags: ['Categories'],
    summary: 'Create a category (admin)',
    responses: {
      201: {
        description: 'Created category',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryResponse' } } },
      },
    },
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['label'],
            properties: {
              label: { type: 'string' },
              images: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: { src: { type: 'string' }, alt: { type: 'string' } },
                },
              },
              sortOrder: { type: 'integer', default: 0 },
            },
          },
          example: {
            label: 'Стулья',
            images: [{ src: 'https://placehold.co/600x400', alt: 'Стулья' }],
            sortOrder: 1,
          },
        },
      },
    },
  },
})

export default defineApiHandler(async (event) => {
  const body = await readValidatedBody(event, (b) => categoryInputSchema.parse(b))
  setResponseStatus(event, 201)
  return createCategory(body)
}, { admin: true })

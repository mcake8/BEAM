import { categoryInputSchema } from '~~/server/validation/categories'
import { idParamSchema } from '~~/server/validation/common'
import { updateCategory } from '~~/server/services/categories'

defineRouteMeta({
  openAPI: {
    tags: ['Categories'],
    summary: 'Update a category (admin)',
    responses: {
      200: {
        description: 'Updated category',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryResponse' } } },
      },
      404: {
        description: 'Category not found',
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
              images: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: { src: { type: 'string' }, alt: { type: 'string' } },
                },
              },
              sortOrder: { type: 'integer' },
            },
          },
          example: { label: 'Стулья (обновлено)' },
        },
      },
    },
  },
})

export default defineApiHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (p) => idParamSchema.parse(p))
  const body = await readValidatedBody(event, (b) => categoryInputSchema.partial().parse(b))
  return updateCategory(id, body)
}, { admin: true })

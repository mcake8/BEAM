import { idParamSchema } from '~~/server/validation/common'
import { deleteCategory } from '~~/server/services/categories'

defineRouteMeta({
  openAPI: {
    tags: ['Categories'],
    summary: 'Delete a category (admin)',
    responses: {
      200: {
        description: 'Deleted',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/IdResponse' } } },
      },
      404: {
        description: 'Category not found',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
      409: {
        description: 'Category has products and cannot be deleted',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
    },
    description: 'Fails with 409 if the category still has products attached.',
  },
})

export default defineApiHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (p) => idParamSchema.parse(p))
  return deleteCategory(id)
}, { admin: true })

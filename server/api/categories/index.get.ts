import { listCategories } from '~~/server/services/categories'

defineRouteMeta({
  openAPI: {
    tags: ['Categories'],
    summary: 'List all categories',
    responses: {
      200: {
        description: 'List of categories',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/CategoryListResponse' } } },
      },
    },
    description: 'Public. Returns every category ordered by sortOrder, then id.',
  },
})

export default defineApiHandler(async () => {
  return listCategories()
})

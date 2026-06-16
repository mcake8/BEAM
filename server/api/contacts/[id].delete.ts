import { idParamSchema } from '~~/server/validation/common'
import { deleteContact } from '~~/server/services/contacts'

defineRouteMeta({
  openAPI: {
    tags: ['Contacts'],
    summary: 'Delete a contact (admin)',
    responses: {
      200: {
        description: 'Deleted',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/IdResponse' } } },
      },
      404: {
        description: 'Contact not found',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
    },
  },
})

export default defineApiHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (p) => idParamSchema.parse(p))
  return deleteContact(id)
}, { admin: true })

import { listContacts } from '~~/server/services/contacts'

defineRouteMeta({
  openAPI: {
    tags: ['Contacts'],
    summary: 'List all contacts',
    responses: {
      200: {
        description: 'List of contacts',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactListResponse' } } },
      },
    },
    description: 'Public. Returns every contact entry.',
  },
})

export default defineApiHandler(async () => {
  return listContacts()
})

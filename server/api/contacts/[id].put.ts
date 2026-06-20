import { contactInputSchema } from '~~/server/validation/contacts'
import { idParamSchema } from '~~/server/validation/common'
import { updateContact } from '~~/server/services/contacts'

defineRouteMeta({
  openAPI: {
    tags: ['Contacts'],
    summary: 'Update a contact (admin)',
    responses: {
      200: {
        description: 'Updated contact',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactResponse' } } },
      },
      404: {
        description: 'Contact not found',
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
              icon: {
                type: 'object',
                nullable: true,
                properties: { src: { type: 'string' }, alt: { type: 'string' } },
              },
              label: { type: 'string', nullable: true },
              link: { type: 'string' },
            },
          },
          example: { link: 'https://t.me/beam_official' },
        },
      },
    },
  },
})

export default defineApiHandler(async (event) => {
  const { id } = await getValidatedRouterParams(event, (p) => idParamSchema.parse(p))
  const body = await readValidatedBody(event, (b) => contactInputSchema.partial().parse(b))
  return updateContact(id, body)
}, { admin: true })

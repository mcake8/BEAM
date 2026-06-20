import { contactInputSchema } from '~~/server/validation/contacts'
import { createContact } from '~~/server/services/contacts'

defineRouteMeta({
  openAPI: {
    tags: ['Contacts'],
    summary: 'Create a contact (admin)',
    responses: {
      201: {
        description: 'Created contact',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ContactResponse' } } },
      },
    },
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['link'],
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
          example: {
            icon: { src: 'https://placehold.co/64x64', alt: 'Telegram' },
            label: 'Telegram',
            link: 'https://t.me/beam',
          },
        },
      },
    },
  },
})

export default defineApiHandler(async (event) => {
  const body = await readValidatedBody(event, (b) => contactInputSchema.parse(b))
  setResponseStatus(event, 201)
  return createContact(body)
}, { admin: true })

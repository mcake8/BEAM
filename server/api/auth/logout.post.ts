import { adminSession } from '~~/server/utils/auth'

defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Log out of the admin panel',
    responses: {
      200: {
        description: 'Logged out',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/EmptyResponse' } } },
      },
    },
    description: 'Clears the session cookie.',
  },
})

export default defineApiHandler(async (event) => {
  const session = await adminSession(event)
  await session.clear()
  return null
})

import { uploadFile } from '~~/server/utils/s3'

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]
const MAX_BYTES = 10 * 1024 * 1024 // 10 MB

defineRouteMeta({
  openAPI: {
    tags: ['Media'],
    summary: 'Upload an image (admin)',
    responses: {
      200: {
        description: 'Uploaded image',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/UploadResponse' } } },
      },
      400: {
        description: 'Missing or invalid file field',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
      413: {
        description: 'File too large',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
      415: {
        description: 'Unsupported image type',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
      },
    },
    description:
      'Returns { src, alt } — put `src` into previewImages / category.images / variations[].colors[].images.',
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            required: ['file'],
            properties: {
              file: { type: 'string', format: 'binary' },
              alt: { type: 'string' },
            },
          },
        },
      },
    },
  },
})

export default defineApiHandler(async (event) => {
  const form = await readMultipartFormData(event)
  if (!form) {
    throw createError({ statusCode: 400, statusMessage: 'Expected multipart/form-data' })
  }

  const file = form.find((part) => part.name === 'file' && part.filename)
  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'Missing "file" field' })
  }

  const type = file.type || 'application/octet-stream'
  if (!ALLOWED_TYPES.includes(type)) {
    throw createError({ statusCode: 415, statusMessage: `Unsupported image type: ${type}` })
  }
  if (file.data.length > MAX_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'File too large (max 10 MB)' })
  }

  const altPart = form.find((part) => part.name === 'alt' && !part.filename)
  const alt = altPart ? altPart.data.toString('utf-8') : file.filename || ''

  const src = await uploadFile(file.data, type, file.filename || 'upload')
  return { src, alt }
}, { admin: true })

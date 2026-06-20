import { buildCatalog } from '~~/server/services/catalog'

defineRouteMeta({
  openAPI: {
    tags: ['Catalog'],
    summary: 'Get the full catalog',
    description:
      'Public. Flat array interleaving each category with its products (Category, then its Products, then the next Category). Products without a category come last.',
    responses: {
      200: {
        description: 'Flat catalog list',
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/CatalogResponse' } },
        },
      },
    },
    // Central registry of reusable schemas — merged into the root document's
    // components so every route can reference them via $ref.
    $global: {
      components: {
        schemas: {
          Image: {
            type: 'object',
            properties: { src: { type: 'string' }, alt: { type: 'string' } },
          },
          Color: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              label: { type: 'string' },
              images: { type: 'array', items: { $ref: '#/components/schemas/Image' } },
            },
          },
          Variation: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              label: { type: 'string' },
              price: { type: 'integer' },
              colors: { type: 'array', items: { $ref: '#/components/schemas/Color' } },
            },
          },
          Category: {
            type: 'object',
            properties: {
              categoryId: { type: 'integer' },
              label: { type: 'string' },
              images: { type: 'array', items: { $ref: '#/components/schemas/Image' } },
              sortOrder: { type: 'integer' },
            },
          },
          Product: {
            type: 'object',
            properties: {
              productId: { type: 'integer' },
              label: { type: 'string' },
              description: { type: 'string', nullable: true },
              comment: { type: 'string', nullable: true },
              price: { type: 'integer' },
              categoryId: { type: 'integer', nullable: true },
              previewImages: { type: 'array', items: { $ref: '#/components/schemas/Image' } },
              variations: { type: 'array', items: { $ref: '#/components/schemas/Variation' } },
            },
          },
          Contact: {
            type: 'object',
            properties: {
              contactId: { type: 'integer' },
              icon: { $ref: '#/components/schemas/Image' },
              label: { type: 'string', nullable: true },
              link: { type: 'string' },
            },
          },
          CatalogCategory: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['Category'] },
              categoryId: { type: 'integer' },
              label: { type: 'string' },
              images: { type: 'array', items: { $ref: '#/components/schemas/Image' } },
            },
          },
          CatalogProduct: {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['Product'] },
              productId: { type: 'integer' },
              label: { type: 'string' },
              price: { type: 'integer' },
              previewImages: { type: 'array', items: { $ref: '#/components/schemas/Image' } },
            },
          },
          Upload: {
            type: 'object',
            properties: { src: { type: 'string' }, alt: { type: 'string' } },
          },
          ApiError: {
            type: 'object',
            properties: {
              ok: { type: 'boolean' },
              error: {
                type: 'object',
                properties: { code: { type: 'integer' }, message: { type: 'string' } },
              },
            },
          },
          CategoryResponse: {
            type: 'object',
            properties: { ok: { type: 'boolean' }, data: { $ref: '#/components/schemas/Category' } },
          },
          CategoryListResponse: {
            type: 'object',
            properties: {
              ok: { type: 'boolean' },
              data: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
            },
          },
          ProductResponse: {
            type: 'object',
            properties: { ok: { type: 'boolean' }, data: { $ref: '#/components/schemas/Product' } },
          },
          ContactResponse: {
            type: 'object',
            properties: { ok: { type: 'boolean' }, data: { $ref: '#/components/schemas/Contact' } },
          },
          ContactListResponse: {
            type: 'object',
            properties: {
              ok: { type: 'boolean' },
              data: { type: 'array', items: { $ref: '#/components/schemas/Contact' } },
            },
          },
          CatalogResponse: {
            type: 'object',
            properties: {
              ok: { type: 'boolean' },
              data: {
                type: 'array',
                items: {
                  oneOf: [
                    { $ref: '#/components/schemas/CatalogCategory' },
                    { $ref: '#/components/schemas/CatalogProduct' },
                  ],
                },
              },
            },
          },
          IdResponse: {
            type: 'object',
            properties: {
              ok: { type: 'boolean' },
              data: { type: 'object', properties: { id: { type: 'integer' } } },
            },
          },
          UploadResponse: {
            type: 'object',
            properties: { ok: { type: 'boolean' }, data: { $ref: '#/components/schemas/Upload' } },
          },
          EmptyResponse: {
            type: 'object',
            properties: { ok: { type: 'boolean' }, data: { type: 'object', nullable: true } },
          },
        },
      },
    },
  },
})

export default defineApiHandler(async () => {
  return buildCatalog()
})

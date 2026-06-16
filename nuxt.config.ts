// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Server-only secrets. Values are read from matching env vars at runtime
  // (NUXT_DATABASE_URL, NUXT_AUTH_SECRET, ...). The `.env` keys below also work
  // directly because they are referenced via process.env in server utils.
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || '',
    authSecret: process.env.AUTH_SECRET || '',
    s3Endpoint: process.env.S3_ENDPOINT || '',
    s3PublicUrl: process.env.S3_PUBLIC_URL || '',
    s3Bucket: process.env.S3_BUCKET || '',
    s3AccessKey: process.env.S3_ACCESS_KEY || '',
    s3SecretKey: process.env.S3_SECRET_KEY || '',
  },

  nitro: {
    // Native Nitro OpenAPI: serves /_openapi.json, /_scalar and /_swagger.
    experimental: {
      openAPI: true,
    },
    openAPI: {
      meta: {
        title: 'BEAM Catalog API',
        description: 'Public catalog endpoints and admin CRUD for the BEAM furniture store.',
        version: '1.0.0',
      },
    },
  },
})

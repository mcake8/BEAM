export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	modules: ['@nuxt/eslint'],

	app: {
		head: {
			link: [
				{
					rel: 'preload',
					as: 'font',
					type: 'font/woff2',
					href: '/fonts/GeistMono-Regular.woff2',
					crossorigin: 'anonymous'
				},
				{
					rel: 'preload',
					as: 'font',
					type: 'font/woff2',
					href: '/fonts/GeistMono-Bold.woff2',
					crossorigin: 'anonymous'
				},
				{
					rel: 'preload',
					as: 'font',
					type: 'font/woff2',
					href: '/fonts/Liter-Regular.woff2',
					crossorigin: 'anonymous'
				}
			]
		}
	},

	css: [
		'~/assets/styles/normalize.css',
		'~/assets/styles/fonts.scss',
		'~/assets/styles/global.scss',
		'~/assets/styles/utils.scss',
		'~/assets/styles/variables.scss',
		'~/assets/styles/grid.scss',
	],

	vite: {
		css: {
			preprocessorMaxWorkers: true,
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/styles/helpers/index.scss" as *;',
				},
			},
		},
	},

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
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
		'~/assets/styles/grid.scss'
	],

	vite: {
		css: {
			preprocessorMaxWorkers: true,
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/styles/helpers/index.scss" as *;'
				}
			}
		}
	}
})

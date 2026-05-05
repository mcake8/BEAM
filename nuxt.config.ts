export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },

	modules: ['@nuxt/eslint'],

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
			preprocessorOptions: {
				scss: {
					additionalData: '@use "~/assets/styles/helpers/index.scss" as *;'
				}
			}
		}
	}
})

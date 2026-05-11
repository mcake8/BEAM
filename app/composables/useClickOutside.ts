import type { ComponentPublicInstance } from 'vue'

export const useClickOutside = (
	elementRef: Ref<HTMLElement | ComponentPublicInstance | null>,
	callback: () => void
) => {
	const getEl = (): HTMLElement | null => {
		if (!elementRef.value) return null
		if (elementRef.value instanceof HTMLElement) return elementRef.value
		return (elementRef.value as ComponentPublicInstance).$el ?? null
	}

	const handleClick = (event: MouseEvent) => {
		const el = getEl()
		if (el && !el.contains(event.target as Node)) {
			callback()
		}
	}

	const handleEsc = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			callback()
		}
	}

	onMounted(() => {
		document.addEventListener('click', handleClick)
		document.addEventListener('keydown', handleEsc)
	})

	onUnmounted(() => {
		document.removeEventListener('click', handleClick)
		document.removeEventListener('keydown', handleEsc)
	})
}

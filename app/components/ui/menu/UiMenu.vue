<template>
	<Transition name="menu">
		<div
			v-if="isOpen && anchor"
			ref="menuRef"
			class="ui-menu"
			:style="styles"
		>
			<ul class="ui-menu__list">
				<slot />
			</ul>
		</div>
	</Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
	isOpen: boolean
	anchor: HTMLElement | ComponentPublicInstance | null
}>()

const menuRef = ref<HTMLElement | null>(null)

defineExpose({
	el: menuRef
})

const styles = ref<Record<string, string>>({})

const updatePosition = () => {
	if (!props.anchor || !menuRef.value) return

	const el =
		props.anchor instanceof HTMLElement
			? props.anchor
			: (props.anchor as ComponentPublicInstance).$el

	const rect = el.getBoundingClientRect()
	const menuEl = menuRef.value

	const menuWidth = menuEl.offsetWidth

	const offset = 4

	// Выравнивание по правому краю
	let left = rect.right - menuWidth

	// Если вылезает за левый край - выравниваем по левому краю
	if (left < 0) {
		left = rect.left
	}

	// Если вылезает за правый край экрана - прижимаем к правому краю
	const viewportWidth = window.innerWidth
	if (left + menuWidth > viewportWidth) {
		left = viewportWidth - menuWidth - offset
	}

	styles.value = {
		left: `${left}px`,
		top: `${rect.bottom + offset}px`
	}
}

watch([() => props.isOpen, () => props.anchor], async ([open]) => {
	if (!open) return
	await nextTick()
	requestAnimationFrame(updatePosition)
})
</script>

<style lang="scss">
.menu-enter-active,
.menu-leave-active {
	transition: opacity var(--transition-duration);
}

.menu-enter-from,
.menu-leave-to {
	opacity: 0;
}

.ui-menu {
	position: fixed;
	background-color: transparent;
	overflow: hidden;
	border-radius: 8px;
	box-shadow: var(--box-shadow);
	backdrop-filter: blur(10px);
	min-width: 210px;
	z-index: 100;
}
</style>

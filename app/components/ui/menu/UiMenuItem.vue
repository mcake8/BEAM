<template>
	<li class="ui-menu-item">
		<component
			:is="computedTag"
			class="ui-menu-item__inner"
			:href="computedHref"
			:to="to"
			@click="handleClick"
		>
			<slot name="icon" />
			<span class="ui-menu-item__text">
				<slot />
			</span>
		</component>
	</li>
</template>

<script setup lang="ts">
interface Props {
	href?: string
	to?: string
	tel?: string
	email?: string
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	href: undefined,
	to: undefined,
	tel: undefined,
	email: undefined,
	disabled: false
})

const computedTag = computed(() => {
	if (props.to) return resolveComponent('NuxtLink')
	if (props.href || props.tel || props.email) return 'a'
	return 'p'
})

const computedHref = computed(() => {
	if (props.tel) return `tel:${props.tel}`
	if (props.email) return `mailto:${props.email}`
	return props.href
})

const handleClick = (event: MouseEvent) => {
	if (props.disabled) {
		event.preventDefault()
		event.stopPropagation()
	}
}
</script>

<style lang="scss">
.ui-menu-item {
	font-family: var(--font-family-secondary);
	font-weight: 400;
	font-size: 16px;

	padding: 12px;
	transition-duration: var(--transition-duration);
	cursor: pointer;

	&__inner {
		display: flex;
		align-items: center;
		column-gap: 4px;
		width: 100%;
		color: inherit;
	}

	&:not(:last-child) {
		border-bottom: var(--border-menu-item);
	}
	@include hover {
		background-color: var(--color-surface-2);
	}

	&__text {
		font-size: 16px;
		color: var(--color-primary);
	}
}
</style>

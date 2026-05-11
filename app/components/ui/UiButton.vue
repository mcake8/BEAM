<template>
	<component
		:is="computedTag"
		class="ui-button"
		:class="{
			'ui-button--full-width': fullWidth,
			'ui-button--tablet-full-width': tabletFullWidth
		}"
		:type="!href && !to ? type : undefined"
		:href="href"
		:to="to"
		:disabled="disabled"
		:aria-disabled="disabled"
		:aria-label="ariaLabel"
		@click="handleClick"
	>
		<slot />
	</component>
</template>

<script setup lang="ts">
interface Props {
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	fullWidth?: boolean
	tabletFullWidth?: boolean
	ariaLabel?: string
	href?: string
	to?: string
}

const props = withDefaults(defineProps<Props>(), {
	type: 'button',
	disabled: false,
	fullWidth: false,
	tabletFullWidth: false,
	ariaLabel: undefined,
	href: undefined,
	to: undefined
})

const computedTag = computed(() => {
	if (props.to) return resolveComponent('NuxtLink')
	if (props.href) return 'a'
	return 'button'
})

const handleClick = (event: MouseEvent) => {
	if (props.disabled) {
		event.preventDefault()
		event.stopPropagation()
	}
}
</script>

<style lang="scss">
.ui-button {
	@include flex-center(true);

	font-family: var(--font-family-secondary);
	font-weight: 700;

	min-width: 143px;
	height: 50px;
	padding: 12px 24px;
	font-size: 20px;
	border-radius: 8px;

	background-color: var(--color-primary);
	color: var(--color-surface-2);

	@include hover {
		background-color: var(--color-secondary);
	}

	&:active {
		transform: scale(0.98);
	}

	&:disabled {
		@include disabled;

		&:active {
			transform: none;
		}
	}

	&--full-width {
		width: 100%;
	}

	&--tablet-full-width {
		@include tablet {
			width: 100%;
		}
	}
}
</style>

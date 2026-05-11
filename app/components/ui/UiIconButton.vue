<template>
	<button
		class="ui-icon-button"
		:class="{ 'is-active': active }"
		:aria-label="ariaLabel"
		type="button"
	>
		<slot />
	</button>
</template>

<script setup lang="ts">
interface Props {
	size?: number
	iconSize?: number
	ariaLabel?: string
	active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	size: 36,
	iconSize: 24,
	ariaLabel: undefined
})
</script>

<style lang="scss">
.ui-icon-button {
	@include flex-center(true);

	background: none;
	border: none;
	cursor: pointer;

	color: var(--color-primary);

	width: v-bind('props.size + "px"');
	height: v-bind('props.size + "px"');

	svg {
		width: v-bind('props.iconSize + "px"');
		height: v-bind('props.iconSize + "px"');
		display: block;
		pointer-events: none;
	}

	&:hover {
		opacity: 0.5;
	}

	&:active {
		transform: scale(0.98);
	}
}
</style>

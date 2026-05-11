<template>
	<div
		class="ui-bullets"
		:class="`ui-bullets--${variant}`"
	>
		<button
			v-for="n in count"
			:key="n"
			class="ui-bullets__dot"
			:class="{ 'ui-bullets__dot--active': n - 1 === active }"
			@click="$emit('update:active', n - 1)"
		/>
	</div>
</template>

<script setup lang="ts">
interface Props {
	count: number
	active: number
	variant?: 'dark' | 'light'
}

withDefaults(defineProps<Props>(), {
	variant: 'dark'
})

defineEmits<{ 'update:active': [value: number] }>()
</script>

<style lang="scss">
.ui-bullets {
	@include flex-center(true);

	column-gap: 8px;
	padding: 4px;

	&__dot {
		@include square(6px);
		border-radius: 50%;
		background-color: var(--color-primary);
		opacity: 0.25;

		&--active {
			opacity: 1;
		}
	}

	&--light .ui-bullets__dot {
		background-color: var(--color-surface);
	}
}
</style>

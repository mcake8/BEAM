<template>
	<article
		class="ui-card"
		:class="{ 'ui-card--overlay': overlay }"
	>
		<div
			v-if="$slots.media"
			class="ui-card__media"
		>
			<slot name="media" />
		</div>

		<div
			v-if="$slots.default"
			class="ui-card__content"
			:class="{ 'ui-card__content--light': overlay }"
		>
			<slot />
		</div>

		<div
			v-if="$slots.footer"
			class="ui-card__footer"
		>
			<slot name="footer" />
		</div>
	</article>
</template>

<script setup lang="ts">
interface Props {
	overlay?: boolean
}

withDefaults(defineProps<Props>(), {
	overlay: false
})
</script>

<style lang="scss">
.ui-card {
	position: relative;
	display: grid;
	width: 100%;
	height: 100%;
	background: var(--color-surface);

	&__media,
	&__content,
	&__footer {
		grid-area: 1 / 1;
	}

	&__media {
		position: relative;
	}

	&__content {
		font-family: var(--font-family-secondary);
		align-self: end;
		justify-self: start;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 32px;
		z-index: 2;
		pointer-events: none;
		color: var(--color-primary);
		transition: color var(--transition-duration);

		&--light {
			color: var(--color-surface-2);
		}
	}

	&__footer {
		align-self: end;
		justify-self: center;
		margin-bottom: 32px;
		z-index: 3;
		pointer-events: none;
	}

	&::after {
		content: '';
		grid-area: 1 / 1;
		align-self: end;
		height: 50%;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent);
		pointer-events: none;
		z-index: 1;
		opacity: 0;
		transition: opacity var(--transition-duration-longer);
	}

	&--overlay::after {
		opacity: 1;
	}
}
</style>

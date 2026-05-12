<template>
	<UiCard
		class="product-card"
		:overlay="!isFirstSlide"
		v-bind="swipeHandlers"
	>
		<template #media>
			<div
				v-for="(img, i) in images"
				:key="i"
				class="product-card__slide"
				:class="{
					'product-card__slide--active': i === activeImage,
					'product-card__slide--cover': i > 0
				}"
			>
				<img
					:src="img"
					:alt="`${name} ${i + 1}`"
				/>
			</div>
		</template>

		<p class="product-card__name">{{ name }}</p>
		<p class="product-card__price">{{ formatPrice(price) }}</p>

		<template #footer>
			<UiBullets
				v-if="imagesCount > 1"
				:count="imagesCount"
				:active="activeImage"
				:variant="isFirstSlide ? 'dark' : 'light'"
			/>
		</template>
	</UiCard>
</template>

<script setup lang="ts">
interface Props {
	name: string
	price: number
	images: string[]
}

const props = defineProps<Props>()

const activeImage = ref(0)
const imagesCount = computed(() => props.images.length)
const isFirstSlide = computed(() => activeImage.value === 0)

const next = () => {
	activeImage.value = (activeImage.value + 1) % imagesCount.value
}

const prev = () => {
	activeImage.value =
		(activeImage.value - 1 + imagesCount.value) % imagesCount.value
}

const { swipeHandlers } = useSwipe({ onNext: next, onPrev: prev })
</script>

<style lang="scss">
.product-card {
	min-height: 455px;
	user-select: none;
	cursor: grab;
	touch-action: pan-y;

	&:active {
		cursor: grabbing;
	}

	&__slide {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity var(--swipe-duration);
		pointer-events: none;

		img {
			width: 181px;
			height: 279px;
			object-fit: contain;
			display: block;
			pointer-events: none;
		}

		&--active {
			opacity: 1;
		}

		&--cover {
			padding: 0;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}

	&__name {
		font-weight: 900;
		font-size: 29px;
		color: inherit;
	}

	&__price {
		font-weight: 400;
		font-size: 20px;
		color: inherit;
	}
}
</style>

<script setup>
import useEmblaCarousel from 'embla-carousel-vue'

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

const goToPrev = () => emblaApi.value?.scrollPrev()
const goToNext = () => emblaApi.value?.scrollNext()
</script>

<template>
	<div class="container">
		<div class="content">
			<div class="product">
				<h1 class="title">Люнн</h1>
				<p class="description">Стул Пашки Дурова</p>

				<div class="slider">
					<div
						ref="emblaRef"
						class="slider__viewport"
					>
						<div class="slider__container">
							<div
								v-for="n in 3"
								:key="n"
								class="slide"
							>
								<img
									src="/images/chair-1.png"
									alt=""
								/>
								Slide {{ n }}
							</div>
						</div>
					</div>

					<button @click="goToPrev">←</button>
					<button @click="goToNext">→</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.content {
	border-radius: var(--border-radius-small);
	background-color: #fff;
	display: flex;
	min-height: 100dvh;
}

.product {
	display: flex;
	flex-direction: column;
}

.slider {
	&__viewport {
		overflow: hidden;
	}

	&__container {
		display: flex;
		touch-action: pan-y pinch-zoom;
	}
}

.slide {
	flex: 0 0 100%;
	min-width: 0;
	height: 300px;
	background: #eee;
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
}
</style>

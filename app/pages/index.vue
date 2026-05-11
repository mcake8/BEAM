<template>
	<div class="container">
		<div class="content">
			<div class="product">
				<h1 class="title">Люнн</h1>
				<p class="description">Стул Пашки Дурова</p>

				<UiButton tablet-full-width>Заказать</UiButton>

				<UiBullets
					variant="dark"
					:count="5"
					:active="activeSlide"
					@update:active="handleBulletClick"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const activeSlide = ref(0)

const handleBulletClick = (value: number) => {
	activeSlide.value = value
}
</script>

<style scoped lang="scss">
.content {
	border-radius: var(--border-radius-small);
	background-color: var(--color-surface);
	display: flex;
	min-height: 100dvh;
}

.product {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 20px;
	width: 100%;
}
</style>

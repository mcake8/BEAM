<script setup>
const { getColSpan } = useGridPattern()

const products = [
	{ id: 1, name: 'Люнн', price: '4 600 ₽' },
	{ id: 2, name: 'Фьорд', price: '4 200 ₽' },
	{ id: 3, name: 'Туве', price: '3 100 ₽' },
	{ id: 4, name: 'Грид', price: '4 600 ₽' },
	{ id: 5, name: 'Снелли', price: '6 800 ₽' },
	{ id: 6, name: 'Хельга', price: '5 200 ₽' },
	{ id: 7, name: 'Бьёрн', price: '7 400 ₽' },
	{ id: 8, name: 'Сигрид', price: '3 800 ₽' },
	{ id: 9, name: 'Ульрик', price: '4 900 ₽' },
	{ id: 10, name: 'Рагна', price: '6 100 ₽' },
	{ id: 11, name: 'Торвальд', price: '5 500 ₽' },
	{ id: 12, name: 'Ингрид', price: '3 300 ₽' },
	{ id: 13, name: 'Магнус', price: '8 200 ₽' },
	{ id: 14, name: 'Фрейя', price: '4 700 ₽' },
	{ id: 15, name: 'Лейф', price: '5 900 ₽' },
	{ id: 16, name: 'Астрид', price: 'Под заказ' },
	{ id: 17, name: 'Эрик', price: 'Под заказ' },
	{ id: 18, name: 'Сольвей', price: 'Под заказ' },
	{ id: 19, name: 'Харальд', price: 'Под заказ' },
	{ id: 20, name: 'Гуннар', price: 'Под заказ' },
	{ id: 21, name: 'Бригитта', price: '6 400 ₽' },
	{ id: 22, name: 'Стейнар', price: '3 600 ₽' },
	{ id: 23, name: 'Вигдис', price: '7 100 ₽' },
	{ id: 24, name: 'Олаф', price: '4 300 ₽' },
	{ id: 25, name: 'Хильда', price: '5 700 ₽' },
	{ id: 26, name: 'Кнут', price: 'Под заказ' },
	{ id: 27, name: 'Рунар', price: '9 000 ₽' },
	{ id: 28, name: 'Сванхильд', price: 'Под заказ' },
	{ id: 29, name: 'Торстейн', price: '4 100 ₽' },
	{ id: 30, name: 'Эйрик', price: '6 600 ₽' },
	{ id: 31, name: 'Нордис', price: 'Под заказ' },
	{ id: 32, name: 'Вальдемар', price: '5 300 ₽' },
	{ id: 33, name: 'Сигурд', price: '7 800 ₽' }
]
</script>

<template>
	<div class="container">
		<div class="grid">
			<div
				v-for="(product, index) in products"
				:key="product.id"
				:class="`col-${getColSpan(index)}`"
			>
				<ProductCard
					:name="product.name"
					:price="4600"
					:images="[
						'/images/chair-1.png',
						'/images/chair-2.jpg',
						'/images/chair-3.jpg',
						'/images/chair-4.jpg'
					]"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.card {
	display: flex;
	flex-direction: column;
	padding: 32px;
	background-color: var(--color-surface);
	transition-duration: var(--transition-duration);
	cursor: pointer;

	&:hover {
		background-color: var(--color-surface-2);
	}

	img {
		width: 181px;
		height: 279px;
		object-fit: contain;
		align-self: center;
	}
}

.price {
	font-family: var(--font-family-secondary);
}
</style>

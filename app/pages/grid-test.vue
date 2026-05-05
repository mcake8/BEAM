<script setup>
const { getColSpan } = useGridPattern()

const products = [
	{ id: 1, name: 'Люнн', price: '4 600 ₽' },
	{ id: 2, name: 'Фьорд', price: '4 200 ₽' },
	{ id: 3, name: 'Туве', price: '3 100 ₽' },
	{ id: 4, name: 'Грид', price: '4 600 ₽' },
	{ id: 5, name: 'Снелли', price: '6 800 ₽' },
	{ id: 6, name: 'Фьорд', price: 'Под заказ' },
	{ id: 7, name: 'Туве', price: 'Под заказ' },
	{ id: 8, name: 'Люнн', price: 'Под заказ' },
	{ id: 9, name: 'Грид', price: 'Под заказ' },
	{ id: 10, name: 'Туве', price: 'Под заказ' },
	{ id: 11, name: 'Фьорд', price: 'Под заказ' }
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
				<div class="card">
					<img
						src="/images/chair-1.png"
						:alt="product.name"
					/>
					<div class="card__info">
						<h2 class="name">{{ product.name }}</h2>
						<p class="price">{{ product.price }}</p>
					</div>
				</div>
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

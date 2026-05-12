<template>
	<div class="ui-kit__content">
		<h2>UI Kit</h2>

		<section>
			<h2>Button</h2>
			<div class="ui-kit__row">
				<UiButton>Заказать</UiButton>
				<UiButton full-width>Заказать full-width</UiButton>
				<UiButton href="https://nuxt.com/">a href=nuxt.com</UiButton>
				<UiButton to="/grid-test">NuxtLink to grid page</UiButton>
				<UiButton disabled>Disabled</UiButton>
			</div>
		</section>

		<section>
			<h2>Icon Button</h2>
			<div
				class="ui-kit__row"
				style="display: flex; flex-direction: row"
			>
				<UiIconButton
					:icon-size="24"
					aria-label="Закрыть меню"
				>
					<IconCross />
				</UiIconButton>
				<UiIconButton
					:icon-size="24"
					aria-label="Закрыть меню"
				>
					<IconChevronRight />
				</UiIconButton>
			</div>
		</section>

		<section>
			<h2>Contacts Button & Menu</h2>
			<div
				style="
					margin-bottom: 12px;
					display: flex;
					align-items: center;
					gap: 12px;
				"
			>
				<label style="font-size: 14px; white-space: nowrap">
					Отступ(тест адаптивности меню): {{ anchorOffset }}px
				</label>
				<input
					v-model="anchorOffset"
					type="range"
					min="0"
					max="500"
					style="width: 300px"
				/>
			</div>
			<div
				style="width: fit-content"
				:style="{ marginLeft: anchorOffset + 'px' }"
			>
				<UiIconButton
					ref="anchorRef"
					:active="isOpen"
					:icon-size="48"
					:size="48"
					@click="toggleMenu"
				>
					<IconContacts />
				</UiIconButton>
				<UiMenu
					:is-open="isOpen"
					:anchor="anchorRef"
					@close="closeMenu"
				>
					<UiMenuItem href="http://t.me/hellrainx">
						<template #icon>
							<UiIcon :size="32"><IconTelegram /></UiIcon>
						</template>
						@Hellrainx
					</UiMenuItem>
					<UiMenuItem href="https://www.instagram.com/hellrainx/">
						<template #icon>
							<UiIcon :size="32"><IconInstagram /></UiIcon>
						</template>
						hellrainx
					</UiMenuItem>
					<UiMenuItem tel="+88005553535">
						<template #icon>
							<UiIcon :size="32"><IconPhone /></UiIcon>
						</template>
						8 800 555 35 35
					</UiMenuItem>
				</UiMenu>
			</div>
		</section>

		<section>
			<h2>Bullets</h2>
			<div class="ui-kit__row">
				<UiBullets
					:count="5"
					:active="activeDark"
					@update:active="activeDark = $event"
				/>
				<div style="background: #333; padding: 10px">
					<UiBullets
						variant="light"
						:count="5"
						:active="activeLight"
						@update:active="activeLight = $event"
					/>
				</div>
			</div>
		</section>

		<section>
			<h2>Product Card</h2>
			<div
				class="ui-kit__row"
				style="max-width: 919px; max-height: 455px"
			>
				<ProductCard
					name="Люнн"
					:price="4600"
					:images="[
						'/images/chair-1.png',
						'/images/chair-2.jpg',
						'/images/chair-3.jpg',
						'/images/chair-4.jpg',
						'/images/chair-2.jpg'
					]"
				/>
			</div>
			<br />
			<UiButton to="/grid-test">Посмотреть грид</UiButton>
		</section>
	</div>
</template>

<script setup lang="ts">
import IconChevronRight from '~/assets/icons/IconChevronRight.vue'
import IconContacts from '~/assets/icons/IconContacts.vue'
import IconCross from '~/assets/icons/IconCross.vue'
import IconInstagram from '~/assets/icons/socials/IconInstagram.vue'
import IconPhone from '~/assets/icons/socials/IconPhone.vue'
import IconTelegram from '~/assets/icons/socials/IconTelegram.vue'
import ProductCard from '~/components/ProductCard.vue'

definePageMeta({
	middleware: 'dev-only',
	layout: false
})

const isOpen = ref(false)
// bullets
const activeDark = ref(0)
const activeLight = ref(0)

// Якорь для меню
const anchorRef = ref<HTMLElement | null>(null)
//
const anchorOffset = ref(0)

const toggleMenu = () => {
	isOpen.value = !isOpen.value
}

const closeMenu = () => {
	isOpen.value = false
}
</script>

<style lang="scss">
.ui-kit__content {
	padding: 20px;

	background-color: #dadada;
}

.contacts-test {
	margin-left: 500px;
}

section {
	margin-bottom: 40px;

	h2 {
		margin-bottom: 16px;
	}
}

.ui-kit__row {
	display: flex;
	align-items: self-start;
	flex-direction: column;
	gap: 16px;
	flex-wrap: wrap;
}
</style>

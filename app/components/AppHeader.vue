<template>
	<header class="header">
		<div class="header__inner">
			<NuxtLink
				to="/ui-kit"
				class="header__logo"
			>
				<IconLogo />
			</NuxtLink>

			<UiIconButton
				ref="anchorRef"
				:active="isOpen"
				:icon-size="48"
				:size="48"
				@click="toggleMenu"
			>
				<IconContacts />
			</UiIconButton>
		</div>
	</header>

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
</template>

<script setup lang="ts">
import IconContacts from '~/assets/icons/IconContacts.vue'
import IconLogo from '~/assets/icons/IconLogo.vue'
import IconInstagram from '~/assets/icons/socials/IconInstagram.vue'
import IconPhone from '~/assets/icons/socials/IconPhone.vue'
import IconTelegram from '~/assets/icons/socials/IconTelegram.vue'

const isOpen = ref(false)
const anchorRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
	isOpen.value = !isOpen.value
}

const closeMenu = () => {
	isOpen.value = false
}
</script>

<style lang="scss">
.header {
	border-right: var(--border-primary);
	border-left: var(--border-primary);
	padding-top: var(--container-padding);

	&__logo {
		color: var(--color-primary);
	}

	&__inner {
		border-radius: 12px 12px 0 0;
		background-color: var(--color-surface);
		padding: 20px 24px;

		display: flex;
		align-items: center;
		justify-content: space-between;

		@include mobile {
			padding-inline: 16px;
		}
	}
}
</style>

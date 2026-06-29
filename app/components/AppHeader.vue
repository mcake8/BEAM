<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink to="/" class="header__logo">
        <IconLogo />
      </NuxtLink>

      <UiIconButton
        ref="anchorRef"
        :active="isOpen"
        :icon-size="40"
        :size="40"
        @click="toggleMenu"
      >
        <IconContacts />
      </UiIconButton>
    </div>
  </header>

  <SocialsMenu :is-open="isOpen" :anchor="anchorRef" @close="closeMenu" />
</template>

<script setup>
  import IconContacts from '~/assets/icons/IconContacts.vue'
  import IconLogo from '~/assets/icons/IconLogo.vue'

  const isOpen = ref(false)
  const anchorRef = ref(null)

  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }

  const closeMenu = () => {
    isOpen.value = false
  }
</script>

<style lang="scss">
  .header {
    border-bottom: var(--border-primary);
    padding-top: var(--container-padding);

    &__logo {
      color: var(--color-primary);
    }

    &__inner {
      max-height: var(--header-max-height);
      border-radius: 12px 12px 0 0;
      background-color: var(--color-surface);
      padding: 16px 24px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      @include mobile {
        padding-inline: 16px;
        padding: 16px;
      }
    }
  }
</style>

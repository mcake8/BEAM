<template>
  <div class="ui-card" :class="{ 'ui-card--overlay': overlay }">
    <div v-if="$slots.media" class="ui-card__media">
      <slot name="media" />
    </div>

    <div
      v-if="$slots.default"
      class="ui-card__content"
      :class="{ 'ui-card__content--light': overlay }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
  defineProps({
    overlay: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss">
  .ui-card {
    position: relative;
    height: 455px;

    background: var(--color-surface);
    transition-duration: var(--transition-duration);

    @include mobile {
      height: 380px;
    }

    @include hover {
      background-color: var(--color-surface-2);
    }

    &__media {
      user-select: none;
      width: 100%;
      height: 100%;
    }

    &__content {
      position: absolute;
      left: 32px;
      bottom: 32px;
      right: 32px;
      z-index: 100;

      @include mobile {
        left: 24px;
        bottom: 44px;
      }

      &--light {
        color: var(--color-surface-2);
      }
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
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

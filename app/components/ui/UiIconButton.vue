<template>
  <button
    class="ui-icon-button"
    :class="{ 'is-active': active }"
    :style="{
      '--size': size + 'px',
      '--icon-size': iconSize + 'px'
    }"
    :aria-label="ariaLabel"
    type="button"
  >
    <slot />
  </button>
</template>

<script setup>
  defineProps({
    size: {
      type: Number,
      default: 36
    },
    iconSize: {
      type: Number,
      default: 24
    },
    ariaLabel: {
      type: String,
      default: undefined
    },
    active: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss">
  .ui-icon-button {
    @include flex-center(true);

    color: var(--color-primary);
    cursor: pointer;
    width: var(--size);
    height: var(--size);

    svg {
      width: var(--icon-size);
      height: var(--icon-size);
    }

    &:hover {
      opacity: 0.5;
    }
  }
</style>

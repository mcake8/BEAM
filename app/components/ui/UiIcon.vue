<template>
  <div
    class="ui-icon"
    :class="{ 'is-clickable': $attrs.onClick }"
    :style="{ '--size': size + 'px' }"
  >
    <slot />
  </div>
</template>

<script setup>
  defineProps({
    size: {
      type: Number,
      default: 32
    }
  })
</script>

<style lang="scss">
  .ui-icon {
    @include flex-center(true);

    color: var(--color-primary);
    width: var(--size);
    height: var(--size);

    &.is-clickable {
      cursor: pointer;
    }
  }
</style>

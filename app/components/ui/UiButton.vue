<template>
  <component
    :is="computedTag"
    class="ui-button"
    :class="{
      'ui-button--full-width': fullWidth,
      'ui-button--tablet-full-width': tabletFullWidth
    }"
    :type="!href && !to ? type : undefined"
    :href="href"
    :to="to"
    :disabled="disabled"
    :aria-disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup>
  const props = defineProps({
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    tabletFullWidth: {
      type: Boolean,
      default: false
    },
    ariaLabel: {
      type: String,
      default: undefined
    },
    href: {
      type: String,
      default: undefined
    },
    to: {
      type: String,
      default: undefined
    }
  })

  const computedTag = computed(() => {
    if (props.to) return resolveComponent('NuxtLink')
    if (props.href) return 'a'
    return 'button'
  })

  const handleClick = (event) => {
    if (props.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
</script>

<style lang="scss">
  .ui-button {
    @include flex-center(true);

    font-family: var(--font-family-secondary);
    font-weight: 700;
    min-width: 143px;
    height: 50px;
    padding: 12px 24px;
    font-size: 20px;
    border-radius: 8px;

    background-color: var(--color-primary);
    color: var(--color-surface-2);

    @include hover {
      background-color: var(--color-secondary);
    }

    &:disabled {
      @include disabled;
    }

    &--full-width {
      width: 100%;
    }

    &--tablet-full-width {
      @include tablet {
        width: 100%;
      }
    }
  }
</style>

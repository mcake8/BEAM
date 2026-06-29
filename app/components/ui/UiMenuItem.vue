<template>
  <li class="ui-menu-item">
    <component
      :is="computedTag"
      class="ui-menu-item__inner"
      :href="computedHref"
      :to="to"
      @click="handleClick"
    >
      <slot name="icon" />
      <div class="ui-menu-item__text">
        <slot />
      </div>
    </component>
  </li>
</template>

<script setup>
  const props = defineProps({
    href: {
      type: String,
      default: undefined
    },
    to: {
      type: String,
      default: undefined
    },
    tel: {
      type: String,
      default: undefined
    },
    email: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  })

  const computedTag = computed(() => {
    if (props.to) return resolveComponent('NuxtLink')
    if (props.href || props.tel || props.email) return 'a'
    return 'div'
  })

  const computedHref = computed(() => {
    if (props.tel) return `tel:${props.tel}`
    if (props.email) return `mailto:${props.email}`
    return props.href
  })

  const handleClick = (event) => {
    if (props.disabled) {
      event.preventDefault()
      event.stopPropagation()
    }
  }
</script>

<style lang="scss">
  .ui-menu-item {
    font-family: var(--font-family-secondary);
    padding: 12px;
    transition-duration: var(--transition-duration);

    &:not(:last-child) {
      border-bottom: var(--border-menu-item);
    }

    @include hover {
      background-color: var(--color-surface-2);
    }

    &__inner {
      display: flex;
      align-items: center;
      column-gap: 4px;
      width: 100%;
    }

    &__text {
      font-size: 16px;
      color: var(--color-primary);
    }
  }
</style>

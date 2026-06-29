<template>
  <div
    class="ui-bullets"
    :class="[
      `ui-bullets--${variant}`,
      { 'ui-bullets--vertical': vertical }
    ]"
  >
    <div
      v-for="n in count"
      :key="n"
      class="ui-bullets__dot"
      :class="{ 'ui-bullets__dot--active': n - 1 === active }"
    />
  </div>
</template>

<script setup>
  defineProps({
    count: {
      type: Number,
      required: true
    },
    active: {
      type: Number,
      required: true
    },
    variant: {
      type: String,
      default: 'dark'
    },
    vertical: {
      type: Boolean,
      default: false
    }
  })
</script>

<style lang="scss">
  .ui-bullets {
    @include flex-center(true);

    column-gap: 8px;
    padding: 4px;

    &__dot {
      @include square(6px);

      border-radius: 50%;
      background-color: var(--color-primary);
      opacity: 0.25;

      &--active {
        opacity: 1;
      }
    }

    &--light .ui-bullets__dot {
      background-color: var(--color-surface);
    }

    &--vertical {
      flex-direction: column;
      row-gap: 8px;
      column-gap: 0;
    }
  }
</style>

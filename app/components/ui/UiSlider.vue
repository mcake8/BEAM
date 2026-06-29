<template>
  <div
    class="ui-slider"
    :class="[
      `ui-slider--${orientation}`,
      { 'ui-slider--grabbing': isGrabbing }
    ]"
    v-bind="swipeHandlers"
  >
    <template v-if="orientation === 'vertical'">
      <div v-for="(image, i) in images" :key="i" class="ui-slider__slide">
        <img class="ui-slider__image" :src="image" :alt="`${i + 1}`" />
      </div>
    </template>

    <template v-else>
      <div
        v-for="(image, i) in images"
        :key="i"
        class="ui-slider__slide"
        :class="{ 'ui-slider__slide--active': i === active }"
      >
        <img class="ui-slider__image" :src="image" :alt="`${i + 1}`" />
      </div>

      <div v-if="images.length > 1" class="ui-slider__bullets">
        <UiBullets
          :count="images.length"
          :active="active"
          :variant="active === 0 ? 'dark' : 'light'"
          @update:active="active = $event"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
  const props = defineProps({
    images: {
      type: Array,
      required: true
    },
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v)
    }
  })

  const emit = defineEmits(['update:active'])

  const active = ref(0)
  const isGrabbing = ref(false)

  const next = () => {
    active.value = (active.value + 1) % props.images.length
    emit('update:active', active.value)
  }

  const prev = () => {
    active.value =
      (active.value - 1 + props.images.length) % props.images.length
    emit('update:active', active.value)
  }

  const { swipeHandlers } =
    props.orientation === 'horizontal'
      ? useSwipe({
          onNext: next,
          onPrev: prev,
          onGrabStart: () => (isGrabbing.value = true),
          onGrabEnd: () => (isGrabbing.value = false)
        })
      : { swipeHandlers: {} }
</script>

<style lang="scss">
  .ui-slider {
    position: absolute;
    inset: 0;

    &--horizontal {
      cursor: grab;

      &.ui-slider--grabbing {
        cursor: grabbing;
      }
    }

    &--vertical {
      overflow-y: auto;
    }

    &__slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity var(--swipe-duration);
      pointer-events: none;

      &--active {
        opacity: 1;
      }
    }

    &--vertical &__slide {
      position: relative;
      inset: unset;
      opacity: 1;
      pointer-events: auto;
      aspect-ratio: 1;
    }

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__bullets {
      position: absolute;
      z-index: 100;
    }

    &--horizontal .ui-slider__bullets {
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>

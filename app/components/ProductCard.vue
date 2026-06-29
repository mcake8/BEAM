<template>
  <UiCard class="product-card" :overlay="activeImage > 0">
    <template #media>
      <UiSlider :images="images" @update:active="activeImage = $event" />
    </template>

    <div class="title-md mb-4">{{ label }}</div>
    <div class="text-label mb-8">{{ formatPrice(price) }}</div>
  </UiCard>
</template>

<script setup>
  defineProps({
    label: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  })

  const activeImage = ref(0)
</script>

<style lang="scss">
  .product-card {
    user-select: none;
  }
</style>

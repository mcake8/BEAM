<template>
  <UiCard class="category-card">
    <template #media>
      <img class="category-card__image" :src="images[0]" :alt="images[0]" />
    </template>

    <div class="title-md">{{ label }}</div>
  </UiCard>
</template>

<script setup>
  defineProps({
    label: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    }
  })
</script>

<style lang="scss">
  .category-card {
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>

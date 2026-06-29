<template>
  <div class="product-details">
    <h1 class="title-lg mb-24">{{ product.label }}</h1>

    <div v-if="product.variations?.length" class="product-details__variations">
      <div
        v-for="variation in product.variations"
        :key="variation.id"
        class="product-details__variation"
      >
        <div class="product-details__variation-header">
          <span class="text-item">{{ variation.label }}</span>
        </div>
        <div v-if="variation.colors?.length" class="product-details__colors">
          <div
            v-for="color in variation.colors"
            :key="color.id"
            class="product-details__color"
          >
            <div class="product-details__color-swatch">
              <img
                class="product-details__color-swatch-image"
                v-if="color.images?.[0]"
                :src="color.images[0].src"
                :alt="color.label"
              />
            </div>
            <span class="text-item">{{ color.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="text-normal mt-8 mb-16">
      {{ formatPrice(product.price) }}
    </div>

    <p v-if="product.description" class="text-p mb-16">
      {{ product.description }}
    </p>

    <div v-if="product.comment" class="text-item mb-24">
      {{ product.comment }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Variation } from '#shared/types'

  interface ProductInfo {
    label: string
    description: string | null
    comment: string | null
    price: number
    variations: Variation[]
  }

  defineProps<{
    product: ProductInfo
  }>()
</script>

<style lang="scss">
  .product-details {
    display: flex;
    flex-direction: column;
    background-color: var(--color-surface);
    padding: 32px;

    &__variation-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    &__colors {
      display: flex;
      gap: 12px;

      flex-wrap: wrap;
    }

    &__color {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__color-swatch {
      @include square(48px);

      border-radius: 8px;
      overflow: hidden;
      background: var(--color-surface-3);
    }

    &__color-swatch-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
</style>

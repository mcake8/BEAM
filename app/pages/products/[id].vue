<template>
  <div class="product-page">
    <div v-if="product" class="product-page__layout">
      <ProductDetails :product="product" />

      <div class="product-page__media">
        <UiSlider
          :images="[
            '/images/chair-transparent.png',
            '/images/chair-2.jpg',
            '/images/chair-3.jpg'
          ]"
          orientation="vertical"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ApiResponse, Image, Variation } from '#shared/types'

  interface ProductDetail {
    productId: number
    label: string
    description: string | null
    comment: string | null
    price: number
    categoryId: number | null
    previewImages: Image[]
    variations: Variation[]
  }

  const route = useRoute()
  const id = route.params.id as string

  const { data } = await useFetch<ApiResponse<ProductDetail>>(
    `/api/products/${id}`
  )
  const product = data.value?.ok ? data.value.data : null
</script>

<style lang="scss">
  .product-page {
    &__layout {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    &__media {
      position: relative;
      height: 100dvh;
      background: var(--color-surface);
      overflow: hidden;

      @include tablet {
        height: 400px;
      }

      @include mobile {
        height: 300px;
      }
    }

    &__error {
      padding: 80px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
    }
  }
</style>

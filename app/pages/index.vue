<template>
  <ul class="catalog">
    <li
      v-for="item in catalog"
      :key="
        item.type === 'Category'
          ? `cat-${item.categoryId}`
          : `prod-${item.productId}`
      "
      :class="
        item.type === 'Category' ? 'catalog__category' : 'catalog__product'
      "
    >
      <CategoryCard
        v-if="item.type === 'Category'"
        :label="item.label"
        :images="['/images/chair-transparent.png']"
      />

      <ProductCard
        v-else
        :label="item.label"
        :price="item.price"
        :images="[
          '/images/chair-transparent.png',
          '/images/chair-2.jpg',
          '/images/chair-3.jpg'
        ]"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { ApiResponse, CatalogItem } from '#shared/types'

  const { data } = await useFetch<ApiResponse<CatalogItem[]>>('/api/catalog')
  const catalog = data.value?.ok ? data.value.data : []
</script>

<style lang="scss">
  .catalog {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2px;

    border-radius: 0 0 12px 12px;
    overflow: hidden;

    &__category {
      grid-column: span 2;
    }

    &__product {
      grid-column: span 1;
    }

    @include laptop {
      grid-template-columns: repeat(2, 1fr);

      &__category,
      &__product {
        grid-column: span 1;
      }
    }

    @include mobile {
      grid-template-columns: 1fr;
    }
  }
</style>

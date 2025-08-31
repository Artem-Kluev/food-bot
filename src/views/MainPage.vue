<template>
  <div class="main-page">
    <BannerCard :bannerData="banners[0]" class="main-page__banner" />

    <h3 class="main-page__title">Популярні категорії</h3>

    <CategorySlider :categories="categories" :navigateMode="true" class="main-page__category-slider" />

    <Features />
  </div>
</template>

<script setup lang="ts">
import BannerCard from '@/components/widgets/BannerCard.vue'
import CategorySlider from '@/components/widgets/CategorySlider.vue'
import Features from '@/components/widgets/FeaturesComponent.vue'
import { banners } from '@/mixins/banners'
import { categories } from '@/mixins/categories'
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.main-page {
  &__banner {
    margin-bottom: 20px;
  }

  &__title {
    font-weight: 500;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  &__category-slider {
    margin-bottom: 30px;
  }

  &__description {
    font-size: 16px;
    padding: 0 10px;
    margin-bottom: 30px;
  }
}
</style>

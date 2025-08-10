<template>
  <div class="main-page">
    <BannerSlider :sliders="banners" />

    <CardsSlider :sliders="sliders" title="Безкоштовна доставка" />

    <CardsSlider :sliders="popularRestaurants" title="Оплата при отриманні" />

    <CardsSlider :sliders="newRestaurants" title="Суші" />

    <CardsSlider :sliders="discountRestaurants" title="Піцца" />

    <CardsSlider :sliders="premiumRestaurants" title="Швидка доставка" />
  </div>
</template>

<script setup lang="ts">
import CardsSlider from '@/components/widgets/CardsSlider.vue'
import BannerSlider from '@/components/widgets/BannerSlider.vue'
import {
  sliders,
  popularRestaurants,
  newRestaurants,
  discountRestaurants,
  premiumRestaurants,
} from '@/mixins/resto'
import { banners } from '@/mixins/banners'
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;
</style>

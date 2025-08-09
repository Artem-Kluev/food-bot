<template>
  <div class="main-page">
    <CardsSlider :sliders="sliders" title="Безкоштовна доставка" />

    <CardsSlider :sliders="popularRestaurants" title="Оплата при отриманні" />

    <CardsSlider :sliders="newRestaurants" title="Суші" />

    <CardsSlider :sliders="discountRestaurants" title="Піцца" />

    <CardsSlider :sliders="premiumRestaurants" title="Швидка доставка" />
  </div>
</template>

<script setup lang="ts">
import CardsSlider from '@/components/ui/CardsSlider.vue'
import {
  sliders,
  popularRestaurants,
  newRestaurants,
  discountRestaurants,
  premiumRestaurants,
} from '@/mixins/resto'
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.main-page {
  padding: 20px;
}
</style>

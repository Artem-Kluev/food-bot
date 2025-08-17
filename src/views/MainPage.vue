<template>
  <div class="main-page">
    <BannerSlider :sliders="banners" />

    <CardsSlider :sliders="sliders" title="Безкоштовна доставка" />

    <CardsSlider :sliders="sliders" title="Оплата при отриманні" />

    <CardsSlider :sliders="sliders" title="Суші" />

    <CardsSlider :sliders="sliders" title="Піцца" />

    <CardsSlider :sliders="sliders" title="Швидка доставка" />
  </div>
</template>

<script setup lang="ts">
import CardsSlider from '@/components/widgets/CardsSlider.vue'
import BannerSlider from '@/components/widgets/BannerSlider.vue'
import { sliders } from '@/mixins/resto'
import { banners } from '@/mixins/banners'
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;
</style>

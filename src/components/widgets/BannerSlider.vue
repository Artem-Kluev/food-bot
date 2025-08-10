<template>
  <div class="banner-slider">
    <swiper
      :spaceBetween="5"
      :modules="modules"
      :slidesPerView="1"
      class="banner-slider__swiper"
      loop
    >
      <swiper-slide v-for="slide in sliders" :key="slide.title" class="banner-slider__slide">
        <BannerCard :bannerData="slide" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import BannerCard from '@/components/widgets/BannerCard.vue'
import type { Banner } from '@/mixins/interfaces'

interface Props {
  sliders: Array<Banner>
}

defineProps<Props>()

const modules = [Navigation]
</script>

<style lang="scss">
@use '@/assets/styles/vars.scss' as *;

.banner-slider {
  width: 100%;
  margin-bottom: 40px;

  &__swiper {
    height: 100%;
  }

  &__slide {
    height: 100%;
    padding: 0 10px;
  }

  &__item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: blue;
  }
}
</style>

<template>
  <div class="card-slider">
    <div class="card-slider__title">{{ title }}</div>

    <swiper
      :spaceBetween="12"
      :modules="modules"
      :slidesPerView="1.3"
      class="card-slider__swiper"
      loop
    >
      <swiper-slide v-for="slide in sliders" :key="slide.title" class="card-slider__slide">
        <ProductCard :slideData="slide" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import ProductCard from '@/components/ui/ProductCard.vue'
import type { Slide } from '@/mixins/interfaces'

interface Props {
  sliders: Array<Slide>
  title: string
}

defineProps<Props>()

const modules = [Navigation]
</script>

<style lang="scss">
@use '@/assets/styles/vars.scss' as *;

.card-slider {
  width: 100%;
  margin-bottom: 15px;

  &__title {
    margin-bottom: 15px;
    font-size: 20px;

    font-weight: 700;
    color: $text;
  }

  &__swiper {
    height: 100%;
  }

  &__slide {
    height: 100%;
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

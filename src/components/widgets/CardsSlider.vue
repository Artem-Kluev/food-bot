<template>
  <div class="card-slider">
    <div class="card-slider__title container">
      <div class="card-slider__title-text">{{ title }}</div>

      <router-link to="/resto" class="card-slider__title-link">
        <span>Всі</span>

        <BaseSvg class="card-slider__title-icon" id="arrow-logo" />
      </router-link>
    </div>

    <swiper
      :spaceBetween="5"
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
import ProductCard from '@/components/widgets/ProductCard.vue'
import type { Slide } from '@/mixins/interfaces'
import BaseSvg from '@/components/base/BaseSvg.vue'

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

  &__title {
    margin-bottom: 15px;
    color: $text;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-text {
      font-size: 20px;
      font-weight: 700;
    }

    &-link {
      font-size: 14px;
      // text-transform: uppercase;
      color: $main-color;
      display: flex;
      align-items: center;

      &:active {
        .card-slider__title-icon {
          transform: translateX(5px);
        }
      }

      span {
        display: block;
        margin-top: 2px;
      }

      &:visited {
        color: $main-color;
      }
    }

    &-icon {
      width: 20px;
      height: 25px;
      transition: transform 0.2s;
    }
  }

  &__swiper {
    height: 100%;
  }

  &__slide {
    height: 100%;
    padding-left: 10px;
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

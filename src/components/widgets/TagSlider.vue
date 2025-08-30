<template>
  <div class="tag-slider">
    <div v-if="title" class="tag-slider__title">{{ title }}</div>

    <swiper :spaceBetween="5" :slidesPerView="'auto'" :modules="modules" class="tag-slider__swiper">
      <swiper-slide v-for="(tag, index) in tags" :key="tag.title" class="tag-slider__slide">
        {{ tag.title }}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import { ref } from 'vue'

interface Props {
  tags: Array<any>
  title?: string
  radio?: boolean
}

defineProps<Props>()
const emit = defineEmits(['selected'])

const modules = [Navigation]
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.tag-slider {
  width: 100%;

  &__swiper {
    height: 100%;
    padding: 0 10px;
  }

  &__slide {
    height: 100%;
    width: auto;
    border-radius: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $text;
    padding: 2px 5px;
    margin-right: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    width: fit-content;
    font-size: 14px;

    &_selected {
      background-color: $main-color;
      text-shadow: $main-text-shadow;
    }
  }
}
</style>

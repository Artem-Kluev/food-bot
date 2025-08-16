<template>
  <div class="category-slider">
    <div class="category-slider__title">Категорії</div>

    <swiper
      :spaceBetween="10"
      :slidesPerView="'auto'"
      :modules="modules"
      class="category-slider__swiper"
    >
      <swiper-slide
        v-for="(slide, index) in categories"
        :key="slide.title"
        :class="[
          'category-slider__slide',
          { 'category-slider__slide_selected': selectedCategories[index] },
        ]"
        @click="toggleCategory(index)"
      >
        <div class="category-slider__slide-image">
          <img :src="slide.image" alt="product image" class="category-slider__slide-img" />
        </div>

        <div class="category-slider__slide-text">
          {{ slide.title }}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import type { Category } from '@/mixins/interfaces'
import { ref, watch } from 'vue'

interface Props {
  categories: Array<Category>
}

const props = defineProps<Props>()
const emit = defineEmits(['selected'])

const modules = [Navigation]
const selectedCategories = ref<Record<number, boolean>>({})

function toggleCategory(index: number) {
  selectedCategories.value[index] = !selectedCategories.value[index]
  emitSelectedCategories()
}

function emitSelectedCategories() {
  const selected = props.categories
    .filter((_, index) => selectedCategories.value[index])
    .map((category) => category.id)
  emit('selected', selected)
}
</script>

<style lang="scss">
@use '@/assets/styles/vars.scss' as *;

.category-slider {
  width: 100%;

  &__title {
    padding: 10px 10px 5px;
    font-size: 20px;
  }

  &__swiper {
    height: 100%;
    padding-left: 10px;
  }

  &__slide {
    height: 100%;
    padding: 0 10px;
    width: auto;
    background-color: $text;
    width: 20%;
    aspect-ratio: 1/1;
    border-radius: 10px;
    display: grid;
    grid-template: 1fr auto / 1fr;
    padding: 5px 0;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &_selected {
      background-color: $main-color;
    }

    &-image {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    &-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &-text {
      color: $background;
      font-size: 2.8vw;
      text-align: center;
    }
  }
}
</style>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import type { Category } from '@/mixins/interfaces'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  categories: Array<Category>
  title?: string
  navigateMode?: boolean
}

const props = defineProps<Props>()
const router = useRouter()

const selectedCategories = defineModel<string[]>({ default: () => [] })

const modules = [Navigation]

const isSelected = computed(() => {
  return (categoryType: string) => selectedCategories.value.includes(categoryType)
})

function toggleCategory(category: Category) {
  const categoryType = category.type || ''
  const currentIndex = selectedCategories.value.indexOf(categoryType)

  if (currentIndex > -1) {
    // Видаляємо категорію якщо вона вже вибрана
    selectedCategories.value = selectedCategories.value.filter((type) => type !== categoryType)
  } else {
    // Додаємо категорію якщо вона не вибрана
    selectedCategories.value = [...selectedCategories.value, categoryType]
  }
}

function navigateToCategory(category: Category) {
  router.push({
    path: '/resto',
    query: { category: category.type },
  })
}
</script>

<template>
  <div class="category-slider">
    <div v-if="title" class="category-slider__title">{{ title }}</div>

    <swiper :spaceBetween="10" :slidesPerView="'auto'" :modules="modules" class="category-slider__swiper">
      <swiper-slide
        v-for="slide in categories"
        :key="slide.title"
        :class="['category-slider__slide', { 'category-slider__slide_selected': isSelected(slide.type || '') }]"
        @click="navigateMode ? navigateToCategory(slide) : toggleCategory(slide)"
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

<style lang="scss">
@use '@/assets/styles/vars.scss' as *;

.category-slider {
  width: 100%;

  &__title {
    padding: 10px 10px 5px;
    font-size: 16px;
    font-weight: 500;
  }

  &__swiper {
    height: 100%;
    padding: 0 10px;
  }

  &__slide {
    height: 100%;
    width: auto;
    background-color: $text;
    width: 20%;
    aspect-ratio: 1/1;
    margin-bottom: 35px;
    max-width: 90px;
    border-radius: 10px;
    display: grid;
    grid-template: 1fr auto / 1fr;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &_selected {
      background-color: $main-color;
    }

    &-image {
      padding: 10px;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    &-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
    }

    &-text {
      position: absolute;
      color: $text;
      font-size: min(3.5vw, 15px);
      text-align: center;
      line-height: 0.9;
      width: 100%;
      top: calc(105%);
    }
  }
}
</style>

<template>
  <div class="category-slider">
    <div v-if="title" class="category-slider__title">{{ title }}</div>

    <swiper :spaceBetween="10" :slidesPerView="'auto'" :modules="modules" class="category-slider__swiper">
      <swiper-slide
        v-for="(slide, index) in categories"
        :key="slide.title"
        :class="['category-slider__slide', { 'category-slider__slide_selected': selectedCategories[index] }]"
        @click="navigateMode ? navigateToCategory(slide) : toggleCategory(index)"
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
import { useRouter } from 'vue-router'

interface Props {
  categories: Array<Category>
  title?: string
  navigateMode?: boolean
  initialSelected?: number[]
}

const props = defineProps<Props>()
const emit = defineEmits(['selected'])
const router = useRouter()

const modules = [Navigation]
const selectedCategories = ref<Record<number, boolean>>({})

// Ініціалізуємо вибрані категорії, якщо вони передані через пропси
if (props.initialSelected && props.initialSelected.length > 0) {
  props.initialSelected.forEach((id) => {
    const index = props.categories.findIndex((cat) => cat.id === id)
    if (index !== -1) {
      selectedCategories.value[index] = true
    }
  })
}

function toggleCategory(index: number) {
  selectedCategories.value[index] = !selectedCategories.value[index]
  emitSelectedCategories()
}

function emitSelectedCategories() {
  const selected = props.categories.filter((_, index) => selectedCategories.value[index]).map((category) => category.id)
  emit('selected', selected)
}

function navigateToCategory(category: Category) {
  router.push({
    path: '/resto',
    query: { category: category.id.toString() },
  })
}
</script>

<style lang="scss">
@use '@/assets/styles/vars.scss' as *;

.category-slider {
  width: 100%;
  margin-bottom: 15px;

  &__title {
    padding: 10px 10px 5px;
    font-size: 16px;
    font-weight: 500;
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
    max-width: 90px;
    border-radius: 10px;
    display: grid;
    grid-template: 1fr auto / 1fr;
    padding: 5px 0;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &_selected {
      background-color: $main-color;
      text-shadow: $main-text-shadow;
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
      font-size: min(2.8vw, 14px);
      text-align: center;
    }
  }
}
</style>

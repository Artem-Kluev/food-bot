<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import { ref } from 'vue'

interface Props {
  buttons: Array<any>
  title?: string
  radio?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['selected'])

const modules = [Navigation]
const selectedCategories = ref<Record<number, boolean>>({})

function toggleCategory(index: number) {
  if (props.radio) {
    // Якщо кнопка вже активна, деактивуємо її
    if (selectedCategories.value[index]) {
      selectedCategories.value[index] = false
    } else {
      // В режимі radio скидаємо всі вибрані категорії
      for (const key in selectedCategories.value) {
        selectedCategories.value[key] = false
      }
      // Встановлюємо тільки поточну категорію
      selectedCategories.value[index] = true
    }
  } else {
    // Звичайний режим - перемикаємо стан
    selectedCategories.value[index] = !selectedCategories.value[index]
  }
  emitSelectedCategories()
}

function emitSelectedCategories() {
  // Отримуємо вибрані категорії
  const selected = props.buttons
    .filter((_, index) => selectedCategories.value[index])
    .map((category) => category.type || category.value)
    .filter(Boolean)

  // Завжди повертаємо масив, навіть якщо він порожній
  emit('selected', selected || [])
}
</script>

<template>
  <div class="button-slider">
    <div v-if="title" class="button-slider__title">{{ title }}</div>

    <swiper :spaceBetween="5" :slidesPerView="'auto'" :modules="modules" class="button-slider__swiper">
      <swiper-slide
        v-for="(slide, index) in buttons"
        :key="slide.title"
        :class="['button-slider__slide', { 'button-slider__slide_selected': selectedCategories[index] }]"
        @click="toggleCategory(index)"
      >
        {{ slide.title }}
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/vars.scss' as *;

.button-slider {
  width: 100%;

  &__title {
    padding: 0 10px 5px;
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
    border-radius: 10px;
    display: grid;
    grid-template: 1fr auto / 1fr;
    padding: 5px 10px;
    margin-bottom: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    width: fit-content;
    color: $background;

    &_selected {
      background-color: $main-color;
      text-shadow: $main-text-shadow;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>

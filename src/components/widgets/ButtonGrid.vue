<template>
  <div class="button-grid">
    <div v-if="title" class="button-grid__title">{{ title }}</div>

    <div class="button-grid__container">
      <div
        v-for="(button, index) in buttons"
        :key="button.title"
        :class="['button-grid__item', { 'button-grid__item_selected': selectedCategories[index] }]"
        @click="toggleCategory(index)"
      >
        #{{ button.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  buttons: Array<any>
  title?: string
  radio?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['selected'])

const selectedCategories = ref<Record<number, boolean>>({})

function toggleCategory(index: number) {
  if (props.radio) {
    // В режимі radio скидаємо всі вибрані категорії
    for (const key in selectedCategories.value) {
      selectedCategories.value[key] = false
    }
    // Встановлюємо тільки поточну категорію
    selectedCategories.value[index] = true
  } else {
    // Звичайний режим - перемикаємо стан
    selectedCategories.value[index] = !selectedCategories.value[index]
  }
  emitSelectedCategories()
}

function emitSelectedCategories() {
  const selectedValues = props.buttons
    .filter((_, index) => selectedCategories.value[index])
    .map((category) => category.value)
    .flat()
  emit('selected', selectedValues)
}
</script>

<style lang="scss">
@use '@/assets/styles/vars.scss' as *;

.button-grid {
  width: 100%;
  margin-bottom: 20px;

  &__title {
    padding: 0 10px 5px;
    font-size: 16px;
    font-weight: 500;
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px 2px;
    padding: 0 10px;
  }

  &__item {
    background-color: $text;
    border-radius: 10px;
    padding: 5px 10px;
    margin-bottom: 5px;
    margin-right: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    cursor: pointer;
    color: $background;
    text-align: center;
    width: auto;

    &_selected {
      background-color: $main-color;
      text-shadow: $main-text-shadow;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>

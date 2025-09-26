<script setup lang="ts">
import CategorySlider from '@/components/widgets/CategorySlider.vue'
import ButtonGrid from '@/components/widgets/ButtonGrid.vue'
import UiSlider from '@/components/ui/UiSlider.vue'
import { ref, onMounted, computed } from 'vue'
import { getCategories } from '@/mixins/categories'
import ProductCard from '@/components/widgets/ProductCard.vue'
import { sliders } from '@/mixins/resto'
import { useRoute } from 'vue-router'
import { setRestoBlockData } from '@/composable/useRestoBlock'
import { FoodCategory } from '@/mixins/categories'
import { useIsWorkingNow } from '@/composable/useIsWorkingNow'
import type { Category } from '@/mixins/interfaces'
import { tags } from '@/mixins/tags'
import { allRestoCard, request } from '@/composable/useResto'

const route = useRoute()
const selectedCategories = ref<FoodCategory[]>([])
const selectedTags = ref<string[]>([])
const categories = ref<Category[]>([])
const sliderValue = ref(700)

// Викликаємо функцію запиту при монтуванні компонента
onMounted(() => {
  request()
})

const viewResto = computed(() => {
  const data = allRestoCard.value.filter((resto: any) => {
    const tags = []
    let hasCommon = true
    let hasTags = true

    if (selectedCategories.value.length) {
      hasCommon = resto.availabilityCategories.some((item: FoodCategory) => selectedCategories.value.includes(item))
    }

    tags.push(...JSON.parse(resto.selectedPaymentMethod))

    if (useIsWorkingNow(resto.workingDays, resto.workingHours)) {
      tags.push('open')
    }

    if (resto.freeDeliveryFrom) {
      tags.push('free-delivery')
    }

    if (resto.sale) {
      tags.push('sale')
    }

    if (selectedTags.value.length) {
      hasTags = tags.some((item) => selectedTags.value.includes(item))
    }

    resto.tags = tags

    const isMinPrice = resto.minOrder <= sliderValue.value

    return isMinPrice && hasCommon && hasTags
  })

  return data
})

async function getFoodCategories() {
  categories.value = await getCategories('lubny')
}

// Завантажуємо категорії при монтуванні компонента
getFoodCategories()
</script>

<template>
  <CategorySlider
    :categories="categories"
    title="Категорії"
    @selected="selectedCategories = $event"
    :initialSelected="route.query.category ? [parseInt(route.query.category.toString())] : []"
  />

  <ButtonGrid :buttons="tags" title="Теги" @selected="selectedTags = $event" />

  <UiSlider v-model="sliderValue" :max-value="1000" label="Мін. замовлення" />

  <div class="resto-container">
    <ProductCard v-for="restaurant in viewResto" :key="restaurant.title" :slide-data="restaurant" modifier="resto" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.resto-page {
  padding: 20px;
}

.toggle-container {
  display: flex;

  align-items: center;
  justify-content: space-between;
  padding: 10px;

  span {
    font-size: 16px;
  }
}

.ui-tabs {
  margin-top: 25px;
}

.resto-container {
  min-height: 700px;
  padding: 10px;
  margin-top: 20px;
}
</style>

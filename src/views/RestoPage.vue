<template>
  <CategorySlider
    :categories="categories"
    title="Категорії"
    @selected="filterRestaurantsByCategory"
    :initialSelected="route.query.category ? [parseInt(route.query.category.toString())] : []"
  />

  <ButtonSlider :buttons="delivery" title="Спосіб доставки" />

  <ButtonSlider :buttons="payment" title="Спосіб оплати" />

  <ButtonSlider :buttons="offers" title="Пропозиції" />

  <UiSlider v-model="sliderValue" :max-value="2000" label="Мін. замовлення" />

  <div class="resto-container">
    <ProductCard v-for="restaurant in filteredRestaurants" :key="restaurant.title" :slide-data="restaurant" modifier="resto" />
  </div>
</template>

<script setup lang="ts">
import CategorySlider from '@/components/widgets/CategorySlider.vue'
import ButtonSlider from '@/components/widgets/ButtonSlider.vue'
import UiSlider from '@/components/ui/UiSlider.vue'
import { ref, onMounted } from 'vue'
import { categories } from '@/mixins/categories'
import ProductCard from '@/components/widgets/ProductCard.vue'
import { sliders } from '@/mixins/resto'
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedCategories = ref<Record<number, boolean>>({})
const filteredRestaurants = ref(sliders)

onMounted(() => {
  const categoryId = route.query.category
  if (categoryId) {
    const index = categories.findIndex((cat) => cat.id.toString() === categoryId.toString())
    if (index !== -1) {
      selectedCategories.value[index] = true
      filterRestaurantsByCategory([parseInt(categoryId.toString())])
    }
  }
})

const sliderValue = ref(500)

function filterRestaurantsByCategory(categoryIds: number[]) {
  if (categoryIds.length === 0) {
    filteredRestaurants.value = sliders
    return
  }

  // В реальному проекті тут була б логіка фільтрації ресторанів за категоріями
  // Для прикладу просто імітуємо фільтрацію
  filteredRestaurants.value = sliders.filter((_, index) => index % 2 === 0)
}

const payment = ref<Array<any>>([
  {
    title: 'На карту',
    id: 1,
  },
  {
    title: 'Готівкою при отриманні',
    id: 2,
  },
])

const delivery = ref<Array<any>>([
  {
    title: 'Таксі',
    id: 2,
  },
  {
    title: 'Своя служба доставки',
    id: 1,
  },
  {
    title: 'Самовивіз',
    id: 1,
  },
])

const offers = ref<Array<any>>([
  {
    title: 'Безкоштовна доставка',
    id: 1,
  },
  {
    title: 'Акція',
    id: 2,
  },

  {
    title: 'Новинка',
    id: 1,
  },
])
</script>

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

.resto-container,
.menu-container {
  padding: 10px;
  margin-top: 20px;
}
</style>

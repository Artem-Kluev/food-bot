<script setup lang="ts">
import UiTabs from '@/components/ui/UiTabs.vue'
import ProductCard from '@/components/widgets/ProductCard.vue'
import BaseLottie from '@/components/base/BaseLottie.vue'
import { ref, computed, onMounted, onActivated } from 'vue'
import { useLike } from '@/composable/useLike'
import { allRestoCard, request as requestRestoData } from '@/composable/useResto'
import { supabase } from '@/plugins/supabase'

const activeTab = ref(0)
const { restoLikes, foodLikes } = useLike()
const isLoading = ref(true)
const foodItems = ref<any[]>([])

// Локальні копії списків для збереження стану під час перебування на сторінці
const localRestoLikes = ref<number[]>([])
const localFoodLikes = ref<number[]>([])

// Отримуємо збережені ресторани
const favoriteRestos = computed(() => {
  return allRestoCard.value.filter((resto) => localRestoLikes.value.includes(resto.id))
})

// Отримуємо збережену їжу
const favoriteFoods = computed(() => {
  return foodItems.value.filter((food) => localFoodLikes.value.includes(food.id))
})

// Функція для отримання даних про їжу за ID
async function fetchFoodData() {
  if (localFoodLikes.value.length === 0) {
    foodItems.value = []
    return
  }

  try {
    const { data, error } = await supabase.from('menu').select('*').in('id', localFoodLikes.value)

    if (error) {
      console.error('Помилка при завантаженні даних їжі:', error)
      return
    }

    foodItems.value = data || []
  } catch (error) {
    console.error('Помилка при завантаженні даних їжі:', error)
  }
}

// Функція для оновлення даних при активації сторінки
async function refreshData() {
  isLoading.value = true

  // Оновлюємо локальні копії списків лайків
  localRestoLikes.value = [...restoLikes.value]
  localFoodLikes.value = [...foodLikes.value]

  // Завантажуємо дані про ресторани
  await requestRestoData()

  // Завантажуємо дані про їжу
  await fetchFoodData()

  isLoading.value = false
}

// Завантажуємо дані при монтуванні компонента
onMounted(refreshData)

// Оновлюємо дані при активації компонента (коли повертаємось на сторінку)
onActivated(refreshData)

// Оновлюємо дані при зміні вкладки
async function handleTabChange() {
  isLoading.value = true

  // Оновлюємо локальні копії списків лайків
  localRestoLikes.value = [...restoLikes.value]
  localFoodLikes.value = [...foodLikes.value]

  if (activeTab.value === 0) {
    // Оновлюємо дані ресторанів при перемиканні на вкладку ресторанів
    await requestRestoData()
  } else if (activeTab.value === 1) {
    // Оновлюємо дані меню при перемиканні на вкладку меню
    await fetchFoodData()
  }

  isLoading.value = false
}
</script>

<template>
  <div class="favorite-page">
    <!-- <h1 class="favorite-page__title">Обране</h1> -->

    <UiTabs v-model="activeTab" :tabs="['Ресторани', 'Їжа']" class="ui-tabs" @update:modelValue="handleTabChange" />

    <div v-if="isLoading" class="favorite-page__loading">
      <BaseLottie class="favorite-page__animation" :src="'/animations/5/animate.json'" :loop="true" :autoplay="true" />
    </div>

    <div v-else class="favorite-page__cards">
      <div v-if="activeTab === 0" class="resto-container">
        <template v-if="favoriteRestos.length > 0">
          <ProductCard v-for="restaurant in favoriteRestos" :key="restaurant.id" :slide-data="restaurant" modifier="resto" />
        </template>
        <div v-else class="favorite-page__empty">У вас немає збережених ресторанів</div>
      </div>

      <div v-else-if="activeTab === 1" class="menu-container">
        <template v-if="favoriteFoods.length > 0">
          <ProductCard v-for="item in favoriteFoods" :key="item.id" :slide-data="item" modifier="food" />
        </template>
        <div v-else class="favorite-page__empty">У вас немає збереженої їжі</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.favorite-page {
  padding: 10px 0;

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: $text;
    padding: 0 10px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__empty {
    text-align: center;
    padding: 40px 0;
    color: $text;
    font-size: 18px;
  }

  &__loading {
    text-align: center;
    color: $text;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 150px);
  }

  &__animation {
    width: 100px;
    height: 100px;
  }

  &__cards {
    padding: 10px;
    margin-top: 20px;
  }
}
</style>

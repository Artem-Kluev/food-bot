import { ref } from 'vue'
import type { Food, Resto } from '@/mixins/interfaces'
import { closeRestoBlock } from './useRestoBlock'

export const isFoodBlockVisable = ref(false)
export const currentFood = ref<Food | null>(null)
export const isLiked = ref(false)
export const rating = ref(0)
export const currentResto = ref<Resto | null>(null)

export function closeFoodBlock(closeResto = false) {
  if (closeResto) closeRestoBlock()

  isFoodBlockVisable.value = false
}

// Функція для зміни всіх даних в FoodBlock
export function setFoodBlockData({
  food,
  resto,
  liked = false,
  foodRating,
}: {
  food: Food
  resto?: Resto
  liked?: boolean
  foodRating?: number
}) {
  currentFood.value = food
  isLiked.value = liked
  rating.value = foodRating || food.rating || 0

  if (resto) {
    currentResto.value = resto
  } else if (food.restoId) {
    // Якщо resto не передано, але є restoId, можна додати логіку
    // для отримання даних ресторану за restoId
    currentResto.value = {
      title: 'Ресторан',
      image: '/images/resto/resto_1.webp',
      type: 'resto',
      description: 'Опис ресторану',
      rating: 4.3,
      id: food.restoId,
    }
  }

  isFoodBlockVisable.value = true
}

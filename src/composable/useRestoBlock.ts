import { ref } from 'vue'
import type { Resto } from '@/mixins/interfaces'
import { closeFoodBlock } from './useFoodBlock'

export const isRestoBlockVisable = ref(false)
export const currentResto = ref<Resto | null>(null)
export const isLiked = ref(false)
export const rating = ref(0)

export function closeRestoBlock(closeFood = true) {
  if (closeFood) closeFoodBlock()

  isRestoBlockVisable.value = false
}

// Функція для зміни всіх даних в RestoBlock
export function setRestoBlockData({ resto, liked = false, restoRating }: { resto: Resto; liked?: boolean; restoRating?: number }) {
  currentResto.value = resto
  isLiked.value = liked
  rating.value = restoRating || resto.rating || 0

  isRestoBlockVisable.value = true
}

import { ref } from 'vue'
import type { LikeType } from '@/mixins/interfaces'
import { userData } from '@/composable/useUserSupabase'

// Глобальні реактивні стани лайків (синхронізуються між компонентами)
const restoLikes = ref<number[]>([])
const foodLikes = ref<number[]>([])

// Ініціалізація лайків з сервера
async function initLikesFromServer() {
  try {
    const data = await userData()
    const row = data?.res?.data?.[0] || {}

    const favoritesFood = (row.favoritesFood || []) as Array<string>
    const favoritesResto = (row.favoritesResto || []) as Array<string>

    // Перетворюємо значення з сервера (рядки) у числа для локальної логіки
    foodLikes.value = favoritesFood.map((id) => Number(id)).filter((n) => !Number.isNaN(n))
    restoLikes.value = favoritesResto.map((id) => Number(id)).filter((n) => !Number.isNaN(n))
  } catch (e) {
    console.error('Не вдалося ініціалізувати лайки з сервера:', e)
    // У разі помилки лишаємо порожні масиви
    foodLikes.value = []
    restoLikes.value = []
  }
}

// Оновлення лайків на сервері після локальних змін
async function persistLikesToServer() {
  try {
    const favoritesFood = foodLikes.value.map((id) => String(id))
    const favoritesResto = restoLikes.value.map((id) => String(id))

    await userData({ favoritesFood, favoritesResto })
  } catch (e) {
    console.error('Не вдалося зберегти лайки на сервері:', e)
  }
}

// Основний composable для роботи з лайками
export function useLike() {
  // Перевірка чи є лайк для конкретного id та типу
  function isLiked(id: number, type: LikeType): boolean {
    const likes = type === 'resto' ? restoLikes.value : foodLikes.value
    return likes.includes(id)
  }

  // Додавання/видалення лайку (локально) та асинхронне збереження на сервері
  function toggleLike(id: number, type: LikeType): boolean {
    const likes = type === 'resto' ? restoLikes.value : foodLikes.value
    const likeIndex = likes.indexOf(id)
    let isNowLiked = false

    if (likeIndex === -1) {
      likes.push(id)
      isNowLiked = true
    } else {
      likes.splice(likeIndex, 1)
      isNowLiked = false
    }

    // Асинхронно синхронізуємо поточні списки лайків із сервером
    persistLikesToServer().catch((e) => console.error(e))

    return isNowLiked
  }

  return {
    isLiked,
    toggleLike,
    restoLikes,
    foodLikes,
  }
}

// Ініціалізуємо лайки при завантаженні модуля
initLikesFromServer()

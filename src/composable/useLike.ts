import { ref } from 'vue'
import type { LikeType } from '@/mixins/interfaces'

// Ключі для localStorage
const RESTO_LIKES_KEY = 'resto_likes'
const FOOD_LIKES_KEY = 'food_likes'

// Створюємо глобальні реактивні стани для лайків
// Це дозволить синхронізувати стан між різними компонентами
const restoLikes = ref<number[]>([])
const foodLikes = ref<number[]>([])

// Функція для отримання лайків з localStorage
function getLikesFromStorage(type: LikeType): number[] {
  const storageKey = type === 'resto' ? RESTO_LIKES_KEY : FOOD_LIKES_KEY
  const storedLikes = localStorage.getItem(storageKey)
  return storedLikes ? JSON.parse(storedLikes) : []
}

// Функція для збереження лайків в localStorage
function saveLikesToStorage(type: LikeType, likes: number[]): void {
  const storageKey = type === 'resto' ? RESTO_LIKES_KEY : FOOD_LIKES_KEY
  localStorage.setItem(storageKey, JSON.stringify(likes))
}

// Ініціалізуємо стан з localStorage при завантаженні
restoLikes.value = getLikesFromStorage('resto')
foodLikes.value = getLikesFromStorage('food')

// Основний composable для роботи з лайками
export function useLike() {
  // Перевірка чи є лайк для конкретного id та типу
  function isLiked(id: number, type: LikeType): boolean {
    const likes = type === 'resto' ? restoLikes.value : foodLikes.value
    return likes.includes(id)
  }

  // Додавання/видалення лайку
  function toggleLike(id: number, type: LikeType): boolean {
    const likes = type === 'resto' ? restoLikes.value : foodLikes.value
    const likeIndex = likes.indexOf(id)
    let isNowLiked = false

    if (likeIndex === -1) {
      // Додаємо лайк
      likes.push(id)
      isNowLiked = true
    } else {
      // Видаляємо лайк
      likes.splice(likeIndex, 1)
      isNowLiked = false
    }

    // Зберігаємо оновлений список в localStorage
    saveLikesToStorage(type, likes)

    // Повертаємо новий стан лайку
    return isNowLiked
  }

  return {
    isLiked,
    toggleLike,
    restoLikes,
    foodLikes,
  }
}

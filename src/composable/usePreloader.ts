import { ref } from 'vue'

// Створюємо глобальний стан для прелоадера
const isPreloaderActive = ref(false)

/**
 * Composable функція для керування прелоадером з будь-якого місця в проекті
 */
export function usePreloader() {
  /**
   * Показати прелоадер
   */
  function showPreloader() {
    isPreloaderActive.value = true
  }

  /**
   * Сховати прелоадер
   */
  function hidePreloader() {
    setTimeout(() => {
      isPreloaderActive.value = false
    }, 300)
  }

  /**
   * Перемикання стану прелоадера
   */
  function togglePreloader() {
    isPreloaderActive.value = !isPreloaderActive.value
  }

  return {
    isPreloaderActive,
    showPreloader,
    hidePreloader,
    togglePreloader,
  }
}

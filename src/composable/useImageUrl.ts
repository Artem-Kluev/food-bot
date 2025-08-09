/**
 * Composable для роботи з URL зображень
 */

export function useImageUrl() {
  /**
   * Функція для створення URL зображення
   */
  function getImageUrl(path: string): string {
    // Видаляємо '/public' з шляху, якщо він є
    const cleanPath = path.startsWith('/public') ? path.replace('/public', '') : path
    return new URL(`/public${cleanPath}`, import.meta.url).href
  }

  return {
    getImageUrl
  }
}
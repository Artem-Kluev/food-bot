export {} // Щоб файл вважався модулем

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        expand: () => void
        // Тут можна додати інші методи, якщо потрібно
        [key: string]: any
      }
    }
  }
}

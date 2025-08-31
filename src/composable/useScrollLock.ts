import { onUnmounted } from 'vue'

// Глобальний лічильник блокувань скролу для підтримки вкладених модальних вікон
let lockCount = 0

export function useScrollLock() {
  let scrollPosition = 0
  let isLocked = false
  let scrollbarWidth = 0

  // Функція для обчислення ширини смуги прокрутки
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth
  }

  function lockScroll() {
    if (isLocked) return

    // Зберігаємо поточну позицію скролу
    scrollPosition = window.scrollY

    // Обчислюємо ширину смуги прокрутки перед блокуванням
    scrollbarWidth = getScrollbarWidth()

    // Збільшуємо глобальний лічильник блокувань
    lockCount++

    // Блокуємо скрол тільки якщо це перше блокування
    if (lockCount === 1) {
      // Додаємо padding-right для компенсації зниклої смуги прокрутки
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`

        // Додаємо відступ до елементів з атрибутом data-scroll-gap
        const elementsWithScrollGap = document.querySelectorAll('[data-scroll-gap]')
        elementsWithScrollGap.forEach((element: Element) => {
          ;(element as HTMLElement).style.paddingRight = `${scrollbarWidth}px`
        })
      }

      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPosition}px`
      document.body.style.width = '100%'
    }

    isLocked = true
  }

  function unlockScroll() {
    if (!isLocked) return

    // Зменшуємо глобальний лічильник блокувань
    lockCount = Math.max(0, lockCount - 1)

    // Розблоковуємо скрол тільки якщо це останнє розблокування
    if (lockCount === 0) {
      setTimeout(() => {
        document.body.style.removeProperty('overflow')
        document.body.style.removeProperty('position')
        document.body.style.removeProperty('top')
        document.body.style.removeProperty('width')
        document.body.style.paddingRight = '0'

        // Видаляємо відступи з елементів з атрибутом data-scroll-gap
        const elementsWithScrollGap = document.querySelectorAll('[data-scroll-gap]')
        elementsWithScrollGap.forEach((element: Element) => {
          ;(element as HTMLElement).style.paddingRight = '0'
        })

        window.scrollTo(0, scrollPosition)
      }, 300)
    }

    isLocked = false
  }

  onUnmounted(() => {
    if (isLocked) {
      unlockScroll()
    }
  })

  return {
    lockScroll,
    unlockScroll,
    isLocked: () => isLocked,
  }
}

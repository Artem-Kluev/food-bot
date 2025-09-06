import { onMounted, onUnmounted } from 'vue'

export default function useElementObserver() {
  let observer: IntersectionObserver | null = null

  function initObserver() {
    // Створюємо IntersectionObserver
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Якщо елемент став видимим
        if (entry.isIntersecting) {
          // Перевіряємо, чи має елемент клас observer-custom
          if (entry.target.classList.contains('observer-custom')) {
            // Додаємо клас show-custom для кастомних елементів
            entry.target.classList.add('show-custom')
          } else {
            // Додаємо клас show для звичайних елементів
            entry.target.classList.add('show')
          }
          // Припиняємо спостереження за цим елементом, оскільки клас вже не має зникати
          observer?.unobserve(entry.target)
        }
      })
    })

    // Знаходимо всі елементи з класом observer та observer-custom
    const elements = document.querySelectorAll('.observer, .observer-custom')

    // Починаємо спостереження за кожним елементом
    elements.forEach((el) => {
      observer?.observe(el)
    })
  }

  // Функція для спостереження за новими елементами, які можуть з'явитися після ініціалізації
  function observeNewElements() {
    // Створюємо MutationObserver для відстеження змін у DOM
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Перевіряємо нові вузли
        mutation.addedNodes.forEach((node) => {
          // Перевіряємо, чи є вузол елементом
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Перевіряємо, чи має елемент клас observer або observer-custom
            if ((node as Element).classList?.contains('observer') || (node as Element).classList?.contains('observer-custom')) {
              observer?.observe(node as Element)
            }

            // Перевіряємо дочірні елементи
            const childObservers = (node as Element).querySelectorAll('.observer, .observer-custom')
            childObservers.forEach((el) => {
              observer?.observe(el)
            })
          }
        })
      })
    })

    // Починаємо спостереження за змінами в DOM
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    })

    // Повертаємо функцію для зупинки спостереження
    return () => mutationObserver.disconnect()
  }

  onMounted(() => {
    // Ініціалізуємо IntersectionObserver
    initObserver()

    // Починаємо спостереження за новими елементами
    const stopObservingNewElements = observeNewElements()

    // Зупиняємо спостереження при розмонтуванні компонента
    onUnmounted(() => {
      observer?.disconnect()
      observer = null
      stopObservingNewElements()
    })
  })
}

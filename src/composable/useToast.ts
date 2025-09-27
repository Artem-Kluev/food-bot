import { createApp, ref } from 'vue'
import UiToast from '@/components/ui/UiToast.vue'

interface ToastOptions {
  message: string
  type?: 'success' | 'error' | 'info'
  icon?: string
  duration?: number
}

const activeToasts = ref<any[]>([])

function showToast(options: ToastOptions) {
  // Створюємо контейнер для тосту
  const toastContainer = document.createElement('div')
  document.body.appendChild(toastContainer)

  // Створюємо Vue додаток з компонентом тосту
  const toastApp = createApp(UiToast, {
    ...options,
    onDestroy: () => {
      // Видаляємо тост з DOM після завершення анімації
      setTimeout(() => {
        if (toastContainer.parentNode) {
          toastContainer.parentNode.removeChild(toastContainer)
        }
        toastApp.unmount()
        
        // Видаляємо з активних тостів
        const index = activeToasts.value.indexOf(toastApp)
        if (index > -1) {
          activeToasts.value.splice(index, 1)
        }
      }, 300) // Час анімації fade-out
    }
  })

  // Монтуємо додаток
  toastApp.mount(toastContainer)
  
  // Додаємо до активних тостів
  activeToasts.value.push(toastApp)

  return toastApp
}

export function useToast() {
  function success(message: string, options?: Partial<ToastOptions>) {
    return showToast({
      message,
      type: 'success',
      icon: 'check-icon',
      ...options
    })
  }

  function error(message: string, options?: Partial<ToastOptions>) {
    return showToast({
      message,
      type: 'error',
      icon: 'close-icon',
      ...options
    })
  }

  function info(message: string, options?: Partial<ToastOptions>) {
    return showToast({
      message,
      type: 'info',
      icon: 'info-icon',
      ...options
    })
  }

  function show(message: string, options?: Partial<ToastOptions>) {
    return showToast({
      message,
      ...options
    })
  }

  return {
    success,
    error,
    info,
    show
  }
}
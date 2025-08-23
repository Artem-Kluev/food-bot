import { ref, watch } from 'vue'

interface BasketProduct {
  id: number
  count: number
  price: number
  title: string
  image: string
  restoId: number
}

type BasketChangeCallback = (products: BasketProduct[]) => void

interface BasketReturn {
  on: (callback: BasketChangeCallback) => () => void
  add: (product: Omit<BasketProduct, 'count'>, count?: number) => void
  remove: (productId: number) => void
  getProduct: (productId: number) => BasketProduct | null
  getAllProduct: () => BasketProduct[]
  clear: () => void
  getTotalPrice: () => number
  restoId: import('vue').Ref<number | null>
}

let singleton: BasketReturn | null = null

export function useBasket(): BasketReturn {
  if (!singleton) singleton = basket()

  return singleton
}

function basket(): BasketReturn {
  const STORAGE_KEY = 'telegram-food-basket'
  const products = ref<BasketProduct[]>([])
  const restoId = ref<number | null>(null)
  const callbacks: BasketChangeCallback[] = []

  function init() {
    const storedData = localStorage.getItem(STORAGE_KEY)
    if (storedData) {
      try {
        products.value = JSON.parse(storedData)

        // Встановлюємо restoId з першого продукту, якщо він є
        if (products.value.length > 0 && products.value[0].restoId) {
          restoId.value = products.value[0].restoId
        }
      } catch (error) {
        console.error('Помилка при завантаженні кошика:', error)
        products.value = []
      }
    } else {
    }
  }

  // Збереження даних в localStorage
  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products.value))
    notifyCallbacks()
  }

  // Сповіщення всіх підписників про зміни
  function notifyCallbacks() {
    callbacks.forEach((callback) => callback([...products.value]))
  }

  // Підписка на зміни в кошику
  function on(callback: BasketChangeCallback) {
    callbacks.push(callback)
    // Відразу викликаємо callback з поточними даними
    callback([...products.value])

    // Повертаємо функцію для відписки
    return () => {
      const index = callbacks.indexOf(callback)
      if (index !== -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  // Додавання продукту в кошик
  function add(product: Omit<BasketProduct, 'count'>, count = 1) {
    // Перевіряємо наявність необхідних полів
    if (!product.id || !product.title || !product.image || !product.price || !product.restoId) {
      console.error("Неможливо додати продукт: відсутні обов'язкові поля", product)
      return
    }

    // Якщо restoId не встановлено, встановлюємо його з першого продукту
    if (restoId.value === null) {
      restoId.value = product.restoId
    }

    // // Перевіряємо, чи продукт з того ж ресторану
    // if (restoId.value !== null && product.restoId !== restoId.value) {
    //   // Якщо продукт з іншого ресторану, очищаємо кошик перед додаванням
    //   products.value = []
    //   restoId.value = product.restoId
    // }

    const existingProductIndex = products.value.findIndex((p) => p.id === product.id)

    if (existingProductIndex !== -1) {
      // Якщо продукт вже є в кошику, оновлюємо кількість
      products.value[existingProductIndex].count = count
    } else {
      // Якщо продукту немає, додаємо новий
      products.value.push({
        ...product,
        count,
      })
    }

    saveToStorage()
  }

  // Видалення продукту з кошика
  function remove(productId: number) {
    const index = products.value.findIndex((p) => p.id === productId)
    if (index !== -1) {
      products.value.splice(index, 1)
      saveToStorage()
    }

    if (products.value.length === 0) restoId.value = null
  }

  // Отримання продукту за id
  function getProduct(productId: number) {
    const product = products.value.find((p) => p.id === productId) || null

    return product
  }

  // Отримання всіх продуктів
  function getAllProduct() {
    return [...products.value]
  }

  // Очищення кошика
  function clear() {
    products.value = []
    restoId.value = null
    saveToStorage()
  }

  // Отримання загальної суми покупок
  function getTotalPrice() {
    return products.value.reduce((total, product) => {
      return total + product.price * product.count
    }, 0)
  }

  // Ініціалізуємо дані при створенні
  init()

  return {
    on,
    add,
    remove,
    getProduct,
    getAllProduct,
    clear,
    getTotalPrice,
    restoId,
  }
}

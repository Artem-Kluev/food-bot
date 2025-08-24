import { ref } from 'vue'
import { useBasket } from './useBasket'
import { createOrder } from '@/mixins/create-order'
import { useRouter } from 'vue-router'
import type { OrderProduct } from '@/mixins/interfaces'

// Стан видимості форми замовлення
const isOrderFormVisible = ref(false)

// Дані форми
const orderAddress = ref('')
const orderPhone = ref('')
const orderPaymentMethod = ref('card') // За замовчуванням - оплата карткою
const isSubmitting = ref(false)

// Функція для відкриття форми
function openOrderForm() {
  isOrderFormVisible.value = true
}

// Функція для закриття форми
function closeOrderForm() {
  isOrderFormVisible.value = false
}

// Функція для скидання даних форми
function resetOrderForm() {
  orderAddress.value = ''
  orderPhone.value = ''
  orderPaymentMethod.value = 'card'
  isSubmitting.value = false
}

// Функція для відправки замовлення
function submitOrder() {
  const router = useRouter()
  const { getAllProduct, getTotalPrice, clear } = useBasket()

  if (!orderAddress.value || !orderPhone.value) {
    alert('Будь ласка, заповніть всі поля')
    return
  }

  isSubmitting.value = true

  // Перетворюємо продукти з кошика у формат для замовлення
  const products = getAllProduct()
  const orderProducts: OrderProduct[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    image: product.image,
    price: product.price,
    count: product.count,
  }))

  // Створюємо нове замовлення
  createOrder(orderProducts, orderAddress.value, orderPhone.value, orderPaymentMethod.value as 'card' | 'cash', getTotalPrice())

  // Очищаємо кошик
  clear()

  // Закриваємо форму і скидаємо дані
  closeOrderForm()
  resetOrderForm()

  // Перенаправляємо на сторінку замовлень
  router.push('/orders')
}

export {
  isOrderFormVisible,
  orderAddress,
  orderPhone,
  orderPaymentMethod,
  isSubmitting,
  openOrderForm,
  closeOrderForm,
  resetOrderForm,
  submitOrder,
}

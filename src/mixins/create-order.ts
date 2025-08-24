import type { Order, OrderProduct } from './interfaces'
import { orders } from './orders'

// Функція для створення нового замовлення
export function createOrder(products: OrderProduct[], address: string, phone: string, paymentMethod: 'card' | 'cash', totalPrice: number): Order {
  const newOrder: Order = {
    id: orders.length > 0 ? Math.max(...orders.map(order => order.id)) + 1 : 1,
    date: new Date().toISOString(),
    status: 'processing',
    products,
    address,
    phone,
    paymentMethod,
    totalPrice
  }
  
  // Додаємо нове замовлення в масив
  orders.unshift(newOrder)
  
  // Зберігаємо замовлення в localStorage
  saveOrdersToStorage()
  
  return newOrder
}

// Функція для збереження замовлень в localStorage
function saveOrdersToStorage() {
  localStorage.setItem('telegram-food-orders', JSON.stringify(orders))
}

// Функція для завантаження замовлень з localStorage
export function loadOrdersFromStorage() {
  const storedOrders = localStorage.getItem('telegram-food-orders')
  if (storedOrders) {
    try {
      const parsedOrders = JSON.parse(storedOrders)
      orders.splice(0, orders.length, ...parsedOrders)
    } catch (error) {
      console.error('Помилка при завантаженні замовлень:', error)
    }
  }
}

// Ініціалізація - завантаження замовлень при імпорті модуля
loadOrdersFromStorage()
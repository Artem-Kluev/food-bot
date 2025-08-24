import type { Order, OrderProduct } from './interfaces'

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
function loadOrdersFromStorage() {
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

export const orders: Order[] = [
  {
    id: 1,
    date: '2023-12-15T14:30:00',
    status: 'completed',
    totalPrice: 450,
    products: [
      {
        id: 101,
        title: 'Піца Маргарита',
        price: 180,
        count: 1,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 102,
        title: 'Салат Цезар',
        price: 120,
        count: 1,
        image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 103,
        title: 'Кока-кола',
        price: 30,
        count: 5,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    address: 'вул. Шевченка, 10, кв. 5',
    paymentMethod: 'card',
  },
  {
    id: 2,
    date: '2023-12-20T19:15:00',
    status: 'completed',
    totalPrice: 350,
    products: [
      {
        id: 201,
        title: 'Суші Філадельфія',
        price: 250,
        count: 1,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 202,
        title: 'Місо суп',
        price: 100,
        count: 1,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    address: 'вул. Франка, 25, кв. 12',
    paymentMethod: 'cash',
  },
  {
    id: 3,
    date: '2024-01-05T12:45:00',
    status: 'processing',
    totalPrice: 520,
    products: [
      {
        id: 301,
        title: 'Бургер Класичний',
        price: 160,
        count: 2,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 302,
        title: 'Картопля фрі',
        price: 80,
        count: 1,
        image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 303,
        title: 'Мілкшейк ванільний',
        price: 120,
        count: 1,
        image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    address: 'вул. Лесі Українки, 5, кв. 3',
    paymentMethod: 'card',
  },
  {
    id: 4,
    date: '2024-01-10T20:30:00',
    status: 'canceled',
    totalPrice: 280,
    products: [
      {
        id: 401,
        title: 'Паста Карбонара',
        price: 180,
        count: 1,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 402,
        title: 'Тірамісу',
        price: 100,
        count: 1,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    address: 'вул. Коцюбинського, 15, кв. 7',
    paymentMethod: 'cash',
  },
  {
    id: 5,
    date: '2024-01-15T13:20:00',
    status: 'completed',
    totalPrice: 420,
    products: [
      {
        id: 501,
        title: 'Піца Пепероні',
        price: 220,
        count: 1,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 502,
        title: 'Грецький салат',
        price: 150,
        count: 1,
        image: 'https://images.unsplash.com/photo-1608032077018-c9aad9565d29?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 503,
        title: 'Чізкейк',
        price: 50,
        count: 1,
        image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    address: 'вул. Сагайдачного, 8, кв. 2',
    paymentMethod: 'card',
  },
]

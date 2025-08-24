import type { Food } from './interfaces'

export interface Order {
  id: number
  date: string
  status: 'completed' | 'processing' | 'canceled' | 'awaiting_payment' | 'delivering'
  totalPrice: number
  products: Array<{
    id: number
    title: string
    price: number
    count: number
    image: string
  }>
  address: string
  paymentMethod: 'cash' | 'card'
  restaurant?: {
    title: string
    description: string
    image: string
    rating: number
  }
}

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
    restaurant: {
      title: 'Піца Плюс',
      description: 'Найкраща піцерія міста з італійською кухнею',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
      rating: 4.8,
    },
  },
  {
    id: 2,
    date: '2023-12-20T10:15:00',
    status: 'awaiting_payment',
    totalPrice: 320,
    products: [
      {
        id: 201,
        title: 'Бургер Класичний',
        price: 160,
        count: 1,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 202,
        title: 'Картопля фрі',
        price: 80,
        count: 2,
        image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    address: 'вул. Франка, 25, кв. 12',
    paymentMethod: 'card',
    restaurant: {
      title: 'Бургер Кінг',
      description: 'Найсмачніші бургери та фаст-фуд',
      image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1000&auto=format&fit=crop',
      rating: 4.5,
    },
  },
  {
    id: 3,
    date: '2023-12-21T14:45:00',
    status: 'delivering',
    totalPrice: 550,
    products: [
      {
        id: 301,
        title: 'Суші-сет Філадельфія',
        price: 450,
        count: 1,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop',
      },
      {
        id: 302,
        title: 'Місо-суп',
        price: 100,
        count: 1,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1000&auto=format&fit=crop',
      },
    ],
    address: 'вул. Лесі Українки, 8, кв. 3',
    paymentMethod: 'cash',
    restaurant: {
      title: 'Суші Майстер',
      description: 'Автентична японська кухня та суші',
      image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=1000&auto=format&fit=crop',
      rating: 4.9,
    },
  },
  {
    id: 4,
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
    restaurant: {
      title: 'Токіо Суші',
      description: 'Традиційна японська кухня та суші',
      image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1000&auto=format&fit=crop',
      rating: 4.7,
    },
  },
  {
    id: 5,
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
    restaurant: {
      title: 'Бургер Хаус',
      description: 'Найкращі бургери та американська кухня',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop',
      rating: 4.6,
    },
  },
  {
    id: 6,
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
    restaurant: {
      title: 'Італія на тарілці',
      description: 'Справжня італійська кухня та паста',
      image: 'https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?q=80&w=1000&auto=format&fit=crop',
      rating: 4.4,
    },
  },
  {
    id: 7,
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
    address: 'вул. Шевченка, 5, кв. 10',
    paymentMethod: 'card',
    restaurant: {
      title: 'Піца Хат',
      description: 'Найсмачніша піца в місті',
      image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=1000&auto=format&fit=crop',
      rating: 4.7,
    },
  },
]

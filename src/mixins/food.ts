import type { Food } from '@/mixins/interfaces'

export const foodSliders: Array<Food> = [
  {
    title: 'Швидко суші',
    image: '/images/eats/eat_1.webp',
    type: 'food',
    tags: [
      {
        title: 'Безкоштовна доставка',
        background: '#2f7d13',
      },
    ],
    rating: 8,
    price: {
      base: 149,
    },
    id: 1,
    restoId: 101,
  },
  {
    title: 'Піца Маргарита',
    image: '/images/eats/eat_2.webp',
    type: 'food',
    tags: [
      {
        title: 'Популярне',
        background: '#cc3204',
      },
    ],
    rating: 9,
    price: {
      base: 199,
      old: 249,
    },
    id: 2,
    restoId: 102,
  },
  {
    title: 'Бургер класичний',
    image: '/images/eats/eat_3.webp',
    type: 'food',
    tags: [
      {
        title: 'Хіт продажів',
        background: '#ff4a15',
      },
    ],
    rating: 7,
    price: {
      base: 159,
    },
    id: 3,
    restoId: 103,
  },
  {
    title: 'Салат Цезар',
    image: '/images/eats/eat_4.webp',
    type: 'food',
    rating: 3,
    price: {
      base: 129,
    },
    id: 4,
    restoId: 104,
  },
  {
    title: 'Паста Карбонара',
    image: '/images/eats/eat_5.webp',
    type: 'food',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
    rating: 8,
    price: {
      base: 179,
    },
    id: 5,
    restoId: 105,
  },
  {
    title: 'Стейк Рібай',
    image: '/images/eats/eat_6.webp',
    type: 'food',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
    rating: 9,
    price: {
      base: 399,
    },
    id: 6,
    restoId: 106,
  },
  {
    title: 'Суп грибний',
    image: '/images/eats/eat_7.webp',
    type: 'food',
    rating: 6,
    price: {
      base: 99,
    },
    id: 7,
    restoId: 107,
  },
  {
    title: 'Десерт Тірамісу',
    image: '/images/eats/eat_1.webp',
    type: 'food',
    tags: [
      {
        title: 'Солодощі',
        background: '#ff4a15',
      },
    ],
    rating: 9,
    price: {
      base: 129,
    },
    id: 9,
    restoId: 109,
  },
  {
    title: 'Морепродукти гриль',
    image: '/images/eats/eat_2.webp',
    type: 'food',
    tags: [
      {
        title: 'Морепродукти',
        background: '#ff4a15',
      },
    ],
    rating: 8,
    price: {
      base: 299,
      old: 349,
    },
    id: 10,
    restoId: 110,
  },
  {
    title: 'Вегетаріанська піца',
    image: '/images/eats/eat_3.webp',
    type: 'food',
    tags: [
      {
        title: 'Вегетаріанське',
        background: '#ff4a15',
      },
    ],
    rating: 7,
    price: {
      base: 189,
    },
    id: 11,
    restoId: 111,
  },
]

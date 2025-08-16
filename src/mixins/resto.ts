import type { Slide } from '@/mixins/interfaces'

export const sliders: Array<Slide> = [
  {
    title: 'Швидко суші',
    image: '/images/resto/resto_1.webp',
    type: 'resto',
    tags: [
      {
        title: 'Безкоштовна доставка',
        background: '#2f7d13',
      },
    ],
    rating: 8,
    time: 25,
  },
  {
    title: 'Піца Маргарита',
    image: '/images/resto/resto_2.webp',
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
  },
  {
    title: 'Бургер класичний',
    image: '/images/resto/resto_3.webp',
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
  },
  {
    title: 'Салат Цезар',
    image: '/images/resto/resto_4.webp',
    type: 'food',
    rating: 3,
    price: {
      base: 129,
    },
  },
  {
    title: 'Паста Карбонара',
    image: '/images/resto/resto_5.webp',
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
  },
  {
    title: 'Стейк Рібай',
    image: '/images/resto/resto_6.webp',
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
  },
  {
    title: 'Суп грибний',
    image: '/images/resto/resto_7.webp',
    type: 'food',
    rating: 6,
    price: {
      base: 99,
    },
  },
  {
    title: 'Десерт Тірамісу',
    image: '/images/resto/resto_1.webp',
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
  },
  {
    title: 'Морепродукти гриль',
    image: '/images/resto/resto_2.webp',
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
  },
  {
    title: 'Вегетаріанська піца',
    image: '/images/resto/resto_3.webp',
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
  },
]

export const popularRestaurants: Array<Slide> = [
  {
    title: 'Італійська кухня "Bella Italia"',
    image: '/images/resto/resto_3.webp',
    tags: [
      {
        title: 'Італійська кухня',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Сімейний ресторан "Затишок"',
    image: '/images/resto/resto_1.webp',
    tags: [
      {
        title: 'Сімейний',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Стейк-хаус "М\'ясо і вино"',
    image: '/images/resto/resto_6.webp',
    tags: [
      {
        title: 'Стейки',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Морський ресторан "Хвилі"',
    image: '/images/resto/resto_2.webp',
    tags: [
      {
        title: 'Морепродукти',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Азіатський фьюжн "Східні спеції"',
    image: '/images/resto/resto_5.webp',
    tags: [
      {
        title: 'Азіатська кухня',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Кав\'ярня-пекарня "Аромат"',
    image: '/images/resto/resto_4.webp',
    tags: [
      {
        title: 'Свіжа випічка',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Вегетаріанське кафе "Зелень"',
    image: '/images/resto/resto_7.webp',
    tags: [
      {
        title: 'Вегетаріанське',
        background: '#ff4a15',
      },
    ],
  },
]

export const newRestaurants: Array<Slide> = [
  {
    title: 'Бургер-бар "Соковитий"',
    image: '/images/resto/resto_4.webp',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Піцерія "Неаполь"',
    image: '/images/resto/resto_2.webp',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Суші-бар "Токіо"',
    image: '/images/resto/resto_7.webp',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Грузинський ресторан "Сакартвело"',
    image: '/images/resto/resto_6.webp',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Паб "Старий дуб"',
    image: '/images/resto/resto_5.webp',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Французька пекарня "Круасан"',
    image: '/images/resto/resto_1.webp',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Вінотека "Бордо"',
    image: '/images/resto/resto_3.webp',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
]

export const discountRestaurants: Array<Slide> = [
  {
    title: 'Ресторан "Смачно і точка"',
    image: '/images/resto/resto_5.webp',
    tags: [
      {
        title: 'Знижка 20%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Тайський ресторан "Том Ям"',
    image: '/images/resto/resto_7.webp',
    tags: [
      {
        title: 'Знижка 15%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Піцерія "Маргарита"',
    image: '/images/resto/resto_3.webp',
    tags: [
      {
        title: 'Знижка 25%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Кафе "Сніданки 24/7"',
    image: '/images/resto/resto_1.webp',
    tags: [
      {
        title: 'Знижка 10%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Стейк-хаус "Ранчо"',
    image: '/images/resto/resto_6.webp',
    tags: [
      {
        title: 'Знижка 30%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Суші-бар "Сакура"',
    image: '/images/resto/resto_2.webp',
    tags: [
      {
        title: 'Знижка 15%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Кав\'ярня "Еспресо"',
    image: '/images/resto/resto_4.webp',
    tags: [
      {
        title: 'Знижка 20%',
        background: '#ff4a15',
      },
    ],
  },
]

export const premiumRestaurants: Array<Slide> = [
  {
    title: 'Ресторан високої кухні "Гурман"',
    image: '/images/resto/resto_6.webp',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Винний ресторан "Бордо"',
    image: '/images/resto/resto_3.webp',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Японський ресторан "Кіото"',
    image: '/images/resto/resto_7.webp',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Панорамний ресторан "Висота"',
    image: '/images/resto/resto_2.webp',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Ресторан молекулярної кухні "Елемент"',
    image: '/images/resto/resto_5.webp',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Ресторан-сад "Едем"',
    image: '/images/resto/resto_1.webp',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Стейк-хаус "Прайм"',
    image: '/images/resto/resto_4.webp',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
]

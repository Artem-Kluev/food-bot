import type { Slide } from '@/mixins/interfaces'
import { useImageUrl } from '@/composable/useImageUrl'

const { getImageUrl } = useImageUrl()

export const sliders: Array<Slide> = [
  {
    title: 'Швидко суші',
    image: {
      base: getImageUrl('/images/resto/resto_1.jpg'),
      webP: getImageUrl('/images/resto/resto_1.webp'),
    },
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
    image: {
      base: getImageUrl('/images/resto/resto_2.jpg'),
      webP: getImageUrl('/images/resto/resto_2.webp'),
    },
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
    image: {
      base: getImageUrl('/public/images/resto/resto_3.jpg'),
      webP: getImageUrl('/public/images/resto/resto_3.webp'),
    },
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
    image: {
      base: '/public/images/resto/resto_4.jpg',
      webP: '/public/images/resto/resto_4.webp',
    },
    type: 'food',
    rating: 3,
    price: {
      base: 129,
    },
  },
  {
    title: 'Паста Карбонара',
    image: {
      base: '/public/images/resto/resto_5.jpg',
      webP: '/public/images/resto/resto_5.webp',
    },
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
    image: {
      base: '/public/images/resto/resto_6.jpg',
      webP: '/public/images/resto/resto_6.webp',
    },
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
    image: {
      base: '/public/images/resto/resto_7.jpg',
      webP: '/public/images/resto/resto_7.webp',
    },
    type: 'food',
    rating: 6,
    price: {
      base: 99,
    },
  },
  {
    title: 'Десерт Тірамісу',
    image: {
      base: '/public/images/resto/resto_1.jpg',
      webP: '/public/images/resto/resto_1.webp',
    },
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
    image: {
      base: '/public/images/resto/resto_2.jpg',
      webP: '/public/images/resto/resto_2.webp',
    },
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
    image: {
      base: '/public/images/resto/resto_3.jpg',
      webP: '/public/images/resto/resto_3.webp',
    },
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
    image: {
      base: '/public/images/resto/resto_3.jpg',
      webP: '/public/images/resto/resto_3.webp',
    },
    tags: [
      {
        title: 'Італійська кухня',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Сімейний ресторан "Затишок"',
    image: {
      base: '/public/images/resto/resto_1.jpg',
      webP: '/public/images/resto/resto_1.webp',
    },
    tags: [
      {
        title: 'Сімейний',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Стейк-хаус "М\'ясо і вино"',
    image: {
      base: '/public/images/resto/resto_6.jpeg',
      webP: '/public/images/resto/resto_6.webp',
    },
    tags: [
      {
        title: 'Стейки',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Морський ресторан "Хвилі"',
    image: {
      base: '/public/images/resto/resto_2.jpg',
      webP: '/public/images/resto/resto_2.webp',
    },
    tags: [
      {
        title: 'Морепродукти',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Азіатський фьюжн "Східні спеції"',
    image: {
      base: '/public/images/resto/resto_5.jpg',
      webP: '/public/images/resto/resto_5.webp',
    },
    tags: [
      {
        title: 'Азіатська кухня',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Кав\'ярня-пекарня "Аромат"',
    image: {
      base: '/public/images/resto/resto_4.jpg',
      webP: '/public/images/resto/resto_4.webp',
    },
    tags: [
      {
        title: 'Свіжа випічка',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Вегетаріанське кафе "Зелень"',
    image: {
      base: '/public/images/resto/resto_7.jpeg',
      webP: '/public/images/resto/resto_7.webp',
    },
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
    image: {
      base: '/public/images/resto/resto_4.jpg',
      webP: '/public/images/resto/resto_4.webp',
    },
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Піцерія "Неаполь"',
    image: {
      base: '/public/images/resto/resto_2.jpg',
      webP: '/public/images/resto/resto_2.webp',
    },
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Суші-бар "Токіо"',
    image: {
      base: '/public/images/resto/resto_7.jpeg',
      webP: '/public/images/resto/resto_7.webp',
    },
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Грузинський ресторан "Сакартвело"',
    image: {
      base: '/public/images/resto/resto_6.jpeg',
      webP: '/public/images/resto/resto_6.webp',
    },
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Паб "Старий дуб"',
    image: {
      base: '/public/images/resto/resto_5.jpg',
      webP: '/public/images/resto/resto_5.webp',
    },
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Французька пекарня "Круасан"',
    image: {
      base: '/public/images/resto/resto_1.jpg',
      webP: '/public/images/resto/resto_1.webp',
    },
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Вінотека "Бордо"',
    image: {
      base: '/public/images/resto/resto_3.jpg',
      webP: '/public/images/resto/resto_3.webp',
    },
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
    image: {
      base: '/public/images/resto/resto_5.jpg',
      webP: '/public/images/resto/resto_5.webp',
    },
    tags: [
      {
        title: 'Знижка 20%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Тайський ресторан "Том Ям"',
    image: {
      base: '/public/images/resto/resto_7.jpeg',
      webP: '/public/images/resto/resto_7.webp',
    },
    tags: [
      {
        title: 'Знижка 15%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Піцерія "Маргарита"',
    image: {
      base: '/public/images/resto/resto_3.jpg',
      webP: '/public/images/resto/resto_3.webp',
    },
    tags: [
      {
        title: 'Знижка 25%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Кафе "Сніданки 24/7"',
    image: {
      base: '/public/images/resto/resto_1.jpg',
      webP: '/public/images/resto/resto_1.webp',
    },
    tags: [
      {
        title: 'Знижка 10%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Стейк-хаус "Ранчо"',
    image: {
      base: '/public/images/resto/resto_6.jpeg',
      webP: '/public/images/resto/resto_6.webp',
    },
    tags: [
      {
        title: 'Знижка 30%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Суші-бар "Сакура"',
    image: {
      base: '/public/images/resto/resto_2.jpg',
      webP: '/public/images/resto/resto_2.webp',
    },
    tags: [
      {
        title: 'Знижка 15%',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Кав\'ярня "Еспресо"',
    image: {
      base: '/public/images/resto/resto_4.jpg',
      webP: '/public/images/resto/resto_4.webp',
    },
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
    image: {
      base: '/public/images/resto/resto_6.jpeg',
      webP: '/public/images/resto/resto_6.webp',
    },
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Винний ресторан "Бордо"',
    image: {
      base: '/public/images/resto/resto_3.jpg',
      webP: '/public/images/resto/resto_3.webp',
    },
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Японський ресторан "Кіото"',
    image: {
      base: '/public/images/resto/resto_7.jpeg',
      webP: '/public/images/resto/resto_7.webp',
    },
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Панорамний ресторан "Висота"',
    image: {
      base: '/public/images/resto/resto_2.jpg',
      webP: '/public/images/resto/resto_2.webp',
    },
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Ресторан молекулярної кухні "Елемент"',
    image: {
      base: '/public/images/resto/resto_5.jpg',
      webP: '/public/images/resto/resto_5.webp',
    },
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Ресторан-сад "Едем"',
    image: {
      base: '/public/images/resto/resto_1.jpg',
      webP: '/public/images/resto/resto_1.webp',
    },
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
  {
    title: 'Стейк-хаус "Прайм"',
    image: {
      base: '/public/images/resto/resto_4.jpg',
      webP: '/public/images/resto/resto_4.webp',
    },
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
  },
]

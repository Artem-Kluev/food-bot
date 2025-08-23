import type { Food } from '@/mixins/interfaces'

export const foodSliders: Array<Food> = [
  {
    title: 'Швидко суші',
    image: '/images/eats/eat_1.webp',
    type: 'food',
    description: 'Свіжі суші з лососем, тунцем та авокадо. Подаються з соєвим соусом та імбирем.',
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
    description: 'Класична італійська піца з томатним соусом, моцарелою та свіжим базиліком.',
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
    description: 'Соковитий бургер з яловичою котлетою, сиром чеддер, свіжими овочами та фірмовим соусом.',
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
    description: 'Свіжий салат з куркою гриль, хрусткими грінками, пармезаном та фірмовим соусом Цезар.',
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
    description: 'Ніжна паста з беконом, вершковим соусом, яйцем та тертим пармезаном.',
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
    description: 'Соковитий стейк з мармурової яловичини, приготований на грилі з ароматними травами.',
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
    description: 'Ароматний крем-суп з лісових грибів з додаванням вершків та трюфельної олії.',
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
    description: 'Класичний італійський десерт з маскарпоне, кави та какао.',
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
    description: 'Асорті з морепродуктів: креветки, кальмари, мідії та восьминіг, приготовані на грилі.',
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
    description: 'Піца з томатним соусом, моцарелою, свіжими овочами, грибами та оливками.',
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

import type { Resto } from '@/mixins/interfaces'

export const sliders: Array<Resto> = [
  {
    title: 'Сакура',
    image: '/images/resto/resto_1.webp',
    type: 'resto',
    description:
      'Автентичний японський ресторан з найсвіжішими суші та ролами. Традиційний інтерєр та атмосфера.',
    tags: [
      {
        title: 'Безкоштовна доставка',
        background: '#2f7d13',
      },
    ],
    rating: 8,
    time: 25,
    id: 1,
  },
  {
    title: 'Наполетано',
    image: '/images/resto/resto_2.webp',
    type: 'resto',
    description:
      'Італійський ресторан з найкращою піцою в місті. Справжня дровяна піч та рецепти прямо з Неаполя.',
    tags: [
      {
        title: 'Популярне',
        background: '#cc3204',
      },
    ],
    rating: 9,
    time: 30,
    price: {
      base: 199,
      old: 249,
    },
    id: 2,
  },
  {
    title: 'Бургер Хаус',
    image: '/images/resto/resto_3.webp',
    type: 'resto',
    description:
      'Американський ресторан з соковитими бургерами та стейками. Великі порції та домашня атмосфера.',
    tags: [
      {
        title: 'Хіт продажів',
        background: '#ff4a15',
      },
    ],
    rating: 7,
    time: 20,
    price: {
      base: 159,
    },
    id: 3,
  },
  {
    title: 'Зелений Сад',
    image: '/images/resto/resto_4.webp',
    type: 'resto',
    description:
      'Вегетаріанський ресторан зі свіжими салатами та здоровими стравами. Органічні продукти та еко-підхід.',
    rating: 3,
    time: 15,
    price: {
      base: 129,
    },
    id: 4,
  },
  {
    title: 'Тратторія',
    image: '/images/resto/resto_5.webp',
    type: 'resto',
    description:
      'Сімейний італійський ресторан з домашньою пастою та соусами. Затишна атмосфера та привітний персонал.',
    tags: [
      {
        title: 'Нове',
        background: '#ff4a15',
      },
    ],
    rating: 8,
    time: 35,
    price: {
      base: 179,
    },
    id: 5,
  },
  {
    title: 'Мясний Двір',
    image: '/images/resto/resto_6.webp',
    type: 'resto',
    description:
      'Преміум стейк-хаус з найкращими відбірними стейками. Професійні кухарі та вишукана винна карта.',
    tags: [
      {
        title: 'Преміум',
        background: '#ff4a15',
      },
    ],
    rating: 9,
    time: 40,
    price: {
      base: 399,
    },
    id: 6,
  },
  {
    title: 'Домашня Кухня',
    image: '/images/resto/resto_7.webp',
    type: 'resto',
    description:
      'Ресторан української кухні з домашніми стравами. Борщ, вареники та інші традиційні страви.',
    rating: 6,
    time: 25,
    price: {
      base: 99,
    },
    id: 7,
  },
  {
    title: 'Солодкий Рай',
    image: '/images/resto/resto_1.webp',
    type: 'resto',
    description:
      'Кондитерська з найкращими десертами та тістечками. Домашня випічка та авторські десерти.',
    tags: [
      {
        title: 'Солодощі',
        background: '#ff4a15',
      },
    ],
    rating: 9,
    time: 15,
    price: {
      base: 129,
    },
    id: 9,
  },
  {
    title: 'Морська Хвиля',
    image: '/images/resto/resto_2.webp',
    type: 'resto',
    description:
      'Ресторан морепродуктів з найсвіжішими дарами моря. Риба, креветки, мідії та інші морепродукти.',
    tags: [
      {
        title: 'Морепродукти',
        background: '#ff4a15',
      },
    ],
    rating: 8,
    time: 35,
    price: {
      base: 299,
      old: 349,
    },
    id: 10,
  },
  {
    title: 'Зелений Куточок',
    image: '/images/resto/resto_3.webp',
    type: 'resto',
    description:
      'Вегетаріанський ресторан з великим вибором страв без мяса. Свіжі інгредієнти та креативні рецепти.',
    tags: [
      {
        title: 'Вегетаріанське',
        background: '#ff4a15',
      },
    ],
    rating: 7,
    time: 30,
    price: {
      base: 189,
    },
    id: 11,
  },
]

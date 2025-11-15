import type { Tag } from '@/mixins/interfaces'

export const tags = <Tag[]>[
  {
    title: 'Оплата при отриманні',
    value: ['cash', 'card-postpayment'],
  },

  {
    title: 'Оплата картою',
    value: ['card'],
  },

  {
    title: 'Знижка',
    value: ['sale'],
  },

  {
    title: 'Безкоштовна доставка',
    value: ['free-delivery'],
  },

  {
    title: 'Оплата готівкою',
    value: ['cash'],
  },

  {
    title: 'Зараз працюють',
    value: ['open'],
  },
]

import type { Category } from '@/mixins/interfaces'

export enum FoodCategory {
  PIZZA = 'pizza',
  BURGER = 'burger',
  SOUP = 'soup',
  SUSHI = 'sushi',
  MEAT = 'meat',
  SALAD = 'salad',
  DESSERT = 'dessert',
  UKRAINIAN = 'ukrainian',
  ASIAN = 'asian',
  SEAFOOD = 'seafood',
  VEGETARIAN = 'vegetarian',
  BEVERAGE = 'beverage',
  FASTFOOD = 'fastfood',
  BEER = 'beer',
  ITALIAN = 'italian',
}

export const categories: Category[] = [
  {
    title: 'Піца',
    value: FoodCategory.PIZZA,
    image: '/images/category/pizza.webp',
    id: 1,
  },
  {
    title: 'Суші',
    value: FoodCategory.SUSHI,
    image: '/images/category/sushi.webp',
    id: 2,
  },

  {
    title: 'Пиво/Сидр',
    value: FoodCategory.BEER,
    image: '/images/category/beer.png',
    id: 5,
  },

  {
    title: 'Салати',
    value: FoodCategory.SALAD,
    image: '/images/category/salad.png',
    id: 6,
  },

  {
    title: 'Бургери',
    value: FoodCategory.BURGER,
    image: '/images/category/burger.png',
    id: 6,
  },

  {
    title: 'Десерти',
    value: FoodCategory.DESSERT,
    image: '/images/category/dessert.png',
    id: 6,
  },

  {
    title: 'Італійська кухня',
    value: FoodCategory.ITALIAN,
    image: '/images/category/italian.png',
    id: 6,
  },

  {
    title: 'Напої',
    value: FoodCategory.BEVERAGE,
    image: '/images/category/drink.png',
    id: 5,
  },

  {
    title: 'Мясні страви',
    value: FoodCategory.MEAT,
    image: '/images/category/meat.png',
    id: 6,
  },

  {
    title: 'Супи',
    value: FoodCategory.SOUP,
    image: '/images/category/soup.png',
    id: 6,
  },

  {
    title: 'Українська кухня',
    value: FoodCategory.UKRAINIAN,
    image: '/images/category/pierogi.png',
    id: 6,
  },

  {
    title: 'Фастфуд',
    value: FoodCategory.FASTFOOD,
    image: '/images/category/fastfood.webp',
    id: 4,
  },

  {
    title: 'Веганські страви',
    value: FoodCategory.VEGETARIAN,
    image: '/images/category/vegan.png',
    id: 6,
  },

  {
    title: 'Морепрод',
    value: FoodCategory.SEAFOOD,
    image: '/images/category/sea.png',
    id: 6,
  },

  {
    title: 'Азіатська кухня',
    value: FoodCategory.ASIAN,
    image: '/images/category/asian.png',
    id: 6,
  },
]

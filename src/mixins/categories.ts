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
    type: FoodCategory.PIZZA,
    image: '/images/category/pizza.webp',
    id: 1,
  },
  {
    title: 'Суші',
    type: FoodCategory.SUSHI,
    image: '/images/category/sushi.webp',
    id: 2,
  },

  {
    title: 'Пиво/Сидр',
    type: FoodCategory.BEER,
    image: '/images/category/beer.png',
    id: 5,
  },

  {
    title: 'Салати',
    type: FoodCategory.SALAD,
    image: '/images/category/salad.png',
    id: 6,
  },

  {
    title: 'Бургери',
    type: FoodCategory.BURGER,
    image: '/images/category/burger.png',
    id: 6,
  },

  {
    title: 'Десерти',
    type: FoodCategory.DESSERT,
    image: '/images/category/dessert.png',
    id: 6,
  },

  {
    title: 'Італійська кухня',
    type: FoodCategory.ITALIAN,
    image: '/images/category/italian.png',
    id: 6,
  },

  {
    title: 'Напої',
    type: FoodCategory.BEVERAGE,
    image: '/images/category/drink.png',
    id: 5,
  },

  {
    title: 'Мясні страви',
    type: FoodCategory.MEAT,
    image: '/images/category/meat.png',
    id: 6,
  },

  {
    title: 'Супи',
    type: FoodCategory.SOUP,
    image: '/images/category/soup.png',
    id: 6,
  },

  {
    title: 'Українська кухня',
    type: FoodCategory.UKRAINIAN,
    image: '/images/category/pierogi.png',
    id: 6,
  },

  {
    title: 'Фастфуд',
    type: FoodCategory.FASTFOOD,
    image: '/images/category/fastfood.webp',
    id: 4,
  },

  {
    title: 'Веганські страви',
    type: FoodCategory.VEGETARIAN,
    image: '/images/category/vegan.png',
    id: 6,
  },

  {
    title: 'Морепрод',
    type: FoodCategory.SEAFOOD,
    image: '/images/category/sea.png',
    id: 6,
  },

  {
    title: 'Азіатська кухня',
    type: FoodCategory.ASIAN,
    image: '/images/category/asian.png',
    id: 6,
  },
]

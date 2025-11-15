import type { Category } from '@/mixins/interfaces'
import { supabase } from '@/plugins/supabase'

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
  PASTA = 'pasta',
  FISH = 'fish',
  PROMO = 'promo',
}

export const categories: Category[] = [
  {
    title: 'Піца',
    type: FoodCategory.PIZZA,
    image: '/images/category/pizza.webp',
  },
  {
    title: 'Суші',
    type: FoodCategory.SUSHI,
    image: '/images/category/sushi.webp',
  },

  {
    title: 'Пиво/Сидр',
    type: FoodCategory.BEER,
    image: '/images/category/beer.png',
  },

  {
    title: 'Салати',
    type: FoodCategory.SALAD,
    image: '/images/category/salad.png',
  },

  {
    title: 'Бургери',
    type: FoodCategory.BURGER,
    image: '/images/category/burger.png',
  },

  {
    title: 'Десерти',
    type: FoodCategory.DESSERT,
    image: '/images/category/dessert.png',
  },

  {
    title: 'Італійська кухня',
    type: FoodCategory.ITALIAN,
    image: '/images/category/italian.png',
  },

  {
    title: 'Напої',
    type: FoodCategory.BEVERAGE,
    image: '/images/category/drink.png',
  },

  {
    title: 'Мясні страви',
    type: FoodCategory.MEAT,
    image: '/images/category/meat.png',
  },

  {
    title: 'Супи',
    type: FoodCategory.SOUP,
    image: '/images/category/soup.png',
  },

  {
    title: 'Українська кухня',
    type: FoodCategory.UKRAINIAN,
    image: '/images/category/pierogi.png',
  },

  {
    title: 'Фастфуд',
    type: FoodCategory.FASTFOOD,
    image: '/images/category/fastfood.webp',
  },

  {
    title: 'Веганські страви',
    type: FoodCategory.VEGETARIAN,
    image: '/images/category/vegan.png',
  },

  {
    title: 'Морепрод',
    type: FoodCategory.SEAFOOD,
    image: '/images/category/sea.png',
  },

  {
    title: 'Азіатська кухня',
    type: FoodCategory.ASIAN,
    image: '/images/category/asian.png',
  },
  {
    title: 'Макарони',
    type: FoodCategory.PASTA,
    image: '/images/category/spaguetti.png',
  },

  {
    title: 'Риба',
    type: FoodCategory.FISH,
    image: '/images/category/fish.png',
  },

  {
    title: 'Акція',
    type: FoodCategory.PROMO,
    image: '/images/category/promo.png',
  },
]

export async function getCategories(city: string): Promise<Category[]> {
  const { data } = await supabase.rpc('get_menu_categories', { city })

  const available = data.map((item: { category: string }) => item.category)

  return categories.filter((item) => available.includes(item.type))
}

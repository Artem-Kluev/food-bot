import { FoodCategory } from '@/mixins/categories'

export interface Resto {
  title: string
  image: string
  type: 'resto'
  description: string
  basePrice?: string
  oldPrice?: string | null
  category?: string
  restoUid?: string
  price?: {
    base: number
    old?: number
  }
  tags?: Array<{
    title: string
    background: string
  }>
  rating?: number
  time?: number
  id: number
  minOrder: number
}

export interface Food {
  title: string
  image: string
  type: 'food'
  description?: string
  price?: {
    base: number
    old?: number
  }
  tags?: Array<{
    title: string
    background: string
  }>
  rating?: number
  time?: number
  id: number
  restoId: number
  minOrder: number
}

export interface Banner {
  title: string
  animation: string
}

export interface Category {
  title: string
  image: string
  type?: string
}

export interface OrderProduct {
  id: number
  title: string
  image: string
  price: number
  count: number
}

export interface Order {
  id: number
  date: string
  status: 'completed' | 'processing' | 'canceled'
  products: OrderProduct[]
  address: string
  phone: string
  paymentMethod: 'card' | 'cash'
  totalPrice: number
}

export interface Tag {
  title: string
  value: Array<string>
}

// Типи для лайків
export type LikeType = 'resto' | 'food'

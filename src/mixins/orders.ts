import type { Food } from './interfaces'

export interface Order {
  id: number
  date: string
  status: 'completed' | 'processing' | 'canceled' | 'awaiting_payment' | 'delivering' | 'new' | 'paid'
  totalPrice: number
  products: Array<{
    id: number
    title: string
    price: number
    count: number
    image: string
  }>
  address: string
  paymentMethod: 'cash' | 'card'
  restaurant?: {
    title: string
    description: string
    image: string
    rating: number
  }
  restoUid: string
}


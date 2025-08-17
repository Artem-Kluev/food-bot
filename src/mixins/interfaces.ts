export interface Resto {
  title: string
  image: string
  type: 'resto'
  description: string
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
}

export interface Food {
  title: string
  image: string
  type: 'food'
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
}

export interface Banner {
  title: string
  animation: string
}

export interface Category {
  title: string
  image: string
  id: number
}

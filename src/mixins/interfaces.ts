export interface Slide {
  title: string
  image: string
  type?: 'resto' | 'food'
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

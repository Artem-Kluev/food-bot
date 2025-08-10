export interface Slide {
  title: string
  image: {
    base: string
    webP: string
  }
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

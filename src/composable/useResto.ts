import { supabase } from '@/plugins/supabase'
import { ref } from 'vue'

// Визначаємо тип для ресторанів
interface Resto {
  id: number
  [key: string]: any
}

const allRestoCard = ref<Resto[]>([])

// Використовуємо правильний тип для кешованої промісу
let singleFunction: Promise<void> | null = null

function request(): Promise<void> {
  if (!singleFunction) {
    singleFunction = requestData()
  }

  return singleFunction
}

async function requestData(): Promise<void> {
  const { data, error } = await supabase.from('resto').select('*')

  if (error) {
    console.error('Помилка при завантаженні даних ресторанів:', error)
    return
  }

  allRestoCard.value = data as Resto[]
}

export { allRestoCard, request }

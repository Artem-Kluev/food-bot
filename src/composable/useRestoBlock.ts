import { ref } from 'vue'

export const isRestoBlockVisable = ref(true)

export function toggleRestoBlock(value: boolean) {
  isRestoBlockVisable.value = value

  console.log(isRestoBlockVisable.value, value)
}

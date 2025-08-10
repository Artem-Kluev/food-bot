import { ref } from 'vue'

export const isBottomBarVisible = ref(true)

export function toggleBottomBar(value?: boolean) {
  if (value !== undefined) {
    isBottomBarVisible.value = value
  } else {
    isBottomBarVisible.value = !isBottomBarVisible.value
  }
}

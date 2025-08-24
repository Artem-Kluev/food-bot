import { ref } from 'vue'

const isOrderFormVisible = ref(false)

function openOrderForm() {
  isOrderFormVisible.value = true
}

function closeOrderForm() {
  isOrderFormVisible.value = false
}

export { isOrderFormVisible, openOrderForm, closeOrderForm }

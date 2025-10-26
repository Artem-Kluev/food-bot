<script setup lang="ts">
import { ref, onActivated, onDeactivated, onMounted } from 'vue'
import OrderCard from '@/components/widgets/OrderCard.vue'
import { orderData } from '@/composable/useOrderSupabase'
import type { Order } from '@/mixins/orders'
import { usePreloader } from '@/composable/usePreloader'

console.log(orderData)

const ordersList = ref<Order[]>([])
const expandedOrders = ref<number[]>([])
const { showPreloader, hidePreloader } = usePreloader()

showPreloader()

async function getData() {
  const data = await orderData()

  const orders = data.res.data || []

  const sortOrders = orders.sort((a: any, b: any) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  ordersList.value = sortOrders.map((order: any) => {
    const products = JSON.parse(order.data || '[]')

    const totalPrice = products.reduce((sum: number, product: any) => {
      return sum + parseFloat(product.price) * parseInt(product.quantity)
    }, 0)

    return {
      id: order.id,
      date: order.created_at,
      status: order.status,
      totalPrice,
      products: products.map((product: any) => ({
        id: product.productId,
        restoId: order.restoUid,
        title: product.title,
        price: parseFloat(product.price),
        count: parseInt(product.quantity),
        image: product.image,
      })),
      address: order.orderAddress,
      paymentMethod: order.orderPaymentMethod,
      comment: order.comment,
      restoUid: order.restoUid,
      userId: order.userId,
      nickname: order.nickname,
      username: order.username,
      courierPhone: order.courierPhone,
    }
  })
}

getData()

const intervalId = ref<number | null>(null)

function startDataInterval() {
  // Очищаємо попередній інтервал, якщо він існує
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }

  // Створюємо новий інтервал
  intervalId.value = setInterval(() => {
    getData()
  }, 15000) as unknown as number
}

onActivated(() => {
  getData()
  startDataInterval()
})

onDeactivated(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
})

function toggleOrder(orderId: number) {
  const index = expandedOrders.value.indexOf(orderId)
  if (index === -1) {
    expandedOrders.value.push(orderId)
  } else {
    expandedOrders.value.splice(index, 1)
  }
}

function isOrderExpanded(orderId: number) {
  return expandedOrders.value.includes(orderId)
}
onMounted(async () => {
  await getData()

  hidePreloader()
})
</script>

<template>
  <div class="order-page">
    <h1 class="order-page__title">Історія замовлень</h1>

    <div v-if="ordersList.length" class="order-page__content">
      <OrderCard
        v-for="order in ordersList"
        :key="order.id"
        :order="order"
        :is-expanded="isOrderExpanded(order.id)"
        @toggle="toggleOrder"
        @confirm="getData"
      />
    </div>

    <div v-else class="order-page__empty">
      <p>У вас ще немає замовлень</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.order-page {
  padding: 10px;

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: $text;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__empty {
    text-align: center;
    padding: 40px 0;
    color: $text;
    font-size: 18px;
  }
}
</style>

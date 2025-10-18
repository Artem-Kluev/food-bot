<script setup lang="ts">
import { ref } from 'vue'
import OrderCard from '@/components/widgets/OrderCard.vue'
import { orderData } from '@/composable/useOrderSupabase'
import type { Order } from '@/mixins/orders'

console.log(orderData)

const ordersList = ref<Order[]>([])
const expandedOrders = ref<number[]>([])

async function getData() {
  const data = await orderData()

  const orders = data.res.data || []

  // Трансформуємо дані з бекенду в формат, який очікує компонент
  ordersList.value = orders.map((order: any) => {
    // Парсимо JSON з продуктами
    const products = JSON.parse(order.data || '[]')

    // Обчислюємо загальну суму
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
    }
  })
}

getData()

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

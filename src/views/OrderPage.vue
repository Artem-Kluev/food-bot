<script setup lang="ts">
import { ref } from 'vue'
import { orders } from '@/mixins/orders'
import OrderCard from '@/components/widgets/OrderCard.vue'

const ordersList = ref(orders)
const expandedOrders = ref<number[]>([])

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

.order-card {
  background-color: $white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    cursor: pointer;
    user-select: none;
  }

  &__header-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__content {
    margin-top: 10px;
    border-top: 1px solid $beige;
    transition: all 0.3s ease;

    &-inner {
      padding-top: 15px;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__number {
    font-weight: 600;
    font-size: 16px;
    color: $text;
  }

  &__date {
    font-size: 14px;
    color: $text;
  }

  &__status {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: $white;

    &_completed {
      background-color: $green;
    }

    &_processing {
      background-color: $blue;
    }

    &_canceled {
      background-color: $red;
    }
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
    padding: 10px;
    background-color: $background;
    border-radius: 6px;
  }

  &__label {
    font-weight: 500;
    margin-right: 5px;
  }

  &__total-price {
    color: $main-color;
    font-weight: 600;
  }

  &__actions {
    display: flex;
    gap: 10px;
  }

  &__cancel-btn {
    padding: 10px;
    background-color: $red;
    color: $white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
  }

  &__repeat-btn {
    padding: 10px;
    background-color: $main-color;
    text-shadow: $main-text-shadow;
    color: $white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
  }

  &__toggle {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    transform: rotate(90deg);

    &_expanded {
      transform: rotate(270deg);
    }

    &-icon {
      width: 12px;
      height: 24px;
      color: $text;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 1000px;
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
  max-height: 1000px;
  opacity: 1;
  transform: translateY(0);
}

.order-product {
  min-height: 80px;
  display: flex;
  background-color: $background;
  border-radius: 8px;
  overflow: hidden;

  &__image {
    width: 80px;
    height: 80px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    flex: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__data {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-size: 15px;
    font-weight: 500;
    color: $text;
    margin-bottom: 5px;
  }

  &__price {
    font-weight: 600;
    color: $main-color;
  }

  &__count {
    font-size: 13px;
    color: $text;
  }
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { orders } from '@/mixins/orders'
import BaseSvg from '@/components/base/BaseSvg.vue'

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

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return (
    date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' +
    date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
  )
}
</script>

<template>
  <div class="order-page">
    <h1 class="order-page__title">Історія замовлень</h1>

    <div v-if="ordersList.length" class="order-page__content">
      <div v-for="order in ordersList" :key="order.id" class="order-card">
        <div class="order-card__header" @click="toggleOrder(order.id)">
          <div class="order-card__info">
            <div class="order-card__number">Замовлення #{{ order.id }}</div>
            <div class="order-card__date">{{ formatDate(order.date) }}</div>
          </div>
          <div class="order-card__header-right">
            <div class="order-card__status" :class="`order-card__status_${order.status}`">
              {{ order.status === 'completed' ? 'Виконано' : order.status === 'processing' ? 'В обробці' : 'Скасовано' }}
            </div>
            <div class="order-card__toggle" :class="{ 'order-card__toggle_expanded': isOrderExpanded(order.id) }">
              <BaseSvg class="order-card__toggle-icon" id="arrow-logo" />
            </div>
          </div>
        </div>

        <Transition name="fade">
          <div v-if="isOrderExpanded(order.id)" class="order-card__content">
            <div class="order-card__content-inner">
              <div class="order-card__products">
                <div v-for="product in order.products" :key="product.id" class="order-product">
                  <div class="order-product__image">
                    <img :src="product.image" alt="product image" />
                  </div>
                  <div class="order-product__info">
                    <h3 class="order-product__title">{{ product.title }}</h3>
                    <div class="order-product__price">{{ product.price }} ₴</div>
                    <div class="order-product__count">Кількість: {{ product.count }}</div>
                  </div>
                </div>
              </div>

              <div class="order-card__details">
                <div class="order-card__address">
                  <span class="order-card__label">Адреса доставки:</span>
                  <span>{{ order.address }}</span>
                </div>
                <div class="order-card__payment">
                  <span class="order-card__label">Спосіб оплати:</span>
                  <span>{{ order.paymentMethod === 'card' ? 'Картка' : 'Готівка' }}</span>
                </div>
                <div class="order-card__total">
                  <span class="order-card__label">Загальна сума:</span>
                  <span class="order-card__total-price">{{ order.totalPrice }} ₴</span>
                </div>
              </div>

              <div class="order-card__actions">
                <button v-if="order.status === 'processing'" class="order-card__cancel-btn">Скасувати</button>
                <button class="order-card__repeat-btn">Повторити замовлення</button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
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
  display: flex;
  background-color: $background;
  border-radius: 6px;
  overflow: hidden;

  &__image {
    width: 70px;
    height: 70px;

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

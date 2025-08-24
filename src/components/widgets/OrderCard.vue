<template>
  <div class="order-card">
    <div class="order-card__header" @click="toggleOrder">
      <div class="order-card__info">
        <div class="order-card__number">Замовлення #{{ order.id }}</div>
        <div class="order-card__date">{{ formatDate(order.date) }}</div>
      </div>
      <div class="order-card__header-right">
        <div class="order-card__status" :class="`order-card__status_${order.status}`">
          {{
            order.status === 'completed'
              ? 'Виконано'
              : order.status === 'processing'
                ? 'В обробці'
                : order.status === 'awaiting_payment'
                  ? 'Очікує оплату'
                  : order.status === 'delivering'
                    ? 'Доставляється'
                    : 'Скасовано'
          }}
        </div>
        <div class="order-card__toggle" :class="{ 'order-card__toggle_expanded': isExpanded }">
          <BaseSvg class="order-card__toggle-icon" id="arrow-logo" />
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="isExpanded" class="order-card__content">
        <div class="order-card__content-inner">
          <div class="order-card__products">
            <div v-for="product in order.products" :key="product.id" class="order-product">
              <div class="order-product__image">
                <img :src="product.image" alt="product image" />
              </div>
              <div class="order-product__info">
                <h3 class="order-product__title">{{ product.title }}</h3>
                <div class="order-product__data">
                  <div class="order-product__price">{{ product.price }} ₴</div>
                  <div class="order-product__count">Кількість: {{ product.count }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Превью ресторану -->
          <RestoPreview
            v-if="order.restaurant"
            :title="order.restaurant.title"
            :description="order.restaurant.description"
            :image="order.restaurant.image"
            :rating="order.restaurant.rating"
            modifier="order"
            class="order-card__resto-preview"
          />

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

          <!-- Попередження для замовлень в обробці з оплатою карткою -->
          <div v-if="order.status === 'processing' && order.paymentMethod === 'card'" class="order-card__warning">
            Реквізити карти для оплати з'являться після підтвердження замовлення рестораном
          </div>

          <div class="order-card__actions">
            <!-- Для замовлень в обробці - одна кнопка "Скасувати" на всю ширину -->
            <button
              v-if="order.status === 'processing'"
              class="order-card__cancel-btn order-card__cancel-btn_full-width"
              @click="showCancelConfirm"
            >
              Скасувати
            </button>

            <!-- Для очікуючих оплату - дві кнопки "Скасувати" і "Оплатити" -->
            <template v-if="order.status === 'awaiting_payment'">
              <button class="order-card__cancel-btn" @click="showCancelConfirm">Скасувати</button>
              <button class="order-card__pay-btn" @click="showPaymentForm">Оплатити</button>
            </template>

            <!-- Для замовлень, що доставляються - кнопка "Дані кур'єра" -->
            <button
              v-if="order.status === 'delivering'"
              class="order-card__courier-btn order-card__courier-btn_full-width"
              @click="showCourierInfo"
            >
              Дані кур'єра
            </button>

            <!-- Для виконаних і скасованих - кнопка "Повторити замовлення" на всю ширину -->
            <button
              v-if="order.status === 'completed' || order.status === 'canceled'"
              class="order-card__repeat-btn order-card__repeat-btn_full-width"
            >
              Повторити замовлення
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Модальне вікно підтвердження скасування -->
    <UiConfirmModal
      ref="confirmModalRef"
      title="Скасування замовлення"
      text="Ви дійсно бажаєте скасувати це замовлення?"
      confirm-text="Так"
      cancel-text="Ні"
      @confirm="handleCancelConfirm"
    />

    <PaymentRequisitesForm ref="paymentFormRef" :orderId="order.id" @confirm="handlePaymentConfirm" @close="handlePaymentClose" />

    <CourierInfoForm
      ref="courierFormRef"
      :orderId="order.id"
      :address="order.address"
      :deliveryType="'Кур\'єрська доставка'"
      :courierContact="'+380 50 123 4567'"
      @close="handleCourierInfoClose"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import UiConfirmModal from '@/components/ui/UiConfirmModal.vue'
import PaymentRequisitesForm from '@/components/widgets/PaymentRequisitesForm.vue'
import CourierInfoForm from '@/components/widgets/CourierInfoForm.vue'
import RestoPreview from '@/components/widgets/RestoPreview.vue'
import type { Order } from '@/mixins/orders'

const props = defineProps<{
  order: Order
  isExpanded: boolean
}>()

const emit = defineEmits<{
  toggle: [orderId: number]
}>()

const confirmModalRef = ref()
const cancelConfirmVisible = ref(false)
const paymentFormRef = ref()
const courierFormRef = ref()

function toggleOrder() {
  emit('toggle', props.order.id)
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return (
    date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' +
    date.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' })
  )
}

function showCancelConfirm() {
  if (confirmModalRef.value) {
    confirmModalRef.value.openModal()
  }
}

function handleCancelConfirm(confirmed: boolean) {
  if (confirmed) {
    // Тут буде логіка скасування замовлення
    console.log('Замовлення скасовано:', props.order.id)
  }
}

function showPaymentForm() {
  if (paymentFormRef.value) {
    paymentFormRef.value.openForm()
  }
}

function handlePaymentConfirm(data: { orderId: number; screenshot?: File }) {
  // Тут можна додати логіку для обробки підтвердження оплати
  console.log('Оплата підтверджена:', data)
}

function handlePaymentClose() {
  // Додаткова логіка при закритті форми оплати (якщо потрібно)
}

function showCourierInfo() {
  if (courierFormRef.value) {
    courierFormRef.value.openForm()
  }
}

function handleCourierInfoClose() {
  // Додаткова логіка при закритті форми з даними кур'єра (якщо потрібно)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

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

    &_awaiting_payment {
      background-color: $orange;
    }

    &_delivering {
      background-color: $purple;
    }

    &_canceled {
      background-color: $red;
    }
  }

  &__resto-preview {
    margin: 0 0 15px;
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e4d1c3;
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
    flex-direction: column;
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
    flex: 1;

    &_full-width {
      width: 100%;
    }
  }

  &__repeat-btn {
    padding: 10px;
    background-color: $main-color;
    color: $white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    flex: 1;

    &_full-width {
      width: 100%;
    }
  }

  &__pay-btn {
    padding: 10px;
    background-color: $green;
    color: $white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    flex: 1;
  }

  &__courier-btn {
    padding: 10px;
    background-color: $purple;
    color: $white;
    border: none;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    flex: 1;

    &_full-width {
      width: 100%;
    }
  }

  &__warning {
    margin-top: 5px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: $background;
    border-radius: 6px;
    font-size: 14px;
    margin-bottom: 20px;
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

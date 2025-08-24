<template>
  <Transition name="fade-slide">
    <div v-if="isOrderFormVisible" class="order-form">
      <div class="order-form__main" @click.self="closeOrderForm">
        <div class="order-form__wrapper">
          <div class="order-form__header">
            <div class="order-form__back" @click="closeOrderForm">
              <BaseSvg class="order-form__back-icon" id="arrow-logo" />
            </div>
            <div class="order-form__title">Оформлення замовлення</div>
          </div>

          <div class="order-form__content">
            <div class="order-form__field">
              <label class="order-form__label">Адреса доставки</label>
              <input v-model="orderAddress" type="text" class="order-form__input" placeholder="Введіть адресу доставки" />
            </div>

            <div class="order-form__field">
              <label class="order-form__label">Номер телефону</label>
              <input v-model="orderPhone" type="tel" class="order-form__input" placeholder="+380XXXXXXXXX" />
            </div>

            <div class="order-form__field">
              <label class="order-form__label">Спосіб оплати</label>
              <select v-model="orderPaymentMethod" class="order-form__select">
                <option value="card">Картка</option>
                <option value="cash">Готівка</option>
              </select>
            </div>

            <div class="order-form__summary">
              <div class="order-form__summary-title">Ваше замовлення</div>
              <div class="order-form__products">
                <div v-for="product in products" :key="product.id" class="order-form__product">
                  <div class="order-form__product-title">{{ product.title }}</div>
                  <div class="order-form__product-count">{{ product.count }} шт.</div>
                  <div class="order-form__product-price">{{ product.price * product.count }} ₴</div>
                </div>
              </div>
              <div class="order-form__total">
                <span>Загальна сума:</span>
                <span class="order-form__total-price">{{ totalPrice }} ₴</span>
              </div>
            </div>
          </div>

          <Transition name="fade-scale">
            <div 
              class="order-form__button" 
              @click="submitOrder"
              :class="{ 'order-form__button--disabled': isSubmitting || !orderAddress || !orderPhone }"
            >
              <div class="order-form__button-text">
                {{ isSubmitting ? 'Оформлення...' : 'Підтвердити замовлення' }}
              </div>
              <hr class="order-form__button-line" />
              <div class="order-form__button-price">
                <div class="order-form__button-sum">{{ totalPrice }}</div>
                грн
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useBasket } from '@/composable/useBasket'
import { useScrollLock } from '@/composable/useScrollLock'
import BaseSvg from '@/components/base/BaseSvg.vue'
import { 
  isOrderFormVisible, 
  orderAddress, 
  orderPhone, 
  orderPaymentMethod, 
  isSubmitting,
  openOrderForm, 
  closeOrderForm, 
  resetOrderForm,
  submitOrder 
} from '@/composable/useOrderForm'

const { getAllProduct, getTotalPrice } = useBasket()
const products = ref(getAllProduct())
const totalPrice = computed(() => getTotalPrice())

const { lockScroll, unlockScroll } = useScrollLock()

// Блокування прокрутки при відкритті форми
watch(isOrderFormVisible, (newValue) => {
  if (newValue) {
    lockScroll()
    products.value = getAllProduct() // Оновлюємо список продуктів при відкритті форми
  } else {
    unlockScroll()
  }
})

// Експортуємо функції для використання в інших компонентах
defineExpose({
  openOrderForm,
  closeOrderForm,
  isOrderFormVisible
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.order-form {
  position: fixed;
  z-index: 11;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.363);
  overflow: hidden;

  &__main {
    overflow: auto;
    height: 100%;
  }

  &__wrapper {
    background-color: $background;
    margin-top: 80px;
    padding-bottom: 70px;
    border-radius: 30px 30px 0 0;
    transition: transform 0.3s ease;
    overflow: hidden;
    min-height: calc(100% - 80px);
    display: flex;
    flex-direction: column;
  }

  &__header {
    position: relative;
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid $beige;
  }

  &__back {
    position: absolute;
    left: 15px;
    display: flex;
    align-items: center;
    color: $main-color;
    width: 40px;
    height: 40px;
    background-color: $background;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;

    &:active {
      transform: scale(0.95);
    }
    
    &--disabled {
      background-color: #cccccc;
      cursor: not-allowed;
      
      &:active {
        transform: none;
      }
    }

    &-icon {
      transform: rotate(180deg);
      width: 30px;
      height: 30px;
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $text;
  }

  &__content {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__label {
    font-size: 16px;
    font-weight: 500;
    color: $text;
  }

  &__input,
  &__select {
    padding: 12px;
    border: 1px solid $beige;
    border-radius: 8px;
    font-size: 16px;
    background-color: $white;
    color: $text;

    &:focus {
      outline: none;
      border-color: $main-color;
    }
  }

  &__summary {
    margin-top: 20px;
    background-color: $white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__summary-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    color: $text;
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
  }

  &__product {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid $beige;

    &-title {
      flex: 1;
      font-size: 14px;
      color: $text;
    }

    &-count {
      width: 60px;
      text-align: center;
      font-size: 14px;
      color: $text;
    }

    &-price {
      width: 80px;
      text-align: right;
      font-weight: 600;
      color: $main-color;
    }
  }

  &__total {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 500;
    color: $text;
    margin-top: 10px;
  }

  &__total-price {
    color: $main-color;
    font-weight: 600;
  }

  &__button {
    position: fixed;
    z-index: 2;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 50px;
    border-radius: 30px;
    background-color: $main-color;
    color: $white;
    cursor: pointer;
    user-select: none;
    text-align: center;
    line-height: 50px;
    margin: 0 40px;
    padding: 0 25px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.2s;

    &:active {
      transform: scale(0.95);
    }

    &-line {
      height: 30px;
      width: 1px;
      border-radius: 2px;
      background-color: $background;
    }

    &-price {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}

.fade-slide-enter-active {
  transition:
    transform 0.3s,
    background-color 0.2s 0.3s;
}

.fade-slide-leave-active {
  transition: transform 0.3s;
}

.fade-slide-leave-to,
.fade-slide-enter-from {
  transform: translateY(100%);
  background-color: unset;
}

.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
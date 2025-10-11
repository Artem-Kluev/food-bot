<script setup lang="ts">
import { ref, computed, onActivated, watch, reactive, onMounted } from 'vue'
import { useBasket } from '@/composable/useBasket'
import { useScrollLock } from '@/composable/useScrollLock'
import BaseSvg from '@/components/base/BaseSvg.vue'
import UiSelect from '@/components/ui/UiSelect.vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiToast from '@/components/ui/UiToast.vue'
import { useRouter } from 'vue-router'
import type { OrderProduct } from '@/mixins/interfaces'
import { allRestoCard, request } from '@/composable/useResto'
import { isOrderFormVisible, openOrderForm, closeOrderForm } from '@/composable/useOrderForm'
import { Form, Field, ErrorMessage, useField } from 'vee-validate'
import { orderData } from '@/composable/useOrderSupabase'
import * as yup from 'yup'

const { getAllProduct, getTotalPrice, clear } = useBasket()
const products = ref(getAllProduct())
const totalPrice = computed(() => getTotalPrice())
const router = useRouter()

// Дані та типи для способів оплати
const optionsData: Record<string, string> = {
  cash: 'Готівка при отриманні',
  card: 'Картка',
  'card-postpayment': 'Картка після отримання',
}

type PaymentMethodKey = keyof typeof optionsData
type PaymentOption = { label: string; value: PaymentMethodKey }

const options = ref<PaymentOption[]>([])

const { lockScroll, unlockScroll } = useScrollLock()

onMounted(async () => {
  await request()

  getOptions()
})

onActivated(async () => {
  await request()

  getOptions()
})

function getRestoData(restoUid: string) {
  console.log(allRestoCard.value)
  return allRestoCard.value.find((resto) => resto.restoId === restoUid)
}

function getOptions() {
  const basketData = getAllProduct()

  const restoId = basketData[0].restoId

  const currentResto = getRestoData(restoId)

  console.log(currentResto)

  const paymentMethodsRaw = JSON.parse(currentResto?.selectedPaymentMethod || '[]') as unknown
  const paymentMethods = Array.isArray(paymentMethodsRaw)
    ? paymentMethodsRaw.filter((method): method is PaymentMethodKey => method in optionsData)
    : []

  options.value = paymentMethods.map((method) => ({
    label: optionsData[method],
    value: method,
  }))

  formatDate.orderPaymentMethod = options.value.length ? options.value[0].value : ''
}

const formatDate = reactive<{
  orderAddress: string
  orderPhone: string
  orderPaymentMethod: PaymentMethodKey | ''
  orderComment: string
}>({
  orderAddress: 'eadfwefw',
  orderPhone: '380958195946',
  orderPaymentMethod: '',
  orderComment: '',
})

const toastRef = ref<{ show: () => void } | null>(null)

// Схема валідації для форми замовлення
const validationSchema = yup.object({
  orderAddress: yup.string().required("Адреса доставки обов'язкова").min(5, 'Адреса повинна містити мінімум 5 символів'),
  orderPhone: yup
    .string()
    .required("Номер телефону обов'язковий")
    .matches(/^(\+380|380|0)\d{9}$/, 'Введіть коректний номер телефону у форматі +380XXXXXXXXX, 380XXXXXXXXX або 0XXXXXXXXX'),
})

// Блокування прокрутки при відкритті форми
watch(isOrderFormVisible, (newValue) => {
  if (newValue) {
    lockScroll()
    products.value = getAllProduct() // Оновлюємо список продуктів при відкритті форми
  } else {
    unlockScroll()
  }
})

function submitOrder(values: any) {
  const basketData = getAllProduct()

  const restoId = basketData[0].restoId

  const order = basketData.map((item: OrderProduct) => ({
    productId: item.id,
    quantity: item.count,
    price: item.price,
    image: item.image,
    title: item.title,
  }))

  const newOrder = {
    restoUid: restoId,
    data: JSON.stringify(order),
    orderAddress: formatDate.orderAddress,
    orderPhone: formatDate.orderPhone,
    orderPaymentMethod: formatDate.orderPaymentMethod,
    comment: formatDate.orderComment,
    status: 'new',
  }

  orderData(newOrder)

  // Очищаємо кошик
  clear()

  // Закриваємо форму
  closeOrderForm()

  // Показати успішний тост
  toastRef.value?.show()

  // Переходимо на сторінку підтвердження
  router.push('/order')
}
</script>

<template>
  <UiToast ref="toastRef" message="Замовлення оформлено" type="success" />
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
            <Form
              @submit="submitOrder"
              :validation-schema="validationSchema"
              :initial-values="{
                orderAddress: formatDate.orderAddress,
                orderPhone: formatDate.orderPhone,
                orderPaymentMethod: formatDate.orderPaymentMethod,
              }"
            >
              <div class="order-form__field">
                <Field name="orderAddress" v-slot="{ field, errorMessage, handleChange, handleBlur }">
                  <UiInput
                    :modelValue="formatDate.orderAddress"
                    @update:modelValue="
                      (v) => {
                        formatDate.orderAddress = v
                        handleChange(v as any)
                      }
                    "
                    @blur="handleBlur"
                    type="text"
                    label="Адреса доставки"
                    placeholder="Введіть адресу доставки"
                    :error="errorMessage"
                  />
                </Field>
              </div>

              <div class="order-form__field">
                <Field name="orderPhone" v-slot="{ field, errorMessage, handleChange, handleBlur }">
                  <UiInput
                    :modelValue="formatDate.orderPhone"
                    @update:modelValue="
                      (v) => {
                        formatDate.orderPhone = v
                        handleChange(v as any)
                      }
                    "
                    @blur="handleBlur"
                    type="tel"
                    label="Номер телефону"
                    placeholder="+380XXXXXXXXX"
                    :error="errorMessage"
                  />
                </Field>
              </div>

              <div class="order-form__field">
                <Field name="orderPaymentMethod" v-slot="{ field, handleChange }">
                  <UiSelect
                    :modelValue="formatDate.orderPaymentMethod"
                    @update:modelValue="
                      (v) => {
                        formatDate.orderPaymentMethod = v
                        handleChange(v as any)
                      }
                    "
                    :options="options"
                    label="Спосіб оплати"
                  />
                </Field>
              </div>

              <!-- Коментар до замовлення (без валідації) -->
              <div class="order-form__field">
                <Field name="orderComment" v-slot="{ handleChange, handleBlur }">
                  <UiInput
                    :modelValue="formatDate.orderComment"
                    @update:modelValue="
                      (v) => {
                        formatDate.orderComment = v
                        handleChange(v as any)
                      }
                    "
                    @blur="handleBlur"
                    type="text"
                    label="Коментар до замовлення"
                    placeholder="Додайте коментар (необов'язково)"
                  />
                </Field>
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

              <Transition name="fade-scale">
                <button type="submit" class="order-form__button">
                  <div class="order-form__button-text">
                    {{ 'Підтвердити замовлення' }}
                  </div>

                  <hr class="order-form__button-line" />

                  <div class="order-form__button-price">
                    <div class="order-form__button-sum">{{ totalPrice }}</div>
                    грн
                  </div>
                </button>
              </Transition>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.order-form {
  position: fixed;
  z-index: 11;
  left: 0;
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
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
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

    height: 50px;
    border-radius: 30px;
    background-color: $main-color;
    text-shadow: $main-text-shadow;
    color: $white;
    cursor: pointer;
    user-select: none;
    text-align: center;
    border: none;
    line-height: 50px;
    padding: 0 25px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.2s;
    width: calc(100% - 50px);
    max-width: 440px;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: 0 0;

    &:active {
      transform: scale(0.95) translateX(-50%);
    }

    &-text {
      flex-grow: 1;
    }

    &-line {
      flex-grow: 0;
      height: 30px;
      width: 1px;
      border-radius: 2px;
      background-color: $background;
    }

    &-price {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      flex-grow: 1;
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

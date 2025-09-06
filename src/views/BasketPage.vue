<template>
  <div class="basket-page">
    <!-- <h1 class="basket-page__title">Кошик</h1> -->

    <div v-if="products.length" class="basket-page__content">
      <div class="basket-page__products">
        <div v-for="product in products" :key="product.id" class="basket-product">
          <div class="basket-product__image">
            <img :src="product.image" alt="product image" />
          </div>
          <div class="basket-product__info">
            <h3 class="basket-product__title">{{ product.title }}</h3>

            <div class="basket-product__data">
              <div class="basket-product__price">{{ product.price * product.count }} ₴</div>
              <div class="basket-product__count">
                <UiCounter v-model="product.count" modifier="basket" @update:model-value="updateProductCount(product.id, $event)" />
              </div>
            </div>
          </div>
          <button class="basket-product__remove" @click="removeProduct(product.id)">
            <BaseSvg id="close-icon" />
          </button>
        </div>
      </div>

      <div class="basket-page__summary">
        <div class="basket-page__total">
          <span>Загальна сума:</span>
          <span class="basket-page__total-price">{{ totalPrice }} ₴</span>
        </div>
        <button class="basket-page__checkout" @click="openOrderForm">Оформити замовлення</button>
        <button class="basket-page__clear" @click="clearBasket">Очистити кошик</button>
      </div>
    </div>

    <div v-else class="basket-page__empty">
      <BaseLottie class="basket-page__animation" :src="'/animations/6/animate.json'" :loop="true" :autoplay="true" />

      <div class="basket-page__empty-text">Ваш кошик порожній</div>
    </div>
  </div>

  <OrderForm />
</template>

<script setup lang="ts">
import { useBasket } from '@/composable/useBasket'
import { ref, onMounted, computed, onActivated } from 'vue'
import OrderForm from '@/components/widgets/OrderForm.vue'
import { isOrderFormVisible, openOrderForm, closeOrderForm } from '@/composable/useOrderForm'
import BaseSvg from '@/components/base/BaseSvg.vue'
import BaseLottie from '@/components/base/BaseLottie.vue'
import UiCounter from '@/components/ui/UiCounter.vue'

const { getAllProduct, getTotalPrice, remove, clear, add } = useBasket()

function updateProductCount(productId: number, count: number) {
  const product = products.value.find((p) => p.id === productId)
  if (product) {
    if (count === 0) {
      remove(productId)
    } else {
      add(product, count)
    }
  }
}
const products = ref(getAllProduct())
const totalPrice = computed(() => getTotalPrice())

onActivated(() => {
  products.value = getAllProduct()
})

function removeProduct(id: number) {
  remove(id)
  products.value = getAllProduct()
}

function clearBasket() {
  clear()
  products.value = getAllProduct()
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.basket-page {
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
    gap: 20px;
  }

  &__products {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  &__summary {
    background-color: $white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__total {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
    color: $text;
  }

  &__total-price {
    color: $main-color;
    font-weight: 600;
  }

  &__checkout {
    width: 100%;
    padding: 12px;
    background-color: $main-color;
    color: $white;
    text-shadow: $main-text-shadow;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    margin-bottom: 10px;
  }

  &__clear {
    width: 100%;
    padding: 12px;
    background-color: $text;
    color: $white;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
  }

  &__empty {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px 0;
    color: $text;
    min-height: 60vh;

    &-text {
      margin-top: -25px;
      font-size: 16px;
    }
  }

  &__animation {
    width: 150px;
  }
}

.basket-product {
  min-height: 85px;
  position: relative;
  display: flex;
  background-color: $white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &__image {
    width: 85px;
    height: 85px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    flex: 1;
    padding: 5px 10px 8px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__data {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: $text;
    margin-bottom: 5px;
    padding-right: 30px;
  }

  &__price {
    font-weight: 600;
    color: $main-color;
  }

  &__count {
    font-size: 14px;
    color: $text;
    display: flex;
    align-items: center;
  }

  &__remove {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    border: none;
    color: $text;
    padding: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    margin-right: 5px;
    margin-top: 5px;

    &:hover {
      color: $main-color;
    }
  }
}
</style>

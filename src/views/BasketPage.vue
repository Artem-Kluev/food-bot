<script setup lang="ts">
import { useBasket } from '@/composable/useBasket'
import { ref, onMounted, computed } from 'vue'

const { getAllProduct, getTotalPrice, remove, clear } = useBasket()
const products = ref(getAllProduct())
const totalPrice = computed(() => getTotalPrice())

function removeProduct(id: number) {
  remove(id)
  products.value = getAllProduct()
}

function clearBasket() {
  clear()
  products.value = getAllProduct()
}
</script>

<template>
  <div class="basket-page">
    <h1 class="basket-page__title">Кошик</h1>

    <div v-if="products.length" class="basket-page__content">
      <div class="basket-page__products">
        <div v-for="product in products" :key="product.id" class="basket-product">
          <div class="basket-product__image">
            <img :src="product.image" alt="product image" />
          </div>
          <div class="basket-product__info">
            <h3 class="basket-product__title">{{ product.title }}</h3>
            <div class="basket-product__price">{{ product.price }} ₴</div>
            <div class="basket-product__count">Кількість: {{ product.count }}</div>
          </div>
          <button class="basket-product__remove" @click="removeProduct(product.id)">Видалити</button>
        </div>
      </div>

      <div class="basket-page__summary">
        <div class="basket-page__total">
          <span>Загальна сума:</span>
          <span class="basket-page__total-price">{{ totalPrice }} ₴</span>
        </div>
        <button class="basket-page__checkout">Оформити замовлення</button>
        <button class="basket-page__clear" @click="clearBasket">Очистити кошик</button>
      </div>
    </div>

    <div v-else class="basket-page__empty">
      <p>Ваш кошик порожній</p>
    </div>
  </div>
</template>

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
    text-align: center;
    padding: 40px 0;
    color: $text;
    font-size: 18px;
  }
}

.basket-product {
  display: flex;
  background-color: $white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

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

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: $text;
    margin-bottom: 5px;
  }

  &__price {
    font-weight: 600;
    color: $main-color;
  }

  &__count {
    font-size: 14px;
    color: $text;
  }

  &__remove {
    align-self: center;
    background: none;
    border: none;
    color: $text;
    padding: 0 10px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      color: $main-color;
    }
  }
}
</style>

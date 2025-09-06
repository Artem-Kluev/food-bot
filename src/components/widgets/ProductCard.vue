<template>
  <div
    class="product"
    :class="{ [`product_${modifier}`]: modifier, [`product_${size}`]: size, observer: observer }"
    @click="handleProductClick"
  >
    <div class="product__like">
      <UiLike v-model="isLiked" @click.stop />
    </div>

    <div class="product__image">
      <img :src="slideData.image" alt="product image" />

      <UiRating v-if="slideData.rating" :rating="slideData.rating" class="product__rating" />
      <UiTime v-if="slideData.type === 'resto' && slideData.time" :time="slideData.time" class="product__time" />
      <UiPrice v-if="slideData.type === 'food' && slideData.price" :price="slideData.price" class="product__price" />
    </div>
    <div class="product__info">
      <h3 class="product__name">{{ slideData.title }} {{ slideData.type === 'food' ? slideData.restoId : '' }}</h3>

      <UiCounter
        v-if="counter && slideData.type === 'food'"
        v-model="productCount"
        class="product__counter"
        @update:modelValue="updateBasket"
        @click.stop
      />
    </div>
  </div>

  <UiConfirmModal
    ref="confirmModal"
    text="Товар з іншого ресторану. Додавання цього товару очистить вашу корзину. Продовжити?"
    confirm-text="Так"
    cancel-text="Ні"
    @confirm="handleConfirm"
  />
</template>

<script setup lang="ts">
import type { Resto, Food } from '@/mixins/interfaces'
import UiLike from '@/components/ui/UiLike.vue'
import UiRating from '@/components/ui/UiRating.vue'
import UiTime from '@/components/ui/UiTime.vue'
import UiPrice from '@/components/ui/UiPrice.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import { setRestoBlockData } from '@/composable/useRestoBlock'
import { setFoodBlockData } from '@/composable/useFoodBlock'
import { useBasket } from '@/composable/useBasket'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import UiConfirmModal from '@/components/ui/UiConfirmModal.vue'

interface Props {
  slideData: Resto | Food
  modifier?: 'resto'
  counter?: boolean
  size?: 'min'
  observer?: boolean
}

const props = defineProps<Props>()

const isLiked = ref(false)
const productCount = ref(0)
const router = useRouter()
const confirmModal = ref()
const pendingProduct = ref<{ id: number; title: string; image: string; price: number; restoId: number; minOrder: number } | null>(null)
const pendingCount = ref(0)

const { getProduct, add, remove, on } = useBasket()

// Зберігаємо функцію відписки, щоб викликати її при розмонтуванні
const unsubscribe = on(() => {
  if (props.counter && props.slideData.type === 'food') {
    const basketProduct = getProduct(props.slideData.id)

    if (basketProduct) productCount.value = basketProduct.count
    else {
      productCount.value = 0
    }
  }
})

// Відписуємося від слухача при розмонтуванні компонента
onUnmounted(() => {
  unsubscribe()
})

function handleProductClick() {
  if (props.slideData.type === 'resto') {
    setRestoBlockData({
      resto: props.slideData as Resto,
    })
  } else if (props.slideData.type === 'food') {
    setFoodBlockData({
      food: props.slideData as Food,
    })
  }
}

onMounted(() => {
  if (props.counter && props.slideData.type === 'food') {
    const basketProduct = getProduct(props.slideData.id)

    if (basketProduct) productCount.value = basketProduct.count
  }
})

function updateBasket(newCount: number) {
  if (props.slideData.type !== 'food' || !props.counter || !props.slideData.price?.base || !props.slideData.restoId) return

  if (newCount > 0) {
    const { restoId: basketRestoId, getAllProduct, clear } = useBasket()

    console.log(basketRestoId.value, props.slideData.restoId)

    if (basketRestoId.value !== null && basketRestoId.value !== props.slideData.restoId && getAllProduct().length > 0) {
      // Зберігаємо дані про товар, який хочемо додати
      pendingProduct.value = {
        id: props.slideData.id,
        title: props.slideData.title,
        image: props.slideData.image,
        price: props.slideData.price.base,
        restoId: props.slideData.restoId,
        minOrder: props.slideData.minOrder,
      }
      pendingCount.value = newCount

      // Показуємо модальне вікно підтвердження
      confirmModal.value.openModal()
      return
    }

    // Якщо корзина порожня або товари з того ж ресторану, додаємо товар
    add(
      {
        id: props.slideData.id,
        title: props.slideData.title,
        image: props.slideData.image,
        price: props.slideData.price.base,
        restoId: props.slideData.restoId,
        minOrder: props.slideData.minOrder,
      },
      newCount,
    )
  } else {
    remove(props.slideData.id)
  }
}

function handleConfirm(value: boolean) {
  if (value && pendingProduct.value) {
    // Користувач підтвердив додавання товару з іншого ресторану
    const { clear } = useBasket()

    // Очищаємо корзину
    clear()

    // Додаємо новий товар
    add(pendingProduct.value, pendingCount.value)

    // Скидаємо тимчасові дані
    pendingProduct.value = null
    pendingCount.value = 0
  } else {
    // Користувач скасував додавання, повертаємо лічильник до попереднього значення
    const basketProduct = getProduct(props.slideData.id)
    if (basketProduct) {
      productCount.value = basketProduct.count
    } else {
      productCount.value = 0
    }
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.product {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  position: relative;

  &__like {
    position: absolute;
    top: 8px;
    right: 18px;
    z-index: 1;
  }

  &__tag {
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 10px;
    width: fit-content;
    margin-bottom: 5px;
    font-weight: 500;
  }

  &__image {
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__rating {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  &__time {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  &__price {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  &__tags {
    position: absolute;
    padding: 10px 5px;
    top: 0;
    z-index: 1;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 12px;
  }

  &__counter {
    align-self: flex-start;
    margin-top: 4px;
    flex-shrink: 0;
  }

  &__name {
    font-size: 16px;
    font-weight: 500;
    height: 24px;
    color: $text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &_resto {
    .product {
      &__image {
        aspect-ratio: 4/2.2;
      }
    }
  }

  &_min {
    margin-bottom: 0;

    .product {
      &__image {
        aspect-ratio: 1.5/1;
      }

      &__like {
        top: 4px;
        right: 6px;
      }

      &__rating {
        bottom: 4px;
        right: 6px;
      }

      &__time {
        bottom: 4px;
        left: 6px;
      }

      &__info {
        padding: 5px;
      }

      &__name {
        font-size: 14px;
      }
    }
  }
}
</style>

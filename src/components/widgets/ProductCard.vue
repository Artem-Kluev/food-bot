<script setup lang="ts">
import type { Resto, Food } from '@/mixins/interfaces'
import UiLike from '@/components/ui/UiLike.vue'
import UiPrice from '@/components/ui/UiPrice.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import { setRestoBlockData } from '@/composable/useRestoBlock'
import { setFoodBlockData } from '@/composable/useFoodBlock'
import { useBasket } from '@/composable/useBasket'
import { useLike } from '@/composable/useLike'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import UiConfirmModal from '@/components/ui/UiConfirmModal.vue'
import type { LikeType } from '@/mixins/interfaces'

interface Props {
  slideData: Resto | Food | any
  modifier?: 'resto' | 'food'
  counter?: boolean
  size?: 'min'
  observer?: boolean
  currentResto?: Resto | null
  hideBtn?: boolean
}

const props = defineProps<Props>()

const { isLiked, toggleLike, restoLikes, foodLikes } = useLike()
const productCount = ref(0)

// Використовуємо computed для автоматичного оновлення стану лайка
const isItemLiked = computed(() => {
  if (!props.slideData || !props.slideData.id) return false

  const type = props.modifier || ('food' as LikeType)
  return isLiked(props.slideData.id, type)
})

const confirmModal = ref()
const pendingProduct = ref<{ id: number; title: string; image: string; price: number; restoId: string; minOrder: number } | null>(null)
const pendingCount = ref(0)

const { getProduct, add, remove, on } = useBasket()

on(() => {
  getCount()
})

// Відписуємося від слухача при розмонтуванні компонента
// onUnmounted(() => {
//   unsubscribe()
// })

function handleProductClick() {
  if (props.modifier === 'resto') {
    setRestoBlockData({
      resto: props.slideData as Resto,
    })
  } else if (props.modifier === 'food') {
    setFoodBlockData({
      food: props.slideData as Food,
    })
  }
}

onMounted(() => {
  getCount()
})

function getCount() {
  if (props.counter && props.modifier === 'food') {
    const basketProduct = getProduct(props.slideData.id)

    if (basketProduct) productCount.value = basketProduct.count
    else {
      productCount.value = 0
    }
  }
}

function updateBasket(newCount: number) {
  if (props.modifier !== 'food' || !props.counter || !props.slideData.basePrice || !props.slideData.restoUid) return

  if (newCount > 0) {
    const { restoId: basketRestoId, getAllProduct, clear } = useBasket()

    if (basketRestoId.value !== null && basketRestoId.value !== props.slideData.restoUid && getAllProduct().length > 0) {
      pendingProduct.value = {
        id: props.slideData.id,
        title: props.slideData.title,
        image: props.slideData.imageUrl,
        price: props.slideData.basePrice,
        restoId: props.slideData.restoUid,
        minOrder: props.currentResto?.minOrder || 0,
      }

      pendingCount.value = newCount

      // Показуємо модальне вікно підтвердження
      confirmModal.value.openModal()
      return
    }

    console.log(props.currentResto?.minOrder)
    add(
      {
        id: props.slideData.id,
        title: props.slideData.title,
        image: props.slideData.imageUrl,
        price: props.slideData.basePrice,
        restoId: props.slideData.restoUid,
        minOrder: props.currentResto?.minOrder || 0,
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

// Функція для обробки зміни стану лайка
function handleLikeToggle() {
  if (!props.slideData || !props.slideData.id) return

  const type = props.modifier || ('food' as LikeType)
  // Викликаємо toggleLike для оновлення стану в localStorage
  toggleLike(props.slideData.id, type)
}

const imgErr = ref(false)
const showImg = computed(() => !!props.slideData?.imageUrl && !imgErr.value)
</script>

<template>
  <div class="product" :class="{ [`product_${size}`]: size, observer: observer }" @click="handleProductClick">
    <div class="product__like">
      <UiLike :modelValue="isItemLiked" @click.stop @update:modelValue="handleLikeToggle" />
    </div>

    <div class="product__image">
      <img v-if="showImg" :src="slideData.imageUrl" alt="product image" class="product__img" @error="imgErr = true" />
      <BaseSvg v-if="!showImg" id="image-icon" class="product__image-icon" />

      <!-- <UiRating v-if="slideData.rating" :rating="slideData.rating" class="product__rating" /> -->
      <!-- <UiTime v-if="slideData.type === 'resto' && slideData.time" :time="slideData.time" class="product__time" /> -->

      <UiPrice
        v-if="modifier === 'food' && slideData.basePrice"
        :price="{
          base: slideData.basePrice,
          old: slideData.oldPrice,
        }"
        class="product__price"
      />
    </div>
    <div class="product__info">
      <h3 class="product__name">{{ slideData.title }}</h3>

      <UiCounter
        v-if="modifier === 'food' && !hideBtn"
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

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.product {
  width: 100%;
  height: fit-content;
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
    aspect-ratio: 4/2.2;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      color: $gray;
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

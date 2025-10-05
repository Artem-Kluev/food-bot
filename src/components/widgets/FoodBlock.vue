<script setup lang="ts">
import { isFoodBlockVisable, closeFoodBlock, currentFood } from '@/composable/useFoodBlock'
import { useLike } from '@/composable/useLike'
import { useScrollLock } from '@/composable/useScrollLock'
import { watch, ref, computed, onUnmounted, onMounted } from 'vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import UiPrice from '@/components/ui/UiPrice.vue'
import { useBasket } from '@/composable/useBasket'
import { useRouter } from 'vue-router'
import BaseSvg from '@/components/base/BaseSvg.vue'
import UiLike from '@/components/ui/UiLike.vue'
import RestoPreview from '@/components/widgets/RestoPreview.vue'
import UiConfirmModal from '@/components/ui/UiConfirmModal.vue'
import { allRestoCard, request } from '@/composable/useResto'
import { setRestoBlockData } from '@/composable/useRestoBlock'
import type { LikeType } from '@/mixins/interfaces'

const productCount = ref(0)
const confirmModal = ref<InstanceType<typeof UiConfirmModal> | null>(null)
const pendingProduct = ref<{ id: number; title: string; image: string; price: number; restoId: number; minOrder: number } | null>(null)
const pendingCount = ref(0)
const currentResto = ref<any | null>(null)
const { isLiked, toggleLike, restoLikes, foodLikes } = useLike()

// Використовуємо computed для автоматичного оновлення стану лайка
const isFoodLiked = computed(() => {
  if (!currentFood.value?.id) return false
  return isLiked(currentFood.value.id, 'food')
})

const { lockScroll, unlockScroll } = useScrollLock()
const router = useRouter()

function getRestoData() {
  currentResto.value = allRestoCard.value.find((resto) => resto.restoId === currentFood.value.restoUid)
}

// Функція для відкриття RestoBlock при кліку на превью ресторану
function openRestoBlock() {
  if (currentResto.value) {
    // Закриваємо поточний FoodBlock
    closeFoodBlock(false)
    
    // Відкриваємо RestoBlock з поточним рестораном
    setRestoBlockData({
      resto: currentResto.value,
      liked: isLiked(currentResto.value.id, 'resto'),
      restoRating: currentResto.value.rating
    })
  }
}

watch(isFoodBlockVisable, (newValue) => {
  if (newValue) {
    lockScroll()
    updateProductCount()
    getRestoData()
    // Більше не потрібно перевіряти лайки при відкритті блоку,
    // оскільки тепер використовуємо реактивне обчислюване значення
  } else {
    unlockScroll()
  }
})

// Оновлюємо лічильник при зміні продукту
watch(currentFood, () => {
  updateProductCount()
})

onMounted(() => {
  request()
})

// Відписуємося від слухача при розмонтуванні компонента
onUnmounted(() => {
  unsubscribe()
})

function navigateToBasket() {
  router.push('/basket')
  closeFoodBlock(true)
}

// Використовуємо isLiked та rating з useFoodBlock.ts

const { getTotalPrice, getAllProduct, on, add, remove, getProduct } = useBasket()
const totalPrice = computed(() => getTotalPrice())

const basketProducts = ref(0)

// Зберігаємо функцію відписки, щоб викликати її при розмонтуванні
const unsubscribe = on(() => {
  basketProducts.value = getTotalPrice()
})

function updateBasket(newCount: number) {
  console.log('updateBasket викликано з newCount:', newCount)
  console.log('currentFood:', currentFood.value)
  productCount.value = newCount

  if (!currentFood.value || !currentFood.value.price || !currentFood.value.restoId) {
    console.log('Відсутні необхідні дані:', { 
      currentFood: currentFood.value, 
      price: currentFood.value?.price, 
      restoId: currentFood.value?.restoId 
    })
    return
  }

  // Перетворюємо ціну та minOrder на числа, якщо вони є рядками
  const price = typeof currentFood.value.price === 'string' 
    ? parseFloat(currentFood.value.price) 
    : currentFood.value.price
  
  const minOrder = typeof currentFood.value.minOrder === 'string'
    ? parseFloat(currentFood.value.minOrder)
    : currentFood.value.minOrder

  if (newCount > 0) {
    const { restoId: basketRestoId, getAllProduct, clear } = useBasket()
    console.log('Дані кошика:', { 
      basketRestoId: basketRestoId.value, 
      currentRestoId: currentFood.value.restoId,
      basketProducts: getAllProduct().length 
    })

    // Перевіряємо, чи є товари в корзині з іншого ресторану
    if (basketRestoId.value !== null && basketRestoId.value !== currentFood.value.restoId && getAllProduct().length > 0) {
      console.log('Виявлено товари з іншого ресторану, відкриваємо модальне вікно')
      // Зберігаємо дані про товар, який хочемо додати
      pendingProduct.value = {
        id: currentFood.value.id,
        title: currentFood.value.title,
        image: currentFood.value.image,
        price: price,
        restoId: currentFood.value.restoId,
        minOrder: minOrder,
      }
      pendingCount.value = newCount

      // Показуємо модальне вікно підтвердження
      if (confirmModal.value && typeof confirmModal.value.openModal === 'function') {
        console.log('Відкриваємо модальне вікно підтвердження')
        confirmModal.value.openModal()
      } else {
        console.error('confirmModal не ініціалізовано або не має методу openModal')
      }
      return
    }

    console.log('Додаємо товар в кошик:', {
      id: currentFood.value.id,
      title: currentFood.value.title,
      count: newCount,
      price: price
    })
    
    // Якщо корзина порожня або товари з того ж ресторану, додаємо товар
    add(
      {
        id: currentFood.value.id,
        title: currentFood.value.title,
        image: currentFood.value.image,
        price: price,
        restoId: currentFood.value.restoId,
        minOrder: minOrder,
      },
      newCount,
    )
  } else {
    console.log('Видаляємо товар з кошика:', currentFood.value.id)
    remove(currentFood.value.id)
  }
}

// Функція для оновлення значення лічильника
function updateProductCount() {
  if (currentFood.value) {
    const basketProduct = getProduct(currentFood.value.id)
    if (basketProduct) {
      productCount.value = basketProduct.count
    } else {
      productCount.value = 0
    }
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
    updateProductCount()
  }
}

// Функція для обробки зміни стану лайка
function handleLikeToggle() {
  if (currentFood.value?.id) {
    // Зберігаємо зміну в localStorage через useLike
    toggleLike(currentFood.value.id, 'food')
  }
}
</script>

<template>
  <Transition name="fade-slide">
    <div v-if="isFoodBlockVisable && currentFood" class="food-block">
      <div class="food-block__main" @click.self="closeFoodBlock(false)">
        <div class="food-block__wrapper">
          <div class="food-block__image">
            <div class="food-block__back" @click="closeFoodBlock(false)">
              <BaseSvg class="food-block__back-icon" id="arrow-logo" />
            </div>

            <img class="food-block__img" :src="currentFood.imageUrl" />
          </div>

          <div class="food-block__top">
            <div class="food-block__title">{{ currentFood.title }}</div>

            <UiLike v-model="isFoodLiked" @update:modelValue="handleLikeToggle" />
          </div>

          <div class="food-block__description">
            {{ currentFood.description }}
          </div>

          <div class="food-block__pay">
            <div class="food-block__price">
              <div class="food-block__price-title">Ціна:</div>

              <div class="food-block__price-price">
                <UiPrice :price="{ base: Number(currentFood.price) || 0, old: 0 }" modifier="big" />
              </div>
            </div>

            <UiCounter v-model="productCount" class="food-block__counter" modifier="big" @update:modelValue="updateBasket" />
          </div>

          <div class="food-block__resto">
            <RestoPreview
              v-if="currentResto"
              :title="currentResto.title"
              :description="currentResto.description"
              :image="currentResto.imageUrl"
              @click="openRestoBlock"
            />
          </div>

          <Transition name="fade-scale">
            <div v-if="totalPrice > 0" class="food-block__button" @click="navigateToBasket">
              <div class="food-block__button-text">Перейти в корзину</div>

              <hr class="food-block__button-line" />

              <div class="food-block__button-price">
                <div class="food-block__button-sum">{{ totalPrice }}</div>
                грн
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </Transition>

  <UiConfirmModal
    ref="confirmModal"
    text="Товар з іншого ресторану. Додавання цього товару очистить вашу корзину. Продовжити?"
    confirm-text="Так"
    cancel-text="Ні"
    @confirm="handleConfirm"
  />
</template>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.food-block {
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

  &__image {
    position: relative;
    top: -1px;
    width: 100%;
    aspect-ratio: 1.5 / 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
  }

  &__back {
    position: absolute;
    z-index: 2;
    top: 15px;
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

    &-icon {
      transform: rotate(180deg);
      width: 30px;
      height: 30px;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: 500;
  }

  &__description {
    padding: 0 10px;
    margin-bottom: 30px;
  }

  &__pay {
    display: flex;
    padding: 0 10px;
    margin-bottom: 20px;
  }

  &__counter {
    flex-basis: 35%;
  }

  &__price {
    flex-basis: 65%;
    font-size: 30px;
    display: flex;
    align-items: center;
  }

  &__price-title {
    font-size: 20px;
    padding-right: 5px;
  }

  &__price-price {
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

  &__resto {
    display: flex;
    align-items: flex-end;
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

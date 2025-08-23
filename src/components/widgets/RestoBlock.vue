<template>
  <Transition name="fade-slide">
    <div v-if="isRestoBlockVisable" class="resto-block">
      <div class="resto-block__main" @click.self="closeRestoBlock">
        <div class="resto-block__wrapper">
          <div class="resto-block__image">
            <div class="resto-block__back" @click="closeRestoBlock">
              <BaseSvg class="resto-block__back-icon" id="arrow-logo" />
            </div>

            <img v-if="currentResto" class="resto-block__img" :src="currentResto.image" />
          </div>

          <div class="resto-block__top">
            <UiStarRating :rating="rating" @change="rating = $event" />

            <UiLike v-model="isLiked" modifier="resto" />
          </div>

          <div v-if="currentResto" class="resto-block__title">{{ currentResto.title }}</div>

          <div v-if="currentResto" class="resto-block__description">
            {{ currentResto.description }}
          </div>

          <ButtonSlider :buttons="payment" class="resto-block__filters" radio />

          <div class="resto-block__cards">
            <ProductCard v-for="item in foodSliders" :key="item.title" :slide-data="item" modifier="resto" counter />
          </div>

          <Transition name="fade-scale">
            <div v-if="totalPrice > 0" class="resto-block__button" @click="navigateToBasket">
              <div class="resto-block__button-text">Перейти в корзину</div>

              <hr class="resto-block__button-line" />

              <div class="resto-block__button-price">
                <div class="resto-block__button-sum">{{ totalPrice }}</div>
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

<script setup lang="ts">
import { isRestoBlockVisable, toggleRestoBlock, closeRestoBlock, currentResto, isLiked, rating } from '@/composable/useRestoBlock'
import { useScrollLock } from '@/composable/useScrollLock'
import { watch, ref, computed, onUnmounted } from 'vue'
import ButtonSlider from '@/components/widgets/ButtonSlider.vue'
import { useBasket } from '@/composable/useBasket'
import { useRouter } from 'vue-router'

import BaseSvg from '@/components/base/BaseSvg.vue'
import UiStarRating from '@/components/ui/UiStarRating.vue'
import UiLike from '@/components/ui/UiLike.vue'
import ProductCard from '@/components/widgets/ProductCard.vue'
import UiConfirmModal from '@/components/ui/UiConfirmModal.vue'
import { foodSliders } from '@/mixins/food'

const { lockScroll, unlockScroll } = useScrollLock()
const router = useRouter()
const confirmModal = ref()

function navigateToBasket() {
  router.push('/basket')
  closeRestoBlock()
}

function openConfirmModal() {
  confirmModal.value.openModal()
}

const pendingProduct = ref<{ id: number; title: string; image: string; price: number; restoId: number } | null>(null)
const pendingCount = ref(0)

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
  }
}

// Використовуємо isLiked та rating з useRestoBlock

const { getTotalPrice, getAllProduct, on, add, clear } = useBasket()
const totalPrice = computed(() => getTotalPrice())

const basketProducts = ref(0)

// Зберігаємо функцію відписки, щоб викликати її при розмонтуванні
const unsubscribe = on(() => {
  basketProducts.value = getTotalPrice()
})

// Відписуємося від слухача при розмонтуванні компонента
onUnmounted(() => {
  unsubscribe()
})

const payment = ref<Array<any>>([
  {
    title: 'Піца',
    id: 1,
  },
  {
    title: 'Супи',
    id: 2,
  },
  {
    title: 'Напої',
    id: 2,
  },
  {
    title: 'Алкоголь',
    id: 2,
  },
  {
    title: 'Суши',
    id: 2,
  },
])

watch(isRestoBlockVisable, (newValue) => {
  if (newValue) {
    lockScroll()
  } else {
    unlockScroll()
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.resto-block {
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
    padding: 10px 10px 0;
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
    padding: 10px;
    cursor: pointer;
    transition: color 0.2s;
  }

  &__description {
    padding: 0 10px;
    margin-bottom: 30px;
  }

  &__filters {
    margin-bottom: 20px;
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 10px;
    contain: content;
    will-change: transform;
    transform: translateZ(0);
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

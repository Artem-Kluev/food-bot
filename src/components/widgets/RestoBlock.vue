<template>
  <Transition name="fade-slide">
    <div v-if="isRestoBlockVisable" class="resto-block">
      <div class="resto-block__main" @click.self="closeRestoBlock(false)">
        <div class="resto-block__wrapper">
          <div class="resto-block__image">
            <div class="resto-block__back" @click="closeRestoBlock(false)">
              <BaseSvg class="resto-block__back-icon" id="arrow-logo" />
            </div>

            <img v-if="currentResto" class="resto-block__img" :src="currentResto.image" />
          </div>

          <div class="resto-block__top">
            <UiStarRating :rating="rating" @change="rating = $event" />

            <UiLike v-model="isLiked" modifier="resto" />
          </div>

          <div v-if="currentResto" class="resto-block__title">{{ currentResto.title }}</div>

          <TagSlider v-if="allTags" :tags="allTags" class="resto-block__tags" />

          <div v-if="currentResto" class="resto-block__description">
            {{ currentResto.description }}
          </div>

          <div class="resto-block__info-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div class="resto-block__info-label">Мінімальне замовлення</div>
                  </td>
                  <td class="resto-block__info-value">{{ currentResto?.minOrder }} ₴</td>
                </tr>
                <tr>
                  <td>
                    <div class="resto-block__info-label">Ціна доставки</div>
                  </td>
                  <td class="resto-block__info-value">80 ₴</td>
                </tr>
                <tr>
                  <td>
                    <div class="resto-block__info-label">Безкоштовна доставка</div>
                  </td>
                  <td class="resto-block__info-value">від 500 ₴</td>
                </tr>
                <tr>
                  <td>
                    <div class="resto-block__info-label">Час доставки</div>
                  </td>
                  <td class="resto-block__info-value">30-45 хвилин</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="resto-block__buttons">
            <div class="resto-block__buttons-item resto-block__buttons-call">
              <BaseSvg class="resto-block__buttons-call-icon" id="call-logo" />

              <span>Позвонить</span>
            </div>

            <div class="resto-block__buttons-item resto-block__buttons-send">
              <BaseSvg class="resto-block__buttons-send-icon" id="send-logo" />

              <span>Напискати</span>
            </div>
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
import { isRestoBlockVisable, closeRestoBlock, currentResto, isLiked, rating } from '@/composable/useRestoBlock'
import { useScrollLock } from '@/composable/useScrollLock'
import { watch, ref, computed, onUnmounted } from 'vue'
import ButtonSlider from '@/components/widgets/ButtonSlider.vue'
import TagSlider from '@/components/widgets/TagSlider.vue'
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
  // Зберігаємо інформацію про перехід у корзину через RestoBlock у sessionStorage
  sessionStorage.setItem('fromRestoBlock', 'true')
  sessionStorage.setItem('restoId', currentResto.value?.id.toString() || '')
  router.push('/basket')
  closeRestoBlock()
}

const pendingProduct = ref<{ id: number; title: string; image: string; price: number; restoId: number; minOrder: number } | null>(null)
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

const allTags = [
  { title: 'Акція', id: 1 },
  // { title: 'Безкоштовна доставка', id: 2 },
  // { title: 'Новинка', id: 3 },
  // { title: 'Популярне', id: 4 },
]

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
    padding: 10px 10px 0;
    cursor: pointer;
    transition: color 0.2s;
  }

  &__description {
    padding: 0 10px;
    margin-bottom: 5px;
  }

  &__info-table {
    padding: 0 10px;
    margin: 20px 0 25px;

    table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      position: relative;
      background-color: rgba($main-color, 0.05);
      border-radius: 7px;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        left: -1px;
        top: 0;
        height: 100%;
        width: 4px;
        background-color: $main-color;
        opacity: 0.7;
      }
    }

    tr {
      transition: all 0.3s ease;
    }

    td {
      padding: 12px 10px;
      vertical-align: middle;

      &:first-child {
        width: 70%;
      }

      &:last-child {
        text-align: right;
      }
    }
  }

  &__info-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $text;
    font-size: 14px;
  }

  &__info-value {
    font-weight: 600;
    font-size: 14px;
  }

  &__tags {
    margin: 15px 0;
  }

  &__buttons {
    height: 40px;
    display: flex;
    margin: 25px 10px;
    gap: 10px;

    &-item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      flex: 1 0 calc(50% - 5px);
      background-color: $main-color;
      border-radius: 30px;
      gap: 5px;
      color: $background;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      text-shadow: $main-text-shadow;
      transition: transform 0.3s;
      user-select: none;
      cursor: pointer;

      &:active {
        transform: scale(0.95);
      }

      span {
        flex-grow: 1;
        text-align: center;
      }
    }

    &-call {
      background-color: $main-color;
      &-icon {
        width: 30px;
        height: 30px;
      }
    }

    &-send {
      background-color: $telegram;
      &-icon {
        width: 30px;
        height: 30px;
      }
    }
  }

  &__filters {
    margin-bottom: 15px;
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
      text-align: center;
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
  transform: scale(0.9) translateX(-50%);
}
</style>

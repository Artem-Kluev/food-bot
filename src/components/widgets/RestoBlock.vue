<script setup lang="ts">
import { isRestoBlockVisable, closeRestoBlock, currentResto, rating } from '@/composable/useRestoBlock'
import { useLike } from '@/composable/useLike'
import { useScrollLock } from '@/composable/useScrollLock'
import { watch, ref, computed, onUnmounted, onMounted } from 'vue'
import ButtonSlider from '@/components/widgets/ButtonSlider.vue'
import TagGrid from '@/components/widgets/TagGrid.vue'
import { useBasket } from '@/composable/useBasket'
import { useRouter } from 'vue-router'
import { tags } from '@/mixins/tags'
import BaseSvg from '@/components/base/BaseSvg.vue'
import { categories } from '@/mixins/categories'
import { formatWorkingDays, formatWorkingHours } from '@/composable/useDataFormat'
import { supabase } from '@/plugins/supabase'
import UiLike from '@/components/ui/UiLike.vue'
import ProductCard from '@/components/widgets/ProductCard.vue'
import UiConfirmModal from '@/components/ui/UiConfirmModal.vue'
import UiContactModal from '@/components/ui/UiContactModal.vue'
import type { LikeType } from '@/mixins/interfaces'

const { lockScroll, unlockScroll } = useScrollLock()
const router = useRouter()
const confirmModal = ref()
const phoneModal = ref()
const telegramModal = ref()
const { getTotalPrice, getAllProduct, on, add, clear } = useBasket()
const viewCards = ref<any[]>([])
const allCards = ref<any[]>([])
const totalPrice = computed(() => getTotalPrice())
const pendingProduct = ref<{ id: number; title: string; image: string; price: number; restoId: string; minOrder: number } | null>(null)
const pendingCount = ref(0)
const basketProducts = ref(0)
const { isLiked, toggleLike, restoLikes, foodLikes } = useLike()

// Використовуємо computed для автоматичного оновлення стану лайка
const isRestoLiked = computed(() => {
  if (!currentResto.value?.id) return false
  return isLiked(currentResto.value.id, 'resto')
})

onUnmounted(() => {
  unsubscribe()
})

function navigateToBasket() {
  // Зберігаємо інформацію про перехід у корзину через RestoBlock у sessionStorage
  sessionStorage.setItem('fromRestoBlock', 'true')
  sessionStorage.setItem('restoId', currentResto.value?.id.toString() || '')
  router.push('/basket')
  closeRestoBlock()
}

function getCategoryTitle() {
  const available = currentResto.value?.availabilityCategories

  return categories.filter((item) => available.includes(item.type))
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
  }
}

// Зберігаємо функцію відписки, щоб викликати її при розмонтуванні
const unsubscribe = on(() => {
  basketProducts.value = getTotalPrice()
})

function getTags() {
  const allTags = currentResto.value?.tags || []

  const fileterTags = tags.filter((tag) => {
    return tag.value.some((value) => allTags.includes(value))
  })

  return fileterTags.map((tag) => tag.title)
}

watch(isRestoBlockVisable, (newValue) => {
  if (newValue) {
    getData()
    lockScroll()
    // Більше не потрібно перевіряти лайки при відкритті блоку,
    // оскільки тепер використовуємо реактивне обчислюване значення
  } else {
    unlockScroll()
  }
})

async function getData() {
  if (!currentResto.value?.restoId) return

  const { data } = await supabase.from('menu').select('*').eq('restoUid', currentResto.value.restoId)

  allCards.value = data || []

  viewCards.value = data || []
}

function filterForCategory(categories: string[]) {
  let cards = allCards.value

  if (categories.length) {
    cards = cards.filter((item) => item.category === categories[0])
  }

  viewCards.value = cards
}

function openPhoneModal() {
  phoneModal.value?.openModal()
}

function openTelegramModal() {
  telegramModal.value?.openModal()
}

// Функція для обробки зміни стану лайка
function handleLikeToggle() {
  if (currentResto.value?.id) {
    // Зберігаємо зміну в localStorage через useLike
    toggleLike(currentResto.value.id, 'resto')
  }
}
</script>

<template>
  <Transition name="fade-slide">
    <div v-if="isRestoBlockVisable" class="resto-block">
      <div class="resto-block__main" @click.self="closeRestoBlock(false)">
        <div class="resto-block__wrapper">
          <div class="resto-block__image">
            <div class="resto-block__back" @click="closeRestoBlock(false)">
              <BaseSvg class="resto-block__back-icon" id="arrow-logo" />
            </div>

            <img v-if="currentResto" class="resto-block__img" :src="currentResto.imageUrl" />
          </div>

          <div class="resto-block__top">
            <div v-if="currentResto" class="resto-block__title">{{ currentResto.title }}</div>

            <UiLike :modelValue="isRestoLiked" modifier="resto" @update:modelValue="handleLikeToggle" />
          </div>

          <TagGrid v-if="getTags().length" :tags="getTags()" class="resto-block__tags" />

          <div class="resto-block__info-table">
            <table>
              <tbody>
                <tr>
                  <td>
                    <div class="resto-block__info-label">Мінімальне замовлення</div>
                  </td>
                  <td class="resto-block__info-value">{{ currentResto?.minOrder }} ₴</td>
                </tr>

                <tr v-if="currentResto?.freeDeliveryFrom">
                  <td>
                    <div class="resto-block__info-label">Безкоштовна доставка</div>
                  </td>
                  <td class="resto-block__info-value">{{ currentResto?.freeDeliveryFrom }} ₴</td>
                </tr>

                <tr>
                  <td>
                    <div class="resto-block__info-label">Ціна доставки</div>
                  </td>
                  <td class="resto-block__info-value">{{ currentResto?.deliveryPrice }} ₴</td>
                </tr>

                <tr>
                  <td>
                    <div class="resto-block__info-label">Час доставки</div>
                  </td>
                  <td class="resto-block__info-value">{{ currentResto?.deliveryTime }} хвилин</td>
                </tr>

                <tr>
                  <td>
                    <div class="resto-block__info-label">{{ formatWorkingDays(currentResto?.workingDays) }}</div>
                  </td>
                  <td class="resto-block__info-value">{{ formatWorkingHours(currentResto?.workingHours) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="resto-block__buttons">
            <div v-if="currentResto?.phoneNumber" class="resto-block__buttons-item resto-block__buttons-call" @click="openPhoneModal">
              <BaseSvg class="resto-block__buttons-call-icon" id="call-logo" />
            </div>

            <div v-if="currentResto?.telegramNick" class="resto-block__buttons-item resto-block__buttons-send" @click="openTelegramModal">
              <BaseSvg class="resto-block__buttons-send-icon" id="send-logo" />
            </div>
          </div>

          <div v-if="currentResto" class="resto-block__description">
            {{ currentResto.description }}
          </div>

          <ButtonSlider :buttons="getCategoryTitle()" class="resto-block__filters" radio @selected="filterForCategory($event)" />

          <div class="resto-block__cards">
            <ProductCard
              v-for="item in viewCards"
              :key="item.title"
              :slide-data="item"
              :current-resto="currentResto"
              modifier="food"
              counter
            />
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

  <UiContactModal
    ref="phoneModal"
    title="Номер телефону"
    :contact="currentResto?.phoneNumber || ''"
    action-text="Зателефонувати"
    :action-link="`tel:${currentResto?.phoneNumber}`"
  />

  <UiContactModal
    ref="telegramModal"
    title="Telegram"
    :contact="currentResto?.telegramNick || ''"
    action-text="Відкрити чат"
    :action-link="`https://t.me/${currentResto?.telegramNick?.replace('@', '')}`"
  />
</template>

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
    padding-right: 10px;
    cursor: pointer;
    transition: color 0.2s;
  }

  &__description {
    margin: 0 10px 25px;
    padding-bottom: 25px;
    border-bottom: 1px solid $beige;
  }

  &__info-table {
    margin: 20px 10px 25px;

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
    display: flex;
    margin: 25px 10px;
    gap: 10px;

    &-item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      height: 40px;
      background-color: $main-color;
      border-radius: 40px;
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
    min-height: 600px;
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

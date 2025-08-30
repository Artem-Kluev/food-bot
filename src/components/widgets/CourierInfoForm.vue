<template>
  <Transition name="fade-slide">
    <div v-if="isVisible" class="courier-form">
      <div class="courier-form__main" @click.self="closeForm">
        <div class="courier-form__wrapper">
          <div class="courier-form__header">
            <div class="courier-form__back" @click="closeForm">
              <BaseSvg class="courier-form__back-icon" id="arrow-logo" />
            </div>
            <div class="courier-form__title">Дані кур'єра</div>
          </div>

          <div class="courier-form__content">
            <div class="courier-form__info-block">
              <div class="courier-form__info-title">Адреса доставки</div>
              <div class="courier-form__info-box">
                <div class="courier-form__info-text">{{ deliveryAddress }}</div>
              </div>
            </div>

            <div class="courier-form__info-block">
              <div class="courier-form__info-title">Спосіб доставки</div>
              <div class="courier-form__info-box">
                <div class="courier-form__info-text">{{ deliveryMethod }}</div>
              </div>
            </div>

            <div class="courier-form__info-block">
              <div class="courier-form__info-title">Контакт кур'єра</div>
              <div class="courier-form__info-box">
                <div class="courier-form__info-text">{{ courierPhone }}</div>
                <div class="courier-form__info-copy" @click="copyPhone" :class="{ 'courier-form__info-copy_copied': copied }">
                  <BaseSvg id="copy-icon" class="courier-form__info-copy-icon" />
                </div>
              </div>
            </div>

            <div class="courier-form__note">
              Якщо кур'єр не виходить на зв'язок протягом 15 хвилин, будь ласка, зверніться до служби підтримки
            </div>

            <button class="courier-form__button" @click="closeForm">
              <div class="courier-form__button-text">Закрити</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollLock } from '@/composable/useScrollLock'
import BaseSvg from '@/components/base/BaseSvg.vue'

interface Props {
  orderId: number
  address?: string
  deliveryType?: string
  courierContact?: string
}

interface Emit {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isVisible = ref(false)
const copied = ref(false)

// Значення за замовчуванням, якщо не передані через props
const deliveryAddress = ref(props.address || 'вул. Хрещатик, 1, кв. 10, Київ, 01001')
const deliveryMethod = ref(props.deliveryType || "Кур'єрська доставка")
const courierPhone = ref(props.courierContact || '+380 50 123 4567')

const { lockScroll, unlockScroll } = useScrollLock()

function openForm() {
  isVisible.value = true
  lockScroll()
}

function closeForm() {
  isVisible.value = false
  unlockScroll()
  emit('close')
}

function copyPhone() {
  navigator.clipboard
    .writeText(courierPhone.value)
    .then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
    .catch((err) => {
      console.error('Помилка при копіюванні номера телефону: ', err)
    })
}

defineExpose({
  openForm,
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.courier-form {
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

  &__info-block {
    margin-bottom: 15px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__info-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    color: $text;
  }

  &__info-box {
    background-color: $white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  &__info-text {
    font-size: 16px;
    line-height: 1.5;
    color: $text;
    white-space: pre-line;
    user-select: text;
  }

  &__info-copy {
    &-icon {
      position: absolute;
      top: 15px;
      right: 15px;
      width: 24px;
      height: 24px;
      color: $main-color;
      cursor: pointer;
      transition: all 0.2s;

      &:active {
        transform: scale(0.95);
      }
    }

    &_copied {
      .courier-form__info-copy-icon {
        color: $green;
      }
    }
  }

  &__note {
    font-size: 16px;
    color: $text;
    text-align: center;
    margin: 20px 0;
    padding: 15px;
    background-color: rgba($purple, 0.1);
    border-radius: 8px;
    border-left: 4px solid $purple;
  }

  &__button {
    position: fixed;
    z-index: 2;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 50px;
    border-radius: 30px;
    background-color: $purple;
    color: $white;
    cursor: pointer;
    user-select: none;
    text-align: center;
    line-height: 50px;
    margin: 0 40px;
    padding: 0 25px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
    border: none;
    font-size: 16px;
    font-weight: 500;

    &:active {
      transform: scale(0.95);
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
</style>

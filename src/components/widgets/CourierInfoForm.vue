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
                <div class="courier-form__info-text">{{ order.address }}</div>
              </div>
            </div>

            <div class="courier-form__info-block">
              <div class="courier-form__info-title">Спосіб оплати</div>
              <div class="courier-form__info-box">
                <div class="courier-form__info-text">{{ optionsData[order.paymentMethod] }}</div>
              </div>
            </div>

            <div v-if="order.courierPhone" class="courier-form__info-block">
              <div class="courier-form__info-title">Контакт кур'єра</div>
              <div class="courier-form__info-box">
                <div class="courier-form__info-text">{{ order.courierPhone }}</div>
                <div class="courier-form__info-copy" @click="copyPhone" :class="{ 'courier-form__info-copy_copied': copied }">
                  <BaseSvg id="copy-icon" class="courier-form__info-copy-icon" />
                </div>
              </div>
            </div>

            <div class="courier-form__note">
              Середній час доставки становить 30-45 хвилин залежно від завантаженості та відстані. Статус замовлення оновлюється автоматично
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
import { useToast } from '@/composable/useToast'

interface Props {
  order: any
}

interface Emit {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isVisible = ref(false)
const copied = ref(false)

const optionsData: Record<string, string> = {
  cash: 'Готівка при отриманні',
  card: 'Картка',
  'card-postpayment': 'Картка після отримання',
}

// Значення за замовчуванням, якщо не передані через props

const { lockScroll, unlockScroll } = useScrollLock()
const toast = useToast()

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
    .writeText(props.order.courierPhone)
    .then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)

      // Показуємо тост про успішне копіювання
      toast.success('Номер телефону скопійовано')
    })
    .catch((err) => {
      console.error('Помилка при копіюванні номера телефону: ', err)
      toast.error('Не вдалося скопіювати номер телефону')
    })
}

console.log(props.order)

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
    background-color: rgba($main-color, 0.1);
    border-radius: 8px;
    border-left: 4px solid $main-color;
  }

  &__button {
    position: fixed;
    z-index: 2;
    bottom: 20px;
    height: 50px;
    border-radius: 30px;
    background-color: $main-color;
    color: $white;
    cursor: pointer;
    user-select: none;
    text-align: center;
    line-height: 50px;
    padding: 0 25px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
    border: none;
    font-size: 16px;
    font-weight: 500;
    width: calc(100% - 50px);
    max-width: 440px;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: 0 0;

    &:active {
      transform: scale(0.95) translateX(-50%);
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

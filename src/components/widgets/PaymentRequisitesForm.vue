<template>
  <Transition name="fade-slide">
    <div v-if="isVisible" class="payment-form">
      <div class="payment-form__main" @click.self="closeForm">
        <div class="payment-form__wrapper">
          <div class="payment-form__header">
            <div class="payment-form__back" @click="closeForm">
              <BaseSvg class="payment-form__back-icon" id="arrow-logo" />
            </div>
            <div class="payment-form__title">Оплата за реквізитами</div>
          </div>

          <div class="payment-form__content">
            <div class="payment-form__requisites">
              <div class="payment-form__requisites-title">Реквізити для оплати</div>
              <div class="payment-form__requisites-box">
                <div class="payment-form__requisites-text" ref="requisitesText">
                  <div class="payment-form__requisites-card">{{ cardNumber }}</div>
                  <div>{{ otherRequisites }}</div>
                </div>

                <div
                  class="payment-form__requisites-copy"
                  @click="copyCardNumber"
                  :class="{ 'payment-form__requisites-copy_copied': copied }"
                >
                  <BaseSvg id="copy-icon" class="payment-form__requisites-copy-icon" />
                </div>
              </div>
            </div>

            <div class="payment-form__screenshot">
              <div class="payment-form__screenshot-title">Скріншот оплати</div>
              <div class="payment-form__screenshot-note">
                Рекомендуємо прикріпити скріншот підтвердження оплати для швидшої обробки замовлення
              </div>

              <div
                class="payment-form__screenshot-upload"
                :class="{ 'payment-form__screenshot-upload_has-file': screenshotFile }"
                @click="triggerFileInput"
              >
                <input type="file" ref="fileInput" class="payment-form__screenshot-input" accept="image/*" @change="handleFileChange" />
                <div v-if="!screenshotFile" class="payment-form__screenshot-placeholder">
                  <div class="payment-form__screenshot-icon">+</div>
                  <div class="payment-form__screenshot-text">Натисніть, щоб завантажити скріншот</div>
                </div>
                <div v-else class="payment-form__screenshot-preview">
                  <img :src="screenshotPreview" alt="Скріншот оплати" class="payment-form__screenshot-image" />
                  <button class="payment-form__screenshot-remove" @click.stop="removeScreenshot">×</button>
                </div>
              </div>
            </div>

            <div class="payment-form__info">Після здійснення оплати натисніть кнопку "Підтвердити оплату" нижче</div>

            <button class="payment-form__button" @click="confirmPayment">
              <div class="payment-form__button-text">Підтвердити оплату</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollLock } from '@/composable/useScrollLock'
import BaseSvg from '@/components/base/BaseSvg.vue'

interface Props {
  orderId: number
}

interface Emit {
  (e: 'close'): void
  (e: 'confirm', data: { orderId: number; screenshot?: File }): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isVisible = ref(false)
const cardNumber = ref('5168 7520 1234 5678')
const otherRequisites = ref('Банк: ПриватБанк\nОтримувач: ТОВ "Телеграм Фуд"\nПризначення: Оплата замовлення')
const requisitesText = ref<HTMLElement | null>(null)
const copied = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const screenshotFile = ref<File | null>(null)
const screenshotPreview = ref('')

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

function copyCardNumber() {
  navigator.clipboard
    .writeText(cardNumber.value)
    .then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
    .catch((err) => {
      console.error('Помилка при копіюванні номера карти: ', err)
    })
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    screenshotFile.value = target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target) {
        screenshotPreview.value = e.target.result as string
      }
    }
    reader.readAsDataURL(screenshotFile.value)
  }
}

function removeScreenshot(event: Event) {
  event.stopPropagation()
  screenshotFile.value = null
  screenshotPreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

function confirmPayment() {
  emit('confirm', {
    orderId: props.orderId,
    screenshot: screenshotFile.value || undefined,
  })
  closeForm()
}

defineExpose({
  openForm,
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.payment-form {
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

  &__requisites {
    margin-bottom: 20px;

    &-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      color: $text;
    }

    &-box {
      background-color: $white;
      border-radius: 8px;
      padding: 15px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: relative;
    }

    &-text {
      font-size: 16px;
      line-height: 1.5;
      color: $text;
      white-space: pre-line;
      user-select: text;
    }

    &-card {
      font-weight: 600;
      margin-bottom: 5px;
      user-select: all;
      background-color: $background;
      // background-color: $main-color;
      border-radius: 5px;
      padding: 5px 10px;
    }

    &-copy {
      &-icon {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 24px;
        height: 24px;
        color: $main-color;
        cursor: pointer;
        transition: all 0.2s;

        &:active {
          transform: scale(0.95);
        }

        &_copied {
          color: $green;
        }
      }
    }
  }

  &__screenshot {
    margin-bottom: 20px;

    &-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
      color: $text;
    }

    &-note {
      font-size: 14px;
      color: $text;
      margin-bottom: 15px;
      opacity: 0.8;
    }

    &-upload {
      border: 2px dashed $beige;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: border-color 0.2s;
      position: relative;
      min-height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        border-color: $main-color;
      }

      &_has-file {
        border-style: solid;
        border-color: $main-color;
      }
    }

    &-input {
      display: none;
    }

    &-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    &-icon {
      font-size: 32px;
      color: $beige;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      border: 2px dashed $beige;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-text {
      font-size: 16px;
      color: $text;
      opacity: 0.7;
    }

    &-preview {
      width: 100%;
      height: 100%;
      position: relative;
    }

    &-image {
      max-height: 300px;
      object-fit: contain;
      border-radius: 6px;
    }

    &-remove {
      position: absolute;
      top: -10px;
      right: -10px;
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background-color: $red;
      color: $white;
      border: none;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s;

      &:active {
        transform: scale(0.95);
      }
    }
  }

  &__info {
    font-size: 16px;
    color: $text;
    text-align: center;
    margin: 20px 0;
    padding: 15px;
    background-color: rgba($yellow, 0.2);
    border-radius: 8px;
    border-left: 4px solid $yellow;
  }

  &__button {
    position: fixed;
    z-index: 2;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 50px;
    border-radius: 30px;
    background-color: $green;
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

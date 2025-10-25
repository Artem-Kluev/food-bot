<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useScrollLock } from '@/composable/useScrollLock'
import BaseSvg from '@/components/base/BaseSvg.vue'
import { supabase } from '@/plugins/supabase'
import { orderData } from '@/composable/useOrderSupabase'
import heic2any from 'heic2any'

interface Props {
  orderId: number
  resto: any
}

interface Emit {
  (e: 'close'): void
  (e: 'confirm'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isVisible = ref(false)
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

import { useToast } from '@/composable/useToast'

const toast = useToast()

function copyCardNumber() {
  navigator.clipboard
    .writeText(props.resto.cardPaymentInfo)
    .then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)

      // Показуємо тост про успішне копіювання
      toast.success('Номер карти скопійовано')
    })
    .catch((err) => {
      console.error('Помилка при копіюванні номера карти: ', err)
      toast.error('Не вдалося скопіювати номер карти')
    })
}

async function sendImage(file: File | null) {
  if (!file) return null

  // Функція для безпечного імені файлу
  function sanitizeFileName(name: string) {
    return name
      .replace(/\s+/g, '_') // пробіли → підкреслення
      .replace(/[^a-zA-Z0-9_.-]/g, '') // тільки латиниця, цифри, _, -, .
  }

  const today = new Date().toISOString().slice(0, 10)
  const safeName = sanitizeFileName(file.name)
  const filePath = `${today}/${safeName}`

  const { data, error } = await supabase.storage.from('screen').upload(filePath, file, {
    upsert: true,
  })

  if (error) {
    console.error('❌ Помилка при завантаженні:', error)
    return null
  }

  // Отримуємо публічний URL
  const { data: publicUrlData } = supabase.storage.from('screen').getPublicUrl(filePath)
  const publicUrl = publicUrlData.publicUrl

  console.log('✅ Файл збережено:', publicUrl)
  return publicUrl
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (target.files && target.files.length > 0) {
    const file = target.files[0]

    if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
      try {
        const convertedBlob = (await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8,
        })) as Blob

        const convertedFile = new File([convertedBlob], file.name.replace(/\.heic$/i, '.jpg'), {
          type: 'image/jpeg',
        })

        screenshotFile.value = convertedFile
      } catch (error) {
        console.error('Помилка конвертації HEIC:', error)
        screenshotFile.value = file
      }
    } else {
      screenshotFile.value = file
    }

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

async function confirmPayment() {
  const imageUrl = await sendImage(screenshotFile.value)

  if (imageUrl) {
    await orderData(null, {
      id: props.orderId,
      data: {
        status: 'paid',
        payScreenshot: imageUrl,
      },
    })

    // Показуємо тост про успішну оплату
    toast.success('Оплату підтверджено! Дякуємо за замовлення')
  } else {
    // Показуємо тост про помилку, якщо не вдалося завантажити зображення
    toast.error('Не вдалося завантажити скріншот. Спробуйте ще раз')
    return
  }

  emit('confirm')

  closeForm()
}

defineExpose({
  openForm,
})
</script>

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
                  <div class="payment-form__requisites-card">{{ resto.cardPaymentInfo }}</div>

                  <div v-if="resto.cardPaymentInfoDescription" class="payment-form__requisites-other">
                    <div>Дані для оплати:</div>

                    {{ resto.cardPaymentInfoDescription }}
                  </div>
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
                Будь ласка, прикріпіть скріншот підтвердження оплати — це необхідно для обробки вашого замовлення
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

            <button class="payment-form__button" :class="{ 'payment-form__button_disabled': !screenshotFile }" @click="confirmPayment">
              <div class="payment-form__button-text">Підтвердити оплату</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

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
      user-select: all;
      background-color: $background;
      // background-color: $main-color;
      border-radius: 5px;
      padding: 5px 10px;
    }

    &-other {
      margin-top: 15px;
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
    background-color: rgba($main-color, 0.2);
    border-radius: 8px;
    border-left: 4px solid $main-color;
  }

  &__button {
    position: fixed;
    user-select: none;
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

    &_disabled {
      background-color: $gray;
      cursor: not-allowed;
      pointer-events: none;
    }

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

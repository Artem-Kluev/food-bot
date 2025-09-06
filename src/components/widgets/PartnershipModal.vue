<template>
  <Transition name="fade-slide">
    <div v-if="isVisible" class="partner-modal">
      <div class="partner-modal__main" @click.self="closeModal">
        <div class="partner-modal__wrapper">
          <div class="partner-modal__header">
            <div class="partner-modal__back" @click="closeModal">
              <BaseSvg class="partner-modal__back-icon" id="arrow-logo" />
            </div>
            <div class="partner-modal__title">Стати партнером</div>
          </div>

          <div class="partner-modal__content">
            <div class="partner-modal__section">
              <div class="partner-modal__section-title">Приєднуйтесь до нашої мережі ресторанів</div>
              <div class="partner-modal__section-text">
                Ми запрошуємо ресторани та заклади харчування стати нашими партнерами. Співпраця з нами дозволить вам розширити клієнтську
                базу та збільшити обсяг продажів завдяки зручній системі доставки.
              </div>
            </div>

            <div class="partner-modal__section">
              <div class="partner-modal__section-title">Переваги співпраці</div>
              <div class="partner-modal__section-text">
                • Збільшення кількості замовлень та прибутку <br />
                • Доступ до нових клієнтів <br />
                • Зручна система управління замовленнями <br />
                • Аналітика та звітність
              </div>
            </div>

            <div class="partner-modal__section">
              <div class="partner-modal__section-title">Як це працює</div>
              <div class="partner-modal__section-text">
                1. Ви заповнюєте форму заявки <br />
                2. Ми зв'язуємось з вами та обговорюємо деталі співпраці <br />
                3. Ми інтегруємо ваше меню в нашу систему <br />
                4. Ви починаєте отримувати замовлення через нашу платформу
              </div>
            </div>

            <Form @submit="submitForm" :validation-schema="validationSchema" v-slot="{ handleSubmit }">
              <div class="partner-modal__form">
                <div class="partner-modal__form-title">Залиште свої контактні дані</div>

                <div class="partner-modal__field">
                  <Field name="name" v-slot="{ field, errorMessage }">
                    <UiInput
                      v-model="formData.name"
                      type="text"
                      label="Назва закладу"
                      placeholder="Введіть назву закладу"
                      :error="errorMessage"
                      v-bind="field"
                    />
                  </Field>
                </div>

                <div class="partner-modal__field">
                  <Field name="contact" v-slot="{ field, errorMessage }">
                    <UiInput
                      v-model="formData.contact"
                      type="text"
                      label="Контактна особа"
                      placeholder="Введіть ім'я контактної особи"
                      :error="errorMessage"
                      v-bind="field"
                    />
                  </Field>
                </div>

                <div class="partner-modal__field">
                  <Field name="phone" v-slot="{ field, errorMessage }">
                    <UiInput
                      v-model="formData.phone"
                      type="tel"
                      label="Номер телефону"
                      placeholder="+380XXXXXXXXX"
                      :error="errorMessage"
                      v-bind="field"
                    />
                  </Field>
                </div>

                <div class="partner-modal__field">
                  <Field name="email" v-slot="{ field, errorMessage }">
                    <UiInput
                      v-model="formData.email"
                      type="email"
                      label="Email"
                      placeholder="Введіть email"
                      :error="errorMessage"
                      v-bind="field"
                    />
                  </Field>
                </div>

                <div class="partner-modal__field">
                  <Field name="message" v-slot="{ field, errorMessage }">
                    <div class="partner-modal__textarea-wrapper">
                      <label v-if="true" class="partner-modal__label">Повідомлення</label>
                      <textarea
                        v-model="formData.message"
                        placeholder="Введіть повідомлення"
                        class="partner-modal__textarea"
                        :class="{ 'partner-modal__textarea_error': errorMessage }"
                      ></textarea>
                      <span v-if="errorMessage" class="partner-modal__error">{{ errorMessage }}</span>
                    </div>
                  </Field>
                </div>
              </div>

              <button type="submit" class="partner-modal__button" @click="handleSubmit">
                <div class="partner-modal__button-text">Надіслати заявку</div>
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useScrollLock } from '@/composable/useScrollLock'
import BaseSvg from '@/components/base/BaseSvg.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

interface Emit {
  (e: 'close'): void
}

const emit = defineEmits<Emit>()

const isVisible = ref(false)
const formSubmitted = ref(false)
const { lockScroll, unlockScroll } = useScrollLock()

interface PartnerFormData {
  name: string
  contact: string
  phone: string
  email: string
  message: string
}

const formData = reactive<PartnerFormData>({
  name: '',
  contact: '',
  phone: '',
  email: '',
  message: '',
})

// Схема валідації для форми партнерства
const validationSchema = yup.object({
  name: yup.string().required("Назва закладу обов'язкова").min(3, 'Назва повинна містити мінімум 3 символи'),
  contact: yup.string().required("Ім'я контактної особи обов'язкове").min(2, "Ім'я повинно містити мінімум 2 символи"),
  phone: yup
    .string()
    .required("Номер телефону обов'язковий")
    .matches(/^(\+380|380|0)\d{9}$/, 'Введіть коректний номер телефону у форматі +380XXXXXXXXX, 380XXXXXXXXX або 0XXXXXXXXX'),
  email: yup.string().email('Введіть коректний email'),
  message: yup.string(),
})

// Блокування прокрутки при відкритті форми
watch(isVisible, (newValue) => {
  if (newValue) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

function openModal() {
  isVisible.value = true
  lockScroll()
}

function closeModal() {
  isVisible.value = false
  unlockScroll()
  emit('close')
}

function submitForm(values: any) {
  // Перевірка валідності форми перед відправкою
  if (!values.name || !values.contact || !values.phone) {
    return
  }

  // Оновлюємо дані форми
  formData.name = values.name
  formData.contact = values.contact
  formData.phone = values.phone
  formData.email = values.email || ''
  formData.message = values.message || ''

  console.log('Форма відправлена:', formData)

  // Імітація відправки форми
  setTimeout(() => {
    formSubmitted.value = true
    // Очищення форми
    formData.name = ''
    formData.contact = ''
    formData.phone = ''
    formData.email = ''
    formData.message = ''

    // Закриття модального вікна після відправки
    closeModal()

    // Можна додати сповіщення про успішну відправку
    alert("Дякуємо за заявку! Ми зв'яжемося з вами найближчим часом.")
  }, 1000)
}

defineExpose({
  openModal,
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.partner-modal {
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

  &__section {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    color: $text;
  }

  &__section-text {
    font-size: 16px;
    line-height: 1.5;
    color: $text;
    white-space: pre-line;
    user-select: text;
  }

  &__form {
    margin-bottom: 20px;
  }

  &__form-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
    color: $text;
  }

  &__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
  }

  &__label {
    font-size: 16px;
    font-weight: 500;
    color: $text;
  }

  &__textarea-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  &__textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid $beige;
    border-radius: 8px;
    font-size: 16px;
    color: $text;
    background-color: $white;
    transition: border-color 0.2s;
    min-height: 100px;
    resize: vertical;

    &:focus {
      outline: none;
      border-color: $main-color;
    }

    &::placeholder {
      color: rgba($text, 0.5);
    }

    &_error {
      border-color: $red;

      &:focus {
        border-color: $red;
      }
    }
  }

  &__error {
    font-size: 14px;
    color: $red;
    margin-top: -4px;
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

    &-text {
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
  transform: scale(0.9);
}
</style>

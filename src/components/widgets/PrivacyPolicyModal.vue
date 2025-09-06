<template>
  <Transition name="fade-slide">
    <div v-if="isVisible" class="privacy-modal">
      <div class="privacy-modal__main" @click.self="closeModal">
        <div class="privacy-modal__wrapper">
          <div class="privacy-modal__header">
            <div class="privacy-modal__back" @click="closeModal">
              <BaseSvg class="privacy-modal__back-icon" id="arrow-logo" />
            </div>
            <div class="privacy-modal__title">Політика конфіденційності</div>
          </div>

          <div class="privacy-modal__content">
            <div class="privacy-modal__section">
              <div class="privacy-modal__section-title">1. Загальні положення</div>
              <div class="privacy-modal__section-text">
                Ця Політика конфіденційності визначає порядок обробки та захисту інформації про фізичних осіб, яка може бути отримана при
                використанні сервісу доставки їжі. Ми поважаємо ваше право на конфіденційність і зобов'язуємося захищати ваші персональні
                дані.
              </div>
            </div>

            <div class="privacy-modal__section">
              <div class="privacy-modal__section-title">2. Збір інформації</div>
              <div class="privacy-modal__section-text">
                Ми збираємо інформацію, яку ви надаєте нам при реєстрації, оформленні замовлення або спілкуванні з нашою службою підтримки.
                Ця інформація може включати ваше ім'я, адресу електронної пошти, номер телефону, адресу доставки та платіжні дані.
              </div>
            </div>

            <div class="privacy-modal__section">
              <div class="privacy-modal__section-title">3. Використання інформації</div>
              <div class="privacy-modal__section-text">
                Ми використовуємо зібрану інформацію для обробки ваших замовлень, надання послуг доставки, покращення якості обслуговування,
                відправки повідомлень про статус замовлення та маркетингових матеріалів (якщо ви дали згоду на їх отримання).
              </div>
            </div>

            <div class="privacy-modal__section">
              <div class="privacy-modal__section-title">4. Захист інформації</div>
              <div class="privacy-modal__section-text">
                Ми вживаємо всіх необхідних заходів для захисту вашої особистої інформації від несанкціонованого доступу, зміни, розкриття
                або знищення. Ми використовуємо сучасні технології шифрування для захисту ваших даних під час передачі та зберігання.
              </div>
            </div>

            <div class="privacy-modal__section">
              <div class="privacy-modal__section-title">5. Розкриття інформації третім особам</div>
              <div class="privacy-modal__section-text">
                Ми не продаємо, не обмінюємо і не передаємо ваші персональні дані третім особам без вашої згоди. Виняток становлять
                партнери, які допомагають нам у наданні послуг (наприклад, служби доставки), і випадки, передбачені законодавством.
              </div>
            </div>

            <button class="privacy-modal__button" @click="closeModal">
              <div class="privacy-modal__button-text">Закрити</div>
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

interface Emit {
  (e: 'close'): void
}

const emit = defineEmits<Emit>()

const isVisible = ref(false)
const { lockScroll, unlockScroll } = useScrollLock()

function openModal() {
  isVisible.value = true
  lockScroll()
}

function closeModal() {
  isVisible.value = false
  unlockScroll()
  emit('close')
}

defineExpose({
  openModal,
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.privacy-modal {
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

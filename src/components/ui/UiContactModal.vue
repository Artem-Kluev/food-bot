<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="ui-contact-modal" @click.self="closeModal">
        <div class="ui-contact-modal__content">
          <div class="ui-contact-modal__header">
            <div class="ui-contact-modal__title">{{ title }}</div>
            <button class="ui-contact-modal__close" @click="closeModal">
              <BaseSvg class="ui-contact-modal__close-icon" id="close-icon" />
            </button>
          </div>

          <div class="ui-contact-modal__contact-row">
            <div class="ui-contact-modal__contact">{{ contact }}</div>
            <button class="ui-contact-modal__copy-btn" @click="copyToClipboard">
              <BaseSvg class="ui-contact-modal__copy-icon" id="copy-icon" />
            </button>
          </div>

          <div class="ui-contact-modal__buttons">
            <a v-if="actionLink" :href="actionLink" class="ui-contact-modal__button ui-contact-modal__button_action">
              {{ actionText }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollLock } from '@/composable/useScrollLock'
import { useToast } from '@/composable/useToast'
import BaseSvg from '@/components/base/BaseSvg.vue'

interface Props {
  title: string
  contact: string
  actionText: string
  actionLink?: string
}

const props = defineProps<Props>()

const isVisible = ref(false)
const { lockScroll, unlockScroll } = useScrollLock()
const { success } = useToast()

function openModal() {
  isVisible.value = true
  lockScroll()
}

function closeModal() {
  isVisible.value = false
  unlockScroll()
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(props.contact)
    success('Скопійовано в буфер обміну')
  } catch (err) {
    console.error('Помилка копіювання:', err)
  }
}

defineExpose({
  openModal,
  closeModal,
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-contact-modal {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 20px 0;

  &__content {
    background-color: $background;
    border-radius: 20px;
    padding: 20px;
    width: 80%;
    max-width: 320px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    color: $main-color;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: $beige;
    }

    &:active {
      transform: scale(0.95);
    }

    &-icon {
      width: 20px;
      height: 20px;
      color: $text;
    }
  }

  &__contact-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 25px;
    background-color: rgba($main-color, 0.1);
    padding: 5px 10px;
    border-radius: 10px;
  }

  &__contact {
    flex: 1;
    font-size: 18px;
    color: $text;
    font-weight: 500;
    word-break: break-all;
  }

  &__copy-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background-color 0.2s,
      transform 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  &__copy-icon {
    width: 20px;
    height: 20px;
    color: $text;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__button {
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      transform: scale(0.95);
    }

    &_action {
      background-color: $main-color;
      text-shadow: $main-text-shadow;
      color: $white;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

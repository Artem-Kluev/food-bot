<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isVisible" class="ui-confirm-modal" @click.self="closeModal">
        <div class="ui-confirm-modal__content">
          <div class="ui-confirm-modal__title" v-if="title">{{ title }}</div>
          <div class="ui-confirm-modal__text">{{ text }}</div>
          <div class="ui-confirm-modal__buttons">
            <button 
              class="ui-confirm-modal__button ui-confirm-modal__button_cancel" 
              @click="handleButtonClick(false)"
            >
              {{ cancelText }}
            </button>
            <button 
              class="ui-confirm-modal__button ui-confirm-modal__button_confirm" 
              @click="handleButtonClick(true)"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useScrollLock } from '@/composable/useScrollLock'
// Teleport є вбудованим компонентом Vue, тому його не потрібно імпортувати

interface Props {
  title?: string
  text: string
  confirmText: string
  cancelText: string
}

interface Emit {
  (e: 'confirm', value: boolean): void
}

const props = defineProps<Props>()
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
}

// Додаємо watch для обробки випадку, коли компонент знищується, але модальне вікно відкрите
watch(isVisible, (newValue) => {
  if (newValue) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

// Розблоковуємо прокрутку при знищенні компонента
onUnmounted(() => {
  if (isVisible.value) {
    unlockScroll()
  }
})

function handleButtonClick(value: boolean) {
  emit('confirm', value)
  closeModal()
}

defineExpose({
  openModal,
  closeModal
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-confirm-modal {
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
  
  &__title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
    text-align: center;
    color: $main-color;
  }
  
  &__text {
    font-size: 18px;
    margin-bottom: 20px;
    text-align: center;
    color: $text;
  }
  
  &__buttons {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  
  &__button {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s;
    
    &:active {
      transform: scale(0.95);
    }
    
    &_cancel {
      background-color: $beige;
      color: $text;
    }
    
    &_confirm {
      background-color: $main-color;
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
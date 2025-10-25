<template>
  <Teleport to="body">
    <Transition name="toast-fade">
      <div v-if="isVisible" class="ui-toast" :class="`ui-toast_${type}`">
        <div class="ui-toast__content">
          {{ message }}
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  message: string
  type?: 'success' | 'error' | 'info'
  icon?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  duration: 3000,
})

const isVisible = ref(false)

function show() {
  isVisible.value = true

  setTimeout(() => {
    hide()
  }, props.duration)
}

function hide() {
  isVisible.value = false
}

onMounted(() => {
  show()
})

defineExpose({
  show,
  hide,
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-toast {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  min-width: 200px;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);

  &__content {
    gap: 10px;
    padding: 5px 16px;
    text-align: center;
  }

  &__icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  &__message {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.3;
  }

  &_success {
    background-color: rgba($green, 0.95);
    color: $white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    .ui-toast__icon {
      color: $white;
    }
  }

  &_error {
    background-color: rgba($red, 0.95);
    color: $white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    .ui-toast__icon {
      color: $white;
    }
  }

  &_info {
    background-color: rgba($blue, 0.95);
    color: $white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

    .ui-toast__icon {
      color: $white;
    }
  }
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.toast-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

<template>
  <div class="ui-slider">
    <label v-if="label" class="ui-slider__label">
      <span>{{ label }}</span>

      <span>{{ modelValue }} ₴</span>
    </label>
    <div class="ui-slider__container">
      <div class="ui-slider__track" @mousedown="startDrag" @touchstart="startDrag">
        <div class="ui-slider__progress" :style="{ width: `${percentage}%` }"></div>
        <div class="ui-slider__thumb" :style="{ left: `${percentage}%` }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref, onMounted, onUnmounted } from 'vue'

interface Props {
  modelValue: number
  maxValue: number
  label?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const isDragging = ref(false)
const trackRef = ref<HTMLElement | null>(null)

// Обчислюємо відсоток заповнення слайдера
const percentage = computed(() => {
  return (props.modelValue / props.maxValue) * 100
})

// Починаємо перетягування
function startDrag(event: MouseEvent | TouchEvent) {
  event.preventDefault()
  isDragging.value = true

  // Додаємо слухачі подій для перетягування та завершення
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('touchmove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchend', stopDrag)

  // Одразу оновлюємо позицію при кліку
  onDrag(event)
}

// Обробляємо перетягування
function onDrag(event: MouseEvent | TouchEvent) {
  if (!isDragging.value || !trackRef.value) return

  const track = trackRef.value
  const trackRect = track.getBoundingClientRect()

  // Отримуємо позицію кліку або дотику
  let clientX: number
  if ('touches' in event) {
    clientX = event.touches[0].clientX
  } else {
    clientX = event.clientX
  }

  // Обчислюємо відносну позицію в межах треку
  const position = clientX - trackRect.left
  const percentage = Math.max(0, Math.min(100, (position / trackRect.width) * 100))

  // Обчислюємо нове значення та емітимо його
  const newValue = Math.round((percentage / 100) * props.maxValue)
  emit('update:modelValue', newValue)
}

// Завершуємо перетягування
function stopDrag() {
  isDragging.value = false

  // Видаляємо слухачі подій
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
}

// Встановлюємо посилання на трек при монтуванні компонента
onMounted(() => {
  trackRef.value = document.querySelector('.ui-slider__track')
})

// Видаляємо слухачі подій при розмонтуванні компонента
onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.ui-slider {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin: 15px 0 16px;

  &__label {
    font-size: 16px;
    font-weight: 500;
    color: $text;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
  }

  &__container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 7px 15px 10px;
  }

  &__track {
    position: relative;
    width: 100%;
    height: 8px;
    background-color: $text;
    border-radius: 4px;
    cursor: pointer;
  }

  &__progress {
    position: absolute;
    height: 100%;
    background-color: $main-color;
    border-radius: 4px;
    top: 0;
    left: 0;
  }

  &__thumb {
    position: absolute;
    width: 24px;
    height: 24px;
    background-color: $main-color;
    border-radius: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: grab;
    transition: background-color 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:active {
      cursor: grabbing;
    }
  }
}
</style>

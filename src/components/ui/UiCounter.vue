<template>
  <div class="ui-counter" :class="{ 'ui-counter_active': isActive, 'ui-counter_big': modifier === 'big' }">
    <button v-if="!isActive" class="ui-counter__button" @click="activate">В корзину</button>
    <template v-else>
      <button class="ui-counter__control ui-counter__minus" @click="decrease" :disabled="modelValue <= 0">
        <span class="ui-counter__icon">-</span>
      </button>
      <span class="ui-counter__value">{{ modelValue }}</span>
      <button class="ui-counter__control ui-counter__plus" @click="increase" :disabled="modelValue >= 100">
        <span class="ui-counter__icon">+</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
  modelValue: number
  modifier?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  modifier: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const isActive = ref(props.modelValue > 0)

watch(
  () => props.modelValue,
  (newValue) => {
    isActive.value = newValue > 0
  },
)

function activate() {
  isActive.value = true
  emit('update:modelValue', 1)
}

function increase() {
  if (props.modelValue < 100) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

function decrease() {
  if (props.modelValue > 0) {
    emit('update:modelValue', props.modelValue - 1)

    if (props.modelValue === 1) {
      isActive.value = false
    }
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.ui-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 20px;
  background-color: $main-color;
  color: $white;
  transition: all 0.2s ease;
  overflow: hidden;
  width: 100px;

  &__button {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    color: $white;
    font-weight: 500;
    cursor: pointer;
    padding: 0 5px;
  }

  &__control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100%;
    border: none;
    background: transparent;
    color: $white;
    cursor: pointer;
    padding: 0;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__icon {
    font-size: 20px;
    line-height: 1;
  }

  &__value {
    flex: 1;
    text-align: center;
    font-weight: 500;
  }

  &_active {
    background-color: $text;
  }

  &_big {
    width: 100%;
  }
}
</style>

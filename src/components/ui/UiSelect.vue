<template>
  <div class="ui-select">
    <label v-if="label" class="ui-select__label">{{ label }}</label>
    <div class="ui-select__field" :class="{ 'ui-select__field_open': isOpen }" @click="toggleDropdown">
      <div class="ui-select__selected">{{ selectedLabel }}</div>
      <div class="ui-select__arrow"></div>
    </div>
    <div v-if="isOpen" class="ui-select__dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        class="ui-select__option"
        :class="{ 'ui-select__option_selected': option.value === modelValue }"
        @click="selectOption(option.value)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: string
  options: Option[]
  label?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const selected = props.options.find((option) => option.value === props.modelValue)
  return selected ? selected.label : ''
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(value: string) {
  emit('update:modelValue', value)
  isOpen.value = false
}

function closeDropdown(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.ui-select')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.ui-select {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  position: relative;

  &__label {
    font-size: 16px;
    font-weight: 500;
    color: $text;
  }

  &__field {
    padding: 12px;
    border: 1px solid $beige;
    border-radius: 8px;
    font-size: 16px;
    background-color: $white;
    color: $text;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
    transition: border-color 0.2s ease;

    &_open {
      border-color: $main-color;
    }

    &:active {
      border-color: $main-color;
    }
  }

  &__selected {
    flex: 1;
  }

  &__arrow {
    width: 16px;
    height: 16px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230a0b08' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.2s ease;
    transform: rotate(0deg);

    .ui-select__field_open & {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background-color: $white;
    border: 1px solid $beige;
    border-radius: 8px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &__option {
    padding: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba($main-color, 0.1);
    }

    &_selected {
      background-color: $main-color;
      text-shadow: $main-text-shadow;
      color: $background;

      &:hover {
        background-color: $main-color;
      }
    }
  }
}
</style>

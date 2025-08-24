<template>
  <div class="ui-input">
    <label v-if="label" class="ui-input__label">{{ label }}</label>
    <input
      :value="modelValue"
      :type="type"
      class="ui-input__field"
      :placeholder="placeholder"
      @input="updateValue"
      :class="{ 'ui-input__field_error': error }"
    />
    <span v-if="error" class="ui-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.ui-input {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

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

    &:focus {
      outline: none;
      border-color: $main-color;
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
}
</style>

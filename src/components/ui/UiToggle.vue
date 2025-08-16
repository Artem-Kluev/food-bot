<template>
  <label class="toggle">
    <input
      v-model="modelValue"
      type="checkbox"
      class="toggle__input"
      @change="updateValue"
    />
    <span class="toggle__slider"></span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

function updateValue() {
  emit('update:modelValue', modelValue.value);
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/vars.scss';

.toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 30px;
  cursor: pointer;

  &__input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .toggle__slider:before {
      transform: translateX(20px);
      background-color: $main-color;
    }
  }

  &__slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $text;
    transition: 0.3s;
    border-radius: 30px;

    &:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 2px;
      bottom: 2px;
      background-color: $white;
      transition: 0.3s;
      border-radius: 50%;
    }
  }
}
</style>
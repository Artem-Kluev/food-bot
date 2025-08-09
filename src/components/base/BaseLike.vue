<template>
  <button class="base-like" :class="{ 'base-like_active': modelValue }" @click="toggleLike">
    <BaseSvg class="base-like__icon" :id="modelValue ? 'like-logo' : 'like-outline-logo'" />
  </button>
</template>

<script setup lang="ts">
import BaseSvg from './BaseSvg.vue'

interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function toggleLike() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.base-like {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: $background;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0;

  &__icon {
    color: $main-color;

    transition: all 0.2s ease;
    width: 24px;
    height: 24px;
  }

  &_active {
    background-color: $background;

    .base-like__icon {
      color: $main-color;
      opacity: 1;
    }
  }

  &:hover {
    transform: scale(1.05);

    .base-like__icon {
      opacity: 0.8;
    }

    &.base-like_active .base-like__icon {
      opacity: 1;
    }
  }
}
</style>

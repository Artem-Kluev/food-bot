<template>
  <button
    class="ui-like"
    :class="{ 'ui-like_active': modelValue, ['ui-like_' + modifier]: modifier === 'resto' }"
    @click.stop="toggleLike"
  >
    <BaseSvg class="ui-like__icon" :id="modelValue ? 'like-logo' : 'like-outline-logo'" />
  </button>
</template>

<script setup lang="ts">
import BaseSvg from '@/components/base/BaseSvg.vue'

interface Props {
  modelValue: boolean
  modifier?: 'resto'
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

.ui-like {
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

    .ui-like__icon {
      color: $main-color;
      opacity: 1;
    }
  }

  &:hover {
    transform: scale(1.05);

    .ui-like__icon {
      opacity: 0.8;
    }

    &.ui-like_active .ui-like__icon {
      opacity: 1;
    }
  }

  &_resto {
    box-shadow: unset;

    .ui-like {
      &__icon {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>

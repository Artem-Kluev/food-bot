<script setup lang="ts">
import BaseSvg from '@/components/base/BaseSvg.vue'

interface Props {
  time: number
}

defineProps<Props>()
</script>

<template>
  <div class="ui-time">
    <div class="ui-time__icon">
      <BaseSvg id="time-logo" />
    </div>
    <div class="ui-time__value">{{ time }} min</div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-time {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: $background;
  padding: 2px 5px;
  border-radius: 4px;
  z-index: 1;

  &__icon {
    width: 16px;
    height: 16px;
    color: $text;
  }

  &__value {
    font-size: 14px;
    font-weight: 500;
    color: $text;
  }
}
</style>

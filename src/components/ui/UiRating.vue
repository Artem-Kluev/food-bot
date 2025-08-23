<script setup lang="ts">
import BaseSvg from '@/components/base/BaseSvg.vue'
import { computed } from 'vue'

interface Props {
  rating: number
}

defineProps<Props>()
</script>

<template>
  <div class="ui-rating">
    <div class="ui-rating__value">{{ rating.toFixed(1) }}</div>
    <div class="ui-rating__icon">
      <BaseSvg id="star-logo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: $background;
  padding: 2px 5px;
  border-radius: 4px;
  z-index: 1;

  &__icon {
    width: 20px;
    height: 20px;
    color: $yellow;
  }

  &__value {
    font-size: 14px;
    font-weight: 500;
    color: $text;
  }
}
</style>

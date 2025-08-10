<script setup lang="ts">
interface Props {
  price: {
    base: number
    old?: number
  }
}

defineProps<Props>()
</script>

<template>
  <div class="ui-price">
    <div class="ui-price__value">
      <span :class="{ 'ui-price__value-current': price.old, 'ui-price__value-base': !price.old }"
        >{{ price.base }} ₴</span
      >
      <span v-if="price.old" class="ui-price__value-old">{{ price.old }} ₴</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-price {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: $background;
  padding: 2px 5px;
  border-radius: 4px;
  z-index: 1;

  &__value {
    display: flex;

    gap: 4px;
    font-size: 14px;
    font-weight: 500;

    &-base {
      color: $text;
      font-weight: 700;
    }

    &-old {
      color: $text;
      text-decoration: line-through;
      font-size: 12px;
    }

    &-current {
      color: $red;
      font-weight: 700;
    }
  }
}
</style>

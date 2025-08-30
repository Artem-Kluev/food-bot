<template>
  <div class="ui-tabs">
    <div class="ui-tabs__container">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="ui-tabs__tab"
        :class="{ 'ui-tabs__tab_active': modelValue === index }"
        @click="$emit('update:modelValue', index)"
      >
        {{ tab }}
      </div>
      <div
        class="ui-tabs__indicator"
        :style="{
          transform: `translateX(${100 * modelValue}%)`,
          width: `${100 / tabs.length}%`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  tabs: string[]
  modelValue: number
}

defineProps<Props>()
defineEmits(['update:modelValue'])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-tabs {
  width: 100%;
  overflow: hidden;
  padding: 0 10px;

  &__container {
    display: flex;
    position: relative;
    width: 100%;
    background-color: $text;
    border-radius: 10px;
    border: 3px solid $text;
  }

  &__tab {
    flex: 1;
    text-align: center;
    padding: 5px 0;
    font-weight: 500;
    font-size: 16px;
    color: $white;
    position: relative;
    z-index: 1;
    transition: color 0.3s ease;

    &_active {
    }
  }

  &__indicator {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    background-color: $main-color;
    text-shadow: $main-text-shadow;
    border-radius: 8px;
    transition: transform 0.3s ease;
    z-index: 0;
  }
}
</style>

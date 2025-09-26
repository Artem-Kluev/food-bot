<script lang="ts" setup>
import { ref } from 'vue'

interface Props {
  tags: Array<any>
  title?: string
  radio?: boolean
}

defineProps<Props>()
const emit = defineEmits(['selected'])
</script>

<template>
  <div class="tag-slider">
    <div v-if="title" class="tag-slider__title">{{ title }}</div>

    <div class="tag-slider__container">
      <div v-for="tag in tags" :key="tag" class="tag-slider__item">#{{ tag }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.tag-slider {
  width: 100%;

  &__container {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  &__item {
    height: 100%;
    border-radius: 7px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    // border: 1px solid $text;
    // background-color: rgba($main-color, 0.05);
    padding: 2px 5px;
    margin-right: 5px;
    margin-bottom: 5px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    width: fit-content;
    font-size: 14px;
    color: $main-color;
  }
}
</style>

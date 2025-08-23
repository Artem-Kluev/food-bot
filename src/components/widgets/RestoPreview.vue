<template>
  <div class="resto-preview">
    <div class="resto-preview__image">
      <img class="resto-preview__img" :src="image" alt="Restaurant" />
    </div>

    <div class="resto-preview__content">
      <div class="resto-preview__title">{{ title }}</div>

      <div class="resto-preview__description">{{ description }}</div>

      <UiRating v-if="rating" :rating="rating" />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiRating from '@/components/ui/UiRating.vue'

interface Props {
  title: string
  description: string
  image: string
  rating: number
}

defineProps<Props>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.resto-preview {
  display: flex;
  align-items: center;
  background-color: $background;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 15px 10px;
  border-radius: 10px;

  &__image {
    overflow: hidden;
    flex-basis: 30%;
    padding: 10px;
    flex: 0 0 30%;
    align-self: center;
  }

  &__img {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    object-fit: cover;
  }

  &__content {
    padding: 12px;
    flex-basis: 70%;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    margin: 5px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 40px;
  }
}
</style>

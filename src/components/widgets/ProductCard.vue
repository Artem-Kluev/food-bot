<template>
  <div class="product">
    <div class="product__like">
      <UiLike v-model="isLiked" />
    </div>

    <div class="product__image">
      <picture>
        <source :srcset="slideData.image.webP" type="image/webp" />
        <img :src="slideData.image.base" alt="product image" />
      </picture>

      <UiRating v-if="slideData.rating" :rating="slideData.rating" class="product__rating" />
      <UiTime
        v-if="slideData.type === 'resto' && slideData.time"
        :time="slideData.time"
        class="product__time"
      />
      <UiPrice
        v-if="slideData.type === 'food' && slideData.price"
        :price="slideData.price"
        class="product__price"
      />
    </div>
    <div class="product__info">
      <h3 class="product__name">{{ slideData.title }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/mixins/interfaces'
import UiLike from '@/components/ui/UiLike.vue'
import UiRating from '@/components/ui/UiRating.vue'
import UiTime from '@/components/ui/UiTime.vue'
import UiPrice from '@/components/ui/UiPrice.vue'
import { ref } from 'vue'

interface Props {
  slideData: Slide
}

defineProps<Props>()

const isLiked = ref(false)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.product {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
  margin-bottom: 30px;

  &__like {
    position: absolute;
    top: 8px;
    right: 18px;
    z-index: 1;
  }

  &__tag {
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 10px;
    width: fit-content;
    margin-bottom: 5px;
    font-weight: 500;
  }

  &__image {
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__rating {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  &__time {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  &__price {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  &__tags {
    position: absolute;
    padding: 10px 5px;
    top: 0;
    z-index: 1;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
  }

  &__name {
    font-size: 16px;
    font-weight: 500;
    height: 24px;
    color: $text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

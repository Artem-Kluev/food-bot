<template>
  <div class="ui-star-rating">
    <div
      v-for="star in stars"
      :key="star"
      class="ui-star-rating__star"
      @click="handleStarClick(star)"
      @mouseenter="handleMouseEnter(star)"
      @mouseleave="handleMouseLeave"
    >
      <div class="ui-star-rating__star-background">
        <BaseSvg id="star-logo" />
      </div>

      <div class="ui-star-rating__star-fill" :style="{ width: `${getStarFill(star)}%` }">
        <BaseSvg id="star-logo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseSvg from '@/components/base/BaseSvg.vue'
import { computed, ref } from 'vue'

interface Props {
  rating: number
}

interface Emit {
  (e: 'change', value: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const hoverRating = ref<number | null>(null)
const isHovering = ref(false)

const stars = [1, 2, 3, 4, 5]

const getStarFill = (starIndex: number) => {
  const targetRating = isHovering.value && hoverRating.value !== null ? hoverRating.value : props.rating

  const fullStars = Math.floor(targetRating)
  const partialFill = targetRating - fullStars

  if (starIndex <= fullStars) {
    return 100
  } else if (starIndex === fullStars + 1 && partialFill > 0) {
    return Math.round(partialFill * 100)
  } else {
    return 0
  }
}

const handleStarClick = (rating: number) => {
  emit('change', rating)
}

const handleMouseEnter = (rating: number) => {
  isHovering.value = true
  hoverRating.value = rating
}

const handleMouseLeave = () => {
  isHovering.value = false
  hoverRating.value = null
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-star-rating {
  display: flex;
  align-items: center;
  gap: 2px;

  &__star {
    position: relative;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }

  &__star-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #e0e0e0;
    -webkit-text-stroke: 1px #a0a0a0;
  }

  &__star-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    color: $yellow;

    svg {
      width: 32px;
    }
  }
}
</style>

<template>
  <div class="banner">
    <BaseLottie
      class="banner__animation banner__animation-first"
      :src="'/animations/4/animate.json'"
      :loop="true"
      :autoplay="true"
    />

    <BaseLottie
      class="banner__animation banner__animation-second"
      :src="'/animations/2/animate.json'"
      :loop="true"
      :autoplay="true"
    />
  </div>
</template>

<script setup lang="ts">
import type { Banner } from '@/mixins/interfaces'
import BaseLottie from '@/components/base/BaseLottie.vue'

import { ref } from 'vue'

interface Props {
  bannerData: Banner
}

defineProps<Props>()

const isLiked = ref(false)
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.banner {
  width: 100%;
  background-color: $main-color;
  border-radius: 8px;
  aspect-ratio: 2 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;

  &__animation {
    &-first {
      width: 35%;
      margin-left: 10%;
    }

    &-second {
      width: 50%;
    }
  }
}
</style>

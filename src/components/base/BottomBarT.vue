<template>
  <div class="bottom-bar">
    <div class="bottom-bar__buttons">
      <div
        v-for="(btn, index) in buttons"
        :key="index"
        :class="{ 'bottom-bar__button_active': index === currentTab - 1 }"
        class="bottom-bar__button"
        @click="navigateTo(btn.link, index + 1)"
      >
        <BaseSvg class="bottom-bar__button-icon" :id="btn.icon" />
      </div>

      <div class="bottom-bar__button-progress"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseSvg from '@/components/base/BaseSvg.vue'

const router = useRouter()

const currentTab = ref(1)

const progress = computed(() => {
  return (currentTab.value - 1) * 100
})

const buttons = [
  {
    icon: 'main-logo',
    link: '/',
  },
  {
    icon: 'resto-logo',
    link: '/resto',
  },
  {
    icon: 'order-logo',
    link: '/order',
  },
  {
    icon: 'like-logo',
    link: '/basket',
  },
]

function navigateTo(path: string, tabIndex: number) {
  currentTab.value = tabIndex
  router.push(path)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.bottom-bar {
  position: relative;
  overflow: hidden;
  padding: 0 15px;

  &__buttons {
    box-sizing: content-box;
    height: 60px;
    background: $main-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 50px;
    position: relative;
    border: 3px solid $main-color;
  }

  &__button {
    background-color: transparent;
    border: none;
    z-index: 2;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;

    &-icon {
      width: 30px;
      height: 30px;
      color: $background;
    }

    &-progress {
      position: absolute;
      top: 0;
      left: 80%;
      width: 60px;
      height: 60px;
      z-index: 0;
      margin: 0 0 0 3%;
      background-color: black;
      border-radius: 50%;
    }
  }
}
</style>

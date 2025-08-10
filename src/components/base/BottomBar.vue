<template>
  <div class="bottom-nav">
    <nav class="bottom-nav__nav" ref="nav">
      <div class="bottom-nav__highlight" :style="{ transform: progress }"></div>

      <button
        v-for="(item, idx) in items"
        :key="idx"
        class="bottom-nav__btn"
        @click="navigateTo(item.link, idx)"
        :aria-label="item.label"
      >
        <BaseSvg :id="item.icon" class="bottom-nav__btn-icon" />
      </button>
    </nav>
  </div>

  {{ progress }}
</template>

<script setup lang="ts">
import { ref, onMounted, computed, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import BaseSvg from '@/components/base/BaseSvg.vue'

interface NavItem {
  icon: string
  label: string
  link: string
}

const router = useRouter()
const nav = useTemplateRef<HTMLDivElement>('nav')

onMounted(() => {
  console.log(nav.value)
})

const items: NavItem[] = [
  { icon: 'main-logo', label: 'Головна', link: '/' },
  { icon: 'resto-logo', label: 'Ресторани', link: '/resto' },
  { icon: 'order-logo', label: 'Замовлення', link: '/order' },
  { icon: 'backet-logo', label: 'Кошик', link: '/basket' },
  { icon: 'like-logo', label: 'Кошик2', link: '/basket' },
]

const activeIndex = ref(0)

function getWidth() {
  return nav.value?.clientWidth || 0
}

const progress = computed(() => {
  const point = getWidth() / items.length

  return `translateX(${activeIndex.value * (point * 1.015)}px)`
})

const navigateTo = (path: string, index: number) => {
  activeIndex.value = index
  router.push(path)
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 15px;
  bottom: 15px;
  z-index: 10;

  &__nav {
    aspect-ratio: 5 / 1;
    max-width: 400px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $text;
    border: 3px solid $text;
    border-radius: 100px;
    box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
    position: relative;
  }

  &__highlight {
    position: absolute;
    left: 0;
    height: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;

    background: $main-color;
    transition: transform 360ms;
    z-index: 0;
    pointer-events: none;
  }

  &__btn {
    appearance: none;
    background: none;
    border: 0;
    outline: 0;
    margin: 0;
    height: 100%;
    aspect-ratio: 1/1;
    padding: 0;
    cursor: pointer;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $background;
    user-select: none;

    &-icon {
      width: 24px;
      height: 24px;
      transition: transform 200ms ease;
    }

    &.active {
      transition:
        transform 200ms ease,
        color 200ms ease;

      .nav-btn-icon {
        transform: scale(1.05);
      }
    }
  }
}
</style>

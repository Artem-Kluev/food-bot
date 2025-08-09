<template>
  <nav class="bottom-nav">
    <div class="highlight" :style="{ left: `${(100 / items.length) * activeIndex}%` }"></div>

    <button
      v-for="(item, idx) in items"
      :key="idx"
      class="nav-btn"
      :class="{ active: activeIndex === idx }"
      @click="navigateTo(item.link, idx)"
      :aria-label="item.label"
    >
      <BaseSvg :id="item.icon" class="nav-btn__icon" />
    </button>
  </nav>

  {{ width }}
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseSvg from '@/components/base/BaseSvg.vue'

interface NavItem {
  icon: string
  label: string
  link: string
}

const router = useRouter()
const activeIndex = ref(0)
const width = ref(0)

const progress = computed(() => {
  const onePoint = width.value / items.length
  console.log(onePoint)

  return onePoint * 1.13 * activeIndex.value
})

const items: NavItem[] = [
  { icon: 'main-logo', label: 'Головна', link: '/' },
  { icon: 'resto-logo', label: 'Ресторани', link: '/resto' },
  { icon: 'order-logo', label: 'Замовлення', link: '/order' },
  { icon: 'backet-logo', label: 'Кошик', link: '/basket' },
  { icon: 'like-logo', label: 'Кошик2', link: '/basket' },
]

function navigateTo(path: string, index: number) {
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
  height: 52px;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $text;
  border-radius: 32px;
  border: 2px solid $text;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.highlight {
  position: absolute;
  top: 0;
  width: 20%;
  left: 0;
  height: 100%;
  border-radius: 50%;
  background: $main-color;
  z-index: 0;
  pointer-events: none;
  transition: left 300ms ease;
}

.nav-btn {
  appearance: none;
  background: none;
  border: 0;
  outline: 0;
  padding: 10px;
  margin: 0;
  width: 48px;
  height: 48px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $background;

  &__icon {
    width: 24px;
    height: 24px;
    transition: transform 200ms ease;
  }

  &.active .nav-btn__icon {
    transform: scale(1.05);
  }
}

@media (prefers-reduced-motion: reduce), (max-width: 480px) {
  .highlight {
    transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .nav-btn__icon {
    transition: transform 100ms ease;
  }
}
</style>

<template>
  <nav class="bottom-nav" ref="navRef">
    <!-- чорний фон -->
    <div
      class="highlight"
      :style="{
        width: highlightWidth + 'px',
        left: highlightLeft + 'px',
      }"
    ></div>

    <!-- кнопки -->
    <button
      v-for="(item, idx) in items"
      :key="idx"
      :ref="(el) => (buttonRefs[idx] = el as HTMLButtonElement)"
      class="nav-btn"
      :class="{ active: activeIndex === idx }"
      @click="navigateTo(item.link, idx)"
      :aria-label="item.label"
    >
      <BaseSvg :id="item.icon" class="nav-btn__icon" />
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import BaseSvg from '@/components/base/BaseSvg.vue'

interface NavItem {
  icon: string
  label: string
  link: string
}

const router = useRouter()

const items: NavItem[] = [
  { icon: 'main-logo', label: 'Головна', link: '/' },
  { icon: 'resto-logo', label: 'Ресторани', link: '/resto' },
  { icon: 'order-logo', label: 'Замовлення', link: '/order' },
  { icon: 'backet-logo', label: 'Кошик', link: '/basket' },
  { icon: 'like-logo', label: 'Кошик2', link: '/basket' },
]

const activeIndex = ref(0)
const highlightLeft = ref(0)
const highlightWidth = ref(0)

const navRef = ref<HTMLElement | null>(null)
const buttonRefs: HTMLButtonElement[] = []

const navigateTo = (path: string, index: number) => {
  activeIndex.value = index
  moveHighlight(index)
  router.push(path)
}

const moveHighlight = (index: number, withAnimation = true) => {
  const btn = buttonRefs[index]
  const nav = navRef.value
  if (!btn || !nav) return

  const btnRect = btn.getBoundingClientRect()
  const navRect = nav.getBoundingClientRect()

  // Для круглого highlight використовуємо однакову ширину і висоту
  const size = 48
  const newWidth = size
  const newLeft = Math.round(btnRect.left - navRect.left + (btnRect.width - newWidth) / 2)

  highlightWidth.value = newWidth
  highlightLeft.value = newLeft

  if (!withAnimation) {
    nav.style.setProperty('--highlight-transition', 'none')
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nav.style.removeProperty('--highlight-transition')
      })
    })
  }
}

const handleResize = () => {
  moveHighlight(activeIndex.value, false)
}

onMounted(() => {
  nextTick(() => {
    moveHighlight(activeIndex.value, false)
  })
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 15px;
  bottom: 15px;
  height: 56px;
  padding: 0 4px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $text;
  border-radius: 32px;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.highlight {
  position: absolute;
  top: 4px;
  height: calc(100% - 8px);
  border-radius: 50%;
  background: $main-color;
  transition:
    left 360ms cubic-bezier(0.22, 1, 0.36, 1),
    width 260ms ease;
  z-index: 0;
  pointer-events: none;
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
  user-select: none;

  &__icon {
    width: 24px;
    height: 24px;
    transition: transform 200ms ease;
  }

  &.active {
    transition:
      transform 200ms ease,
      color 200ms ease;

    .nav-btn__icon {
      transform: scale(1.05);
    }
  }
}
</style>

<template>
  <Transition name="fade-in" mode="out-in">
    <KeepAlive>
      <div v-if="isBottomBarVisible" class="bottom-nav">
        <nav class="bottom-nav__nav" ref="nav">
          <div class="bottom-nav__highlight" :style="{ transform: progress }"></div>

          <button
            v-for="(item, idx) in items"
            :key="idx"
            class="bottom-nav__btn"
            :class="{ active: activeIndex === idx }"
            @click="navigateTo(item.link, idx)"
            :aria-label="item.label"
          >
            <BaseSvg :id="item.icon" class="bottom-nav__btn-icon" />
          </button>
        </nav>
      </div>
    </KeepAlive>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, useTemplateRef, watch, KeepAlive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseSvg from '@/components/base/BaseSvg.vue'
import { isBottomBarVisible } from '@/composable/useBottomBar'

interface NavItem {
  icon: string
  label: string
  link: string
}

const router = useRouter()
const route = useRoute()
const nav = useTemplateRef<HTMLDivElement>('nav')

const items: NavItem[] = [
  { icon: 'main-logo', label: 'Головна', link: '/' },
  { icon: 'food-icon', label: 'Ресторани', link: '/resto' },
  { icon: 'backet-logo', label: 'Кошик', link: '/basket' },
  { icon: 'like-logo', label: 'Кошик2', link: '/favorite' },
  { icon: 'order-logo', label: 'Замовлення', link: '/order' },
]

const activeIndex = ref(0)
const navWidth = ref(0)

function updateWidth() {
  navWidth.value = nav.value?.clientWidth || 0
}

function updateActiveTab() {
  const currentPath = route.path
  const index = items.findIndex((item) => item.link === currentPath)
  if (index !== -1) {
    activeIndex.value = index
  }
}

const progress = computed(() => {
  const point = navWidth.value / items.length
  return `translateX(${activeIndex.value * (point * 1.02)}px)`
})

const navigateTo = (path: string, index: number) => {
  router.push(path)
}

onMounted(() => {
  updateWidth()
  updateActiveTab() // Визначаємо активний таб при монтуванні компонента
  window.addEventListener('resize', updateWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWidth)
})

// Відстежуємо зміни маршруту
watch(
  () => route.path,
  () => {
    updateActiveTab()
  },
)
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.fade-in-enter-active {
  transition: opacity 0.3s ease;
}

.fade-in-leave-active {
  transition: opacity 0s;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 15px;
  bottom: 15px;
  z-index: 5;

  &__nav {
    height: 60px;
    width: 280px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $text;
    border: 5px solid $text;
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

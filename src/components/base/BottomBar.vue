<template>
  <nav class="nav-bar" ref="navRef">
    <div class="nav-bg" :style="bgStyle" aria-hidden="true"></div>
    <button
      v-for="(tab, index) in tabs"
      :key="tab.name"
      :class="['nav-btn', { active: index === selectedIndex }]"
      @click="selectTab(index)"
      type="button"
      :aria-pressed="index === selectedIndex"
    >
      {{ tab.name }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = [
  { name: 'Головна', path: '/' },
  { name: 'Ресторани', path: '/resto' },
  { name: 'Замовлення', path: '/order' },
  { name: 'Кошик', path: '/basket' },
]

const selectedIndex = ref(0)
const navRef = ref<HTMLElement | null>(null)
const btnWidth = ref(0)

function selectTab(index: number) {
  selectedIndex.value = index
  router.push(tabs[index].path)
}

const bgStyle = computed(() => ({
  width: btnWidth.value + 'px',
  height: btnWidth.value + 'px', // квадратний, щоб бути круглим
  transform: `translateX(${selectedIndex.value * btnWidth.value}px) scale(0.6)`,
}))

function updateBtnWidth() {
  if (navRef.value) {
    const navWidth = navRef.value.clientWidth
    btnWidth.value = navWidth / tabs.length
  }
}

onMounted(() => {
  updateBtnWidth()
  window.addEventListener('resize', updateBtnWidth)

  // Встановлюємо активний таб на основі поточного шляху
  const currentPath = router.currentRoute.value.path
  const foundIndex = tabs.findIndex((tab) => tab.path === currentPath)
  if (foundIndex !== -1) {
    selectedIndex.value = foundIndex
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateBtnWidth)
})
</script>

<style scoped>
.nav-bar {
  position: fixed;
  bottom: 15px;
  z-index: 10;
  display: flex;
  width: 100%;
  height: auto;
  padding: 12px 0;
  background-color: transparent;
  user-select: none;
  overflow: visible;
  justify-content: space-between;
  gap: 0;
}

.nav-bg {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #3b82f6;
  border-radius: 50%;
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.3s;
  will-change: transform, width;
  z-index: 0;
  transform: translateY(-50%);
}

.nav-btn {
  flex: 1 1 0;
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: none;
  background: transparent;
  z-index: 1;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
  padding: 0;
  /* Щоб текст був у центрі */
}

.nav-btn.active {
  color: white;
}
</style>

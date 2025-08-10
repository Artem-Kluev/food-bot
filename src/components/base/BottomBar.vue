<template>
<<<<<<< HEAD
  <nav class="bottom-nav">
    <!-- чорний фон -->
    <div class="highlight" :style="{ transform: progress }"></div>

    <!-- кнопки -->
    <button
      v-for="(item, idx) in items"
      :key="idx"
      class="nav-btn"
      @click="navigateTo(item.link, idx)"
      :aria-label="item.label"
=======
  <nav class="nav-bar" ref="navRef">
    <div class="nav-bg" :style="bgStyle" aria-hidden="true"></div>
    <button
      v-for="(tab, index) in tabs"
      :key="tab.name"
      :class="['nav-btn', { active: index === selectedIndex }]"
      @click="selectTab(index)"
      type="button"
      :aria-pressed="index === selectedIndex"
>>>>>>> d7619a4387571088f18f9f48398f403ad76f9089
    >
      {{ tab.name }}
    </button>
  </nav>

  {{ progress }}
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref, onMounted, computed } from 'vue'
=======
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
>>>>>>> d7619a4387571088f18f9f48398f403ad76f9089
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = [
  { name: 'Головна', path: '/' },
  { name: 'Ресторани', path: '/resto' },
  { name: 'Замовлення', path: '/order' },
  { name: 'Кошик', path: '/basket' },
]

<<<<<<< HEAD
const activeIndex = ref(0)

function getWidth() {
  return window.innerWidth - 38
}

const progress = computed(() => {
  const point = getWidth() / items.length

  return `translateX(${activeIndex.value * (point * 1.02)}px)`
})

const navigateTo = (path: string, index: number) => {
  activeIndex.value = index
  router.push(path)
}
=======
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
>>>>>>> d7619a4387571088f18f9f48398f403ad76f9089
</script>

<style scoped>
.nav-bar {
  position: fixed;
  bottom: 15px;
<<<<<<< HEAD
  aspect-ratio: 5 / 1;

  box-sizing: border-box;
=======
  z-index: 10;
>>>>>>> d7619a4387571088f18f9f48398f403ad76f9089
  display: flex;
  width: 100%;
  height: auto;
  padding: 12px 0;
  background-color: transparent;
  user-select: none;
  overflow: visible;
  justify-content: space-between;
<<<<<<< HEAD
  background: $text;
  border: 3px solid $text;
  border-radius: 100px;
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.08);
  z-index: 10;
=======
  gap: 0;
>>>>>>> d7619a4387571088f18f9f48398f403ad76f9089
}

.nav-bg {
  position: absolute;
<<<<<<< HEAD
  left: 0;
  height: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;

  background: $main-color;
  transition: transform 360ms;
=======
  top: 0;
  left: 0;
  background-color: #3b82f6;
  border-radius: 50%;
  transition:
    transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    width 0.3s;
  will-change: transform, width;
>>>>>>> d7619a4387571088f18f9f48398f403ad76f9089
  z-index: 0;
  transform: translateY(-50%);
}

.nav-btn {
<<<<<<< HEAD
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
=======
  flex: 1 1 0;
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: none;
  background: transparent;
>>>>>>> d7619a4387571088f18f9f48398f403ad76f9089
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

<template>
  <div class="wrapper">
    <div class="search-container">
      <UiSearch />
    </div>

    <main class="main">
      <RouterView />
    </main>

    <BottomBar class="bottom" />

    <RestoBlock />
    <FoodBlock/>
  </div>

  <SvgManager />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import SvgManager from '@/components/base/SvgManager.vue'
import RestoBlock from '@/components/widgets/RestoBlock.vue'

import BottomBar from '@/components/widgets/BottomBar.vue'
import UiSearch from '@/components/ui/UiSearch.vue'

import { onMounted, ref } from 'vue'
import FoodBlock from './components/widgets/FoodBlock.vue'

const tg = ref<any>(null)
const tgAvailable = ref(false)
const tgUserName = ref<string | null>(null)

onMounted(() => {
  tg.value = window.Telegram?.WebApp ?? null
  if (tg.value) {
    tg.value.expand()
    tg.value.disableVerticalSwipes()
    tgAvailable.value = true

    // Отримуємо ім'я користувача, якщо доступно
    tgUserName.value = tg.value.initDataUnsafe?.user?.first_name ?? null
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.search-container {
  position: sticky;
  top: 0;
  z-index: 11;
  padding: 10px;
  background-color: $background;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.main {
  flex: 1 1 auto;
  margin-bottom: 90px;
  margin-top: 10px;
}
</style>

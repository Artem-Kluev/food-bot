<script setup lang="ts">
import { RouterView } from 'vue-router'
import SvgManager from '@/components/base/SvgManager.vue'
import BottomBar from '@/components/widgets/BottomBar.vue'
import UiSearch from '@/components/ui/UiSearch.vue'

import { onMounted } from 'vue'

onMounted(() => {
  const tg = window.Telegram?.WebApp

  if (tg) {
    tg.disableVerticalSwipes()
    tg.expand()
  }
})
</script>

<template>
  <div class="wrapper">
    <div class="search-container">
      <UiSearch />
    </div>
    <main class="main">
      <RouterView />
    </main>

    <BottomBar class="bottom" />
  </div>

  <SvgManager />
</template>

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

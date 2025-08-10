<script setup lang="ts">
import { RouterView } from 'vue-router'
import SvgManager from '@/components/base/SvgManager.vue'
import BottomBar from '@/components/widgets/BottomBar.vue'
import UiSearch from '@/components/ui/UiSearch.vue'

import { onMounted, ref } from 'vue'

const tg = ref<any>(null)

onMounted(() => {
  if (window.Telegram?.WebApp) {
    tg.value = window.Telegram.WebApp
    console.log('Telegram WebApp initialized:', tg.value)

    tg.value.expand()

    if (tg.value.themeParams) {
      document.documentElement.style.setProperty(
        '--tg-theme-bg-color',
        tg.value.themeParams.bg_color || '#ffffff',
      )
      document.documentElement.style.setProperty(
        '--tg-theme-text-color',
        tg.value.themeParams.text_color || '#000000',
      )
      document.documentElement.style.setProperty(
        '--tg-theme-hint-color',
        tg.value.themeParams.hint_color || '#999999',
      )
      document.documentElement.style.setProperty(
        '--tg-theme-link-color',
        tg.value.themeParams.link_color || '#2678b6',
      )
      document.documentElement.style.setProperty(
        '--tg-theme-button-color',
        tg.value.themeParams.button_color || '#2678b6',
      )
      document.documentElement.style.setProperty(
        '--tg-theme-button-text-color',
        tg.value.themeParams.button_text_color || '#ffffff',
      )
    }
  } else {
    console.warn('Telegram WebApp is not available. Running in browser mode.')
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
    {{ tg }}
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

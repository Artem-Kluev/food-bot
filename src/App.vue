<script setup lang="ts">
import { RouterView } from 'vue-router'
import SvgManager from '@/components/base/SvgManager.vue'
import RestoBlock from '@/components/widgets/RestoBlock.vue'

import BottomBar from '@/components/widgets/BottomBar.vue'
import UiSearch from '@/components/ui/UiSearch.vue'

import { onMounted, ref } from 'vue'
import FoodBlock from './components/widgets/FoodBlock.vue'
import useElementObserver from '@/composable/useElementObserver'
import { supabase } from '@/plugins/supabase'

const tg = ref<any>(null)
const tgAvailable = ref(false)
const tgUserName = ref<string | null>(null)

// Використовуємо composable для спостереження за елементами з класом .observer
useElementObserver()

onMounted(() => {
  tg.value = window.Telegram?.WebApp ?? null
  if (!tg.value) return

  tg.value.expand()
  tg.value.disableVerticalSwipes()
  tgAvailable.value = true

  tgUserName.value = tg.value.initData

  validateUser(tgUserName.value, {
    name: tgUserName.value,
  })
})

const validateUser = async (initData: any, userData = {}) => {
  try {
    const response = await fetch(`https://tvepxpvfbxxulgfwkexe.supabase.co/functions/v1/dynamic-handler`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        initData,
        userData,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Validation failed')
    }

    return result
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
</script>

<template>
  {{ tgUserName }}
  <div class="wrapper">
    <div class="search-container">
      <UiSearch />
    </div>

    <main class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>

    <BottomBar class="bottom" />

    <RestoBlock />
    <FoodBlock />
  </div>

  <SvgManager />
</template>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
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

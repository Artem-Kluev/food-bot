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
  const tgWebApp = window.Telegram?.WebApp
  if (!tgWebApp) return

  tgWebApp.expand()
  tgWebApp.disableVerticalSwipes()

  const initData = tgWebApp.initData
  const user = tgWebApp.initDataUnsafe?.user ?? {}
  const botTokenV = '8252025308:AAGba79SM0VTa3vFT6NocQNL8qyUUEO-gyo'
  const dataCheckStringV =
    'user=%7B%22id%22%3A665557371%2C%22first_name%22%3A%22%D0%90%D1%80%D1%82%D0%B5%D0%BC%22%2C%22last_name%22%3A%22%D0%9A%D0%BB%D1%8E%D0%B5%D0%B2%22%2C%22username%22%3A%22kluev_artem%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2Fz13dEZ_cHV9BtxC4uuc54qB_jjt4BJuFm97mqQ1gz4Q.svg%22%7D&chat_instance=-5190874424870972511&chat_type=sender&auth_date=1759578037&signature=JKzlYXJw1z_ojAv7QwNS_06zf1JhM5FASKUQqpXQomMz3byNHR8okUSKNxt-r5Me6SCHGPexkkOA7xG1q43eBQ&hash=09a07345e6eebcebd00425a493878cf7a22b54f379d0f1cbecda52b57bccefcb'

  tgUserName.value = user.first_name ?? 'Unknown'

  tgAvailable.value = initData
  validateUser(initData)
})

const validateUser = async (id: string) => {
  const data = {
    id: id,
    update: { username: tgUserName.value },
  }

  try {
    const response = await fetch('https://tvepxpvfbxxulgfwkexe.supabase.co/functions/v1/dynamic-handler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        tg.value = data
        console.log('API Response:', data)
      })
      .catch(console.error)
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
</script>

<template>
  {{ tg }}

  .................................

  {{ tgAvailable }}
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

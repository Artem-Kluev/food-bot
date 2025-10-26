<script setup lang="ts">
import { RouterView } from 'vue-router'
import SvgManager from '@/components/base/SvgManager.vue'
import RestoBlock from '@/components/widgets/RestoBlock.vue'
import BaseLottie from '@/components/base/BaseLottie.vue'
import BottomBar from '@/components/widgets/BottomBar.vue'
import UiSearch from '@/components/ui/UiSearch.vue'

import { onMounted } from 'vue'
import FoodBlock from './components/widgets/FoodBlock.vue'
import useElementObserver from '@/composable/useElementObserver'
import { usePreloader } from '@/composable/usePreloader'

useElementObserver()

// Ініціалізуємо прелоадер
const { isPreloaderActive } = usePreloader()

onMounted(() => {
  const tgWebApp = window.Telegram?.WebApp

  tgWebApp?.expand()
  tgWebApp?.disableVerticalSwipes()
})
</script>

<template>
  <div v-if="$route.meta.standalone" class="standalone-wrapper">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
  <div v-else class="wrapper">
    <div class="search-container">
      <UiSearch />
    </div>

    <main class="main" :class="{ 'main_preloader-active': isPreloaderActive }">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>

      <div class="preloader">
        <div class="preloader__spinner">
          <BaseLottie class="ui-search__animation" :src="'/animations/5/animate.json'" :loop="true" :autoplay="true" />
        </div>
      </div>
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

  &_preloader-active {
    height: calc(101vh - 170px);

    .preloader {
      display: flex;
    }
  }
}

.preloader {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0, 0);
  width: 100%;
  height: 100%;
  background: $background;
  z-index: 2;
  display: none;
  align-items: center;
  justify-content: center;

  &__spinner {
    aspect-ratio: 1/1;
    width: 25vw;
    max-width: 150px;
  }
}

.standalone-wrapper {
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  background-color: $background;
}
</style>

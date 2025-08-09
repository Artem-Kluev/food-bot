<script setup lang="ts">
import { RouterView } from 'vue-router'
import SvgManager from '@/components/base/SvgManager.vue'
import BottomBar from '@/components/base/BottomBar.vue'
</script>

<template>
  <div class="wrapper">
    <main class="main">
      <RouterView />
    </main>

    <BottomBar class="bottom" />
  </div>

  <SvgManager />
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.main {
  flex: 1 1 auto;
  margin-bottom: 90px;
}
</style>

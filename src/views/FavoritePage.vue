<template>
  <div class="favorite-page">
    <h1 class="favorite-page__title">Обране</h1>

    <UiTabs v-model="activeTab" :tabs="['Ресторани', 'Їжа']" class="ui-tabs" />

    <div class="favorite-page__cards">
      <div v-if="activeTab === 0" class="resto-container">
        <ProductCard v-for="restaurant in sliders" :key="restaurant.title" :slide-data="restaurant" modifier="resto" />
      </div>

      <div v-else-if="activeTab === 1" class="menu-container">
        <ProductCard v-for="item in foodSliders" :key="item.title" :slide-data="item" modifier="resto" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiTabs from '@/components/ui/UiTabs.vue'
import ProductCard from '@/components/widgets/ProductCard.vue'
import { ref } from 'vue'
import { sliders } from '@/mixins/resto'
import { foodSliders } from '@/mixins/food'

const activeTab = ref(0)
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.favorite-page {
  padding: 10px 0;

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 20px;
    color: $text;
    padding: 0 10px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__empty {
    text-align: center;
    padding: 40px 0;
    color: $text;
    font-size: 18px;
  }

  &__cards {
    padding: 10px;
    margin-top: 20px;
  }
}
</style>

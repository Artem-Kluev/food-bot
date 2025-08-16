<template>
  111111111111111
  <CategorySlider :categories="categories" @selected="console.log($event)" />

  <ButtonSlider :buttons="delivery" title="Спосіб доставки" />

  <ButtonSlider :buttons="payment" title="Спосіб оплати" />

  <ButtonSlider :buttons="offers" title="Пропозиції" />
  <!-- 
  <div class="toggle-container">
    <UiToggle v-model="darkMode" />

    <span>Зараз працюють</span>
  </div> -->

  <UiTabs v-model="activeTab" :tabs="['Ресторани', 'Їжа']" class="ui-tabs" />

  <div v-if="activeTab === 0" class="resto-container">
    <ProductCard
      v-for="restaurant in popularRestaurants"
      :key="restaurant.title"
      :slide-data="{
        title: restaurant.title,
        image: restaurant.image,
        rating: 4.3,
        time: 25,
        type: 'resto',
        tags: restaurant.tags,
      }"
      modifier="resto"
    />
  </div>

  <div v-else-if="activeTab === 1" class="menu-container">
    <ProductCard v-for="item in sliders" :key="item.title" :slide-data="item" modifier="resto" />
  </div>
</template>

<script setup lang="ts">
import CategorySlider from '@/components/widgets/CategorySlider.vue'
import ButtonSlider from '@/components/widgets/ButtonSlider.vue'
import UiToggle from '@/components/ui/UiToggle.vue'
import UiTabs from '@/components/ui/UiTabs.vue'
import { ref } from 'vue'
import type { Category } from '@/mixins/interfaces'
import ProductCard from '@/components/widgets/ProductCard.vue'
import {
  sliders,
  popularRestaurants,
  newRestaurants,
  discountRestaurants,
  premiumRestaurants,
} from '@/mixins/resto'

const darkMode = ref(true)
const activeTab = ref(0)

const payment = ref<Array<any>>([
  {
    title: 'На карту',
    id: 1,
  },
  {
    title: 'Готівкою при отриманні',
    id: 2,
  },
])

const delivery = ref<Array<any>>([
  {
    title: 'Таксі',
    id: 2,
  },
  {
    title: 'Своя служба доставки',
    id: 1,
  },
  {
    title: 'Самовивіз',
    id: 1,
  },
])

const offers = ref<Array<any>>([
  {
    title: 'Безкоштовна доставка',
    id: 1,
  },
  {
    title: 'Акція',
    id: 2,
  },

  {
    title: 'Новинка',
    id: 1,
  },
])

const categories = ref<Array<Category>>([
  {
    title: 'Піца',
    image: '/images/category/pizza.webp',
    id: 1,
  },
  {
    title: 'Суші',
    image: '/images/category/sushi.webp',
    id: 2,
  },
  {
    title: 'Фастфуд',
    image: '/images/category/fastfood.webp',
    id: 4,
  },
  {
    title: 'Пиво/Сидр',
    image: '/images/category/beer.png',
    id: 5,
  },
  {
    title: 'Солодощі',
    image: '/images/category/dessert.png',
    id: 6,
  },
  {
    title: 'Бургери',
    image: '/images/category/burger.png',
    id: 6,
  },
  {
    title: 'Салат',
    image: '/images/category/salad.png',
    id: 6,
  },
])
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.resto-page {
  padding: 20px;
}

.toggle-container {
  display: flex;

  align-items: center;
  justify-content: space-between;
  padding: 10px;

  span {
    font-size: 16px;
  }
}

.ui-tabs {
  margin-top: 25px;
}

.resto-container,
.menu-container {
  padding: 10px;
  margin-top: 20px;
}
</style>

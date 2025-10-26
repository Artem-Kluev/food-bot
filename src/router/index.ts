import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import RestoPage from '@/views/RestoPage.vue'
import OrderPage from '@/views/OrderPage.vue'
import BasketPage from '@/views/BasketPage.vue'
import FavoritePage from '@/views/FavoritePage.vue'
import PrivacyPolicyPage from '@/views/PrivacyPolicyPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/resto',
      name: 'resto',
      component: RestoPage,
    },
    {
      path: '/order',
      name: 'order',
      component: OrderPage,
    },
    {
      path: '/basket',
      name: 'basket',
      component: BasketPage,
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoritePage,
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyPolicyPage,
      meta: {
        standalone: true
      }
    },
  ],
})

export default router

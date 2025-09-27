<script setup lang="ts">
import BannerCard from '@/components/widgets/BannerCard.vue'
import CategorySlider from '@/components/widgets/CategorySlider.vue'
import Features from '@/components/widgets/FeaturesComponent.vue'
import { getCategories } from '@/mixins/categories'
import PrivacyPolicyModal from '@/components/widgets/PrivacyPolicyModal.vue'
import PartnershipModal from '@/components/widgets/PartnershipModal.vue'
import { banners } from '@/mixins/banners'
import { sliders } from '@/mixins/resto'
import { ref } from 'vue'
import type { Category } from '@/mixins/interfaces'

// Вибираємо перші 4 ресторани для відображення в грід-сітці
const popularRestaurants = ref(sliders.slice(0, 4))
const categories = ref<Category[]>([])

// Референції на модальні вікна
const privacyPolicyModalRef = ref()
const partnershipModalRef = ref()

// Функції для відкриття модальних вікон
function openPrivacyPolicyModal() {
  privacyPolicyModalRef.value.openModal()
}

function openPartnershipModal() {
  partnershipModalRef.value.openModal()
}

async function getFoodCategories() {
  categories.value = await getCategories('lubny')
}

getFoodCategories()
</script>

<template>
  <div class="main-page">
    <BannerCard :bannerData="banners[0]" class="main-page__banner" />

    <h3 class="main-page__title">Популярні категорії</h3>

    <CategorySlider :categories="categories" :navigateMode="true" class="main-page__category-slider" />

    <Features />

    <h3 class="main-page__title observer">Про сервіс</h3>
    <p class="main-page__description observer">
      Наш сервіс - це єдина платформа, де зібрані різноманітні ресторани вашого міста. Тут ви можете переглянути меню, ціни та умови
      доставки від різних закладів, порівняти їх пропозиції та акції.
    </p>

    <h3 class="main-page__title observer">Як це працює</h3>

    <div class="steps-block observer">
      <div class="steps">
        <div class="step observer">
          <div class="step__number">1</div>
          <div class="step__content">
            <h4 class="step__title">Виберіть ресторан</h4>

            <p class="step__text">Оберіть улюблений ресторан з нашого каталогу</p>
          </div>
        </div>
        <div class="step observer">
          <div class="step__number">2</div>
          <div class="step__content">
            <h4 class="step__title">Оберіть страви</h4>

            <p class="step__text">Додайте бажані страви до кошика</p>
          </div>
        </div>
        <div class="step observer">
          <div class="step__number">3</div>
          <div class="step__content">
            <h4 class="step__title">Оформіть замовлення</h4>

            <p class="step__text">Вкажіть адресу та спосіб оплати</p>
          </div>
        </div>
        <div class="step observer">
          <div class="step__number">4</div>
          <div class="step__content">
            <h4 class="step__title">Отримайте замовлення</h4>

            <p class="step__text">Насолоджуйтесь смачною їжею вдома</p>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-links observer">
      <div class="footer-links__row">
        Хочете приєднатися?

        <button @click="openPartnershipModal" class="footer-links__button">Стати партнером</button>
      </div>
      <div class="footer-links__row">
        Ознайомтеся з

        <button @click="openPrivacyPolicyModal" class="footer-links__button">політикою конфіденційності</button>
      </div>
    </div>

    <PrivacyPolicyModal ref="privacyPolicyModalRef" />

    <PartnershipModal ref="partnershipModalRef" />
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.main-page {
  &__banner {
    margin-bottom: 20px;
  }

  &__title {
    font-weight: 500;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  &__category-slider {
    margin-bottom: 20px;
  }

  &__description {
    font-size: 16px;
    padding: 0 10px;
    margin-bottom: 30px;
    color: rgba($text, 0.7);
  }

  &__resto-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px 15px;
    padding: 0 10px;
    margin-bottom: 40px;
  }

  &__resto-card {
    width: 100%;
    height: 100%;
  }
}

// Стилі для блоку кроків
.steps-block {
  padding: 0 10px;
  margin-bottom: 40px;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step {
  display: flex;
  align-items: flex-start;

  &__number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: $main-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    margin-right: 15px;
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 5px;
  }

  &__text {
    font-size: 14px;
    color: rgba($text, 0.7);
  }
}

// Стилі для блоку посилань в футері
.footer-links {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
  margin-top: 20px;
  border-top: 1px solid rgba($text, 0.1);

  &__row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
  }

  &__text {
    color: rgba($text, 0.7);
  }

  &__button {
    font-size: 14px;
    color: $main-color;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: opacity 0.2s;
    font-family: inherit;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
}
</style>

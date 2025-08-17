<template>
  <Transition name="fade-slide">
    <div v-if="isRestoBlockVisable" class="resto-block">
      <div class="resto-block__main" @click.self="toggleRestoBlock(false)">
        <div class="resto-block__wrapper">
          <div class="resto-block__image">
            <div class="resto-block__back" @click="toggleRestoBlock(false)">
              <BaseSvg class="resto-block__back-icon" id="arrow-logo" />
            </div>

            <img class="resto-block__img" src="/images/resto/resto_2.webp" />
          </div>

          <div class="resto-block__top">
            <UiStarRating :rating="rating" @change="rating = $event" />

            <UiLike v-model="isLiked" modifier="resto" />
          </div>

          <div class="resto-block__title">Resto name</div>

          <div class="resto-block__description">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis nulla error vitae enim
            incidunt esse nostrum libero perspiciatis placeat maiores consequatur minima fugit
            accusantium consectetur, in quidem temporibus. Dolore, at. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Impedit autem, ullam aliquam vel laudantium labore sit
            voluptates asperiores. Expedita placeat eveniet eaque voluptate eligendi voluptatum quam
          </div>

          <ButtonSlider :buttons="payment" class="resto-block__filters" radio />

          <div class="resto-block__cards">
            <ProductCard
              v-for="item in sliders"
              v-memo="[item.title]"
              :key="item.title"
              :slide-data="item"
              modifier="resto"
              counter
            />
          </div>

          <div class="resto-block__button">
            <div class="resto-block__button-text">Перейти в корзину</div>

            <hr class="resto-block__button-line" />

            <div class="resto-block__button-price">
              <div class="resto-block__button-sum">546</div>
              грн
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { isRestoBlockVisable, toggleRestoBlock } from '@/composable/useRestoBlock'
import { useScrollLock } from '@/composable/useScrollLock'
import { watch, ref } from 'vue'
import ButtonSlider from '@/components/widgets/ButtonSlider.vue'

import BaseSvg from '@/components/base/BaseSvg.vue'
import UiStarRating from '@/components/ui/UiStarRating.vue'
import UiLike from '@/components/ui/UiLike.vue'
import ProductCard from '@/components/widgets/ProductCard.vue'
import {
  sliders,
  popularRestaurants,
  newRestaurants,
  discountRestaurants,
  premiumRestaurants,
} from '@/mixins/resto'

const { lockScroll, unlockScroll } = useScrollLock()

const isLiked = ref(false)

const rating = ref(4.5)

const payment = ref<Array<any>>([
  {
    title: 'Піца',
    id: 1,
  },
  {
    title: 'Супи',
    id: 2,
  },
  {
    title: 'Напої',
    id: 2,
  },
  {
    title: 'Алкоголь',
    id: 2,
  },
  {
    title: 'Суши',
    id: 2,
  },
])

watch(isRestoBlockVisable, (newValue) => {
  if (newValue) {
    lockScroll()
  } else {
    unlockScroll()
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.resto-block {
  position: fixed;
  z-index: 11;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.363);
  overflow: hidden;

  &__main {
    overflow: auto;
    height: 100%;
  }

  &__wrapper {
    background-color: $background;
    margin-top: 80px;
    border-radius: 30px 30px 0 0;
    transition: transform 0.3s ease;
    overflow: hidden;
    min-height: calc(100% - 80px);
  }

  &__image {
    position: relative;
    top: -1px;
    width: 100%;
    aspect-ratio: 1.5 / 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0;
  }

  &__back {
    position: absolute;
    z-index: 2;
    top: 15px;
    left: 15px;
    display: flex;
    align-items: center;
    color: $main-color;
    width: 40px;
    height: 40px;
    background-color: $background;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;

    &:active {
      transform: scale(0.95);
    }

    &-icon {
      transform: rotate(180deg);
      width: 30px;
      height: 30px;
    }
  }

  &__title {
    font-size: 24px;
    font-weight: 500;
    padding: 10px;
  }

  &__description {
    padding: 0 10px;
    margin-bottom: 30px;
  }

  &__filters {
    margin-bottom: 20px;
  }

  &__cards {
    display: grid;
    grid-template-columns: 1fr;
    padding: 0 10px;
    contain: content;
    will-change: transform;
    transform: translateZ(0);
  }

  &__button {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    height: 50px;
    border-radius: 30px;
    background-color: $main-color;
    color: $white;
    cursor: pointer;
    user-select: none;
    text-align: center;
    line-height: 50px;
    margin: 0 40px;
    padding: 0 25px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: transform 0.2s;

    &:active {
      transform: scale(0.95);
    }

    &-line {
      height: 30px;
      width: 1px;
      border-radius: 2px;
      background-color: $background;
    }

    &-price {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}

.fade-slide-enter-active {
  transition:
    transform 0.3s,
    background-color 0.2s 0.3s;
}

.fade-slide-leave-active {
  transition: transform 0.3s;
}

.fade-slide-leave-to,
.fade-slide-enter-from {
  transform: translateY(100%);
  background-color: unset;
}
</style>

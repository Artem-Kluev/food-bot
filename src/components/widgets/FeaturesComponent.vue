<template>
  <div class="features">
    <div class="features__item">
      <div class="features__icon features__icon_delivery">
        <BaseLottie src="/animations/4/animate.json" :loop="true" :autoplay="true" />
      </div>
      <div class="features__content">
        <h3 class="features__title">Блискавична доставка</h3>
        <p class="features__text">Від 15 до 30 хвилин до вашого столу</p>
      </div>
    </div>

    <div class="features__item">
      <div class="features__icon features__icon_quality">
        <BaseLottie src="/animations/2/animate.json" :loop="true" :autoplay="true" />
      </div>
      <div class="features__content">
        <h3 class="features__title">Завжди найкраще</h3>
        <p class="features__text">Обирай серед різних ресторанів</p>
      </div>
    </div>

    <div class="features__item">
      <div class="features__icon features__icon_telegram">
        <BaseLottie src="/animations/telegram/animate.json" :loop="true" :autoplay="true" />
      </div>
      <div class="features__content">
        <h3 class="features__title">Замовлення в Телеграмі</h3>
        <p class="features__text">Замовляйте в Телеграмі в пару кліків</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLottie from '@/components/base/BaseLottie.vue'
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.features {
  display: grid;
  grid-template: repeat(3, 1fr) / 1fr;
  gap: 12px;
  padding: 0 10px;
  margin-bottom: 30px;
  margin-top: 1000px;

  &__item {
    display: flex;
    align-items: center;
    opacity: 0;
    gap: 10px;
    background-color: $white;
    border-radius: 16px;
    padding: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    &:nth-child(1) {
      border-left: 4px solid $yellow;
      animation: show 0.3s ease forwards;
    }

    &:nth-child(2) {
      border-left: 4px solid $main-color;
      animation: show 0.3s ease 0.2s forwards;
    }

    &:nth-child(3) {
      border-left: 4px solid $telegram;
      animation: show 0.3s ease 0.4s forwards;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
  }

  &__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 12px;
    background-color: $background;
    flex-shrink: 0;
    overflow: hidden;
    color: $main-color;
  }

  &__content {
    flex: 1;
  }

  &__title {
    font-weight: 700;
    color: $text;
    margin: 0 0 6px 0;
    line-height: 1;
    font-size: min(4.5vw, 20px);
  }

  &__text {
    color: $text;
    opacity: 0.85;
    margin: 0;
    line-height: 1;
    font-size: min(4vw, 16px);
  }
}

@keyframes show {
  from {
    opacity: 0;
    transform: translateX(100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

<template>
  <div class="banner">
    <div class="banner__content">
      <div class="banner__column banner__column-text">
        <div class="typing-container">
          <h2 class="title title--medium typing-text" v-html="formattedText"></h2>
        </div>
      </div>

      <div class="banner__column">
        <BaseLottie class="banner__animation banner__animation-first" :src="'/animations/7/animate.json'" :loop="true" :autoplay="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Banner } from '@/mixins/interfaces'
import BaseLottie from '@/components/base/BaseLottie.vue'

import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  bannerData: Banner
}

defineProps<Props>()

const phrases = [
  'Щастя це гаряча страва, що вже їде до тебе.',
  'Смачна їжа - це завжди гарний настрій.',
  'Найкращі моменти життя починаються зі смачної їжі.',
  'Доставка їжі - це коли смак приходить до тебе.',
  'Твоя улюблена страва вже в дорозі до тебе.',
  'Момент смаку — ось що робить день особливим.',
  'Смак, який ти чекаєш, вже близько.',
  'Маленькі радощі роблять великі дні.',
  'Твоя вечеря вже готується і скоро буде у тебе.',
  'Хто знає, що буде завтра? Смакуй сьогодні!',
  'Живи сьогодні дієта зачекає.',
]

const currentPhraseIndex = ref(0)
const displayedCharCount = ref(0)
let typingTimer: number | null = null

const currentPhrase = computed(() => phrases[currentPhraseIndex.value])

const formattedText = computed(() => {
  const text = currentPhrase.value.substring(0, displayedCharCount.value)
  return text + (displayedCharCount.value < currentPhrase.value.length ? '<span class="typing-cursor">|</span>' : '')
})

function typeText() {
  if (displayedCharCount.value < currentPhrase.value.length) {
    // Друкування тексту
    displayedCharCount.value++
    typingTimer = setTimeout(typeText, 50)
  } else {
    // Пауза перед видаленням
    typingTimer = setTimeout(eraseText, 5000)
  }
}

function eraseText() {
  if (displayedCharCount.value > 0) {
    // Видалення тексту
    displayedCharCount.value--
    typingTimer = setTimeout(eraseText, 25)
  } else {
    // Перехід до наступної фрази
    currentPhraseIndex.value = (currentPhraseIndex.value + 1) % phrases.length
    typingTimer = setTimeout(typeText, 200)
  }
}

onMounted(() => {
  // Почати анімацію друкування після монтування компонента
  typingTimer = setTimeout(typeText, 500)
})

onBeforeUnmount(() => {
  // Очистити таймер при знищенні компонента
  if (typingTimer) {
    clearTimeout(typingTimer)
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.banner {
  width: 100%;
  background-color: $main-color;
  border-radius: 8px;
  aspect-ratio: 2 / 1;

  &__content {
    display: flex;
    justify-content: center;
    height: 100%;
    color: $background;
    font-size: 3.5vw;
    text-align: center;
    line-height: 150%;
  }

  &__column {
    height: 100%;
    flex-grow: 1;

    &-text {
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1 0 50%;
      text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
    }
  }

  &__animation {
    width: 90%;
    animation: animation 15s linear infinite;
  }
}

.typing-container {
  position: relative;
  display: inline-block;
}

.typing-text {
  display: inline-block;
  text-align: center;
  white-space: normal;
  min-height: 3em;
}

.typing-cursor {
  display: inline-block;
  color: $background;
  animation: blink-caret 0.75s step-end infinite;
  font-weight: bold;
}

@keyframes blink-caret {
  from,
  to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@keyframes animation {
  0% {
    transform: translateX(-15%);
  }
  50% {
    transform: translateX(20%);
  }
  100% {
    transform: translateX(-15%);
  }
}
</style>

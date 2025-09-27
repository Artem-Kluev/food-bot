<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import BaseLottie from '@/components/base/BaseLottie.vue'
import UiPrice from '@/components/ui/UiPrice.vue'
import { toggleBottomBar } from '@/composable/useBottomBar'
import { allRestoCard, request } from '@/composable/useResto'
import { useScrollLock } from '@/composable/useScrollLock'
import { setRestoBlockData } from '@/composable/useRestoBlock'
import type { Resto } from '@/mixins/interfaces'

interface SearchItem {
  id: number
  name: string
  description: string
  price: number
  oldPrice?: number
  image: string
}

const searchQuery = ref('')
const isActive = ref(false)
const loading = ref(false)
const results = ref<any[]>([])

const { lockScroll, unlockScroll } = useScrollLock()

// Імітація пошуку з затримкою
let searchTimeout: number | null = null

function onInput() {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (!searchQuery.value) {
    results.value = []
    loading.value = false
    return
  }

  loading.value = true

  searchTimeout = setTimeout(async () => {
    await searchRestaurants(searchQuery.value)
    loading.value = false
  }, 500) as unknown as number
}

async function searchRestaurants(query: string) {
  await request()

  if (query.length === 0) {
    results.value = []
    return
  }

  const searchTerm = query.toLowerCase()

  results.value = allRestoCard.value.filter((resto) => resto.title?.toLowerCase().includes(searchTerm))
}

function clearSearch() {
  searchQuery.value = ''
  results.value = []
  toggleBottomBar(true)
}

function selectItem(item: Resto) {
  setRestoBlockData({ resto: item })
  clearSearch()
}

// Блокування скролу при відкритті результатів пошуку
watch(searchQuery, (newValue) => {
  if (newValue) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

// Закриття пошуку при натисканні Escape
watch(
  () => isActive.value,
  (newValue) => {
    if (newValue) {
      document.addEventListener('keydown', handleEscKey)
    } else {
      document.removeEventListener('keydown', handleEscKey)
    }
  },
)

function handleEscKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    clearSearch()
  }
}
</script>

<template>
  <div class="ui-search">
    <div class="ui-search__input-wrapper">
      <input
        v-model="searchQuery"
        class="ui-search__input"
        type="text"
        placeholder="Пошук..."
        @input="onInput"
        @focus="toggleBottomBar(false)"
        @blur="searchQuery || toggleBottomBar()"
      />

      <BaseSvg class="ui-search__icon" id="search-icon" />

      <button v-if="searchQuery" class="ui-search__clear" @click="clearSearch">
        <BaseSvg id="close-icon" />
      </button>
    </div>

    <div v-if="searchQuery" class="ui-search__overlay">
      <div class="ui-search__results">
        <div v-if="loading" class="ui-search__loading">
          <BaseLottie class="ui-search__animation" :src="'/animations/5/animate.json'" :loop="true" :autoplay="true" />
        </div>

        <div v-else-if="results.length === 0" class="ui-search__empty">
          <BaseLottie class="ui-search__animation" :src="'/animations/6/animate.json'" :loop="true" :autoplay="true" />

          <div class="ui-search__empty-text">Нічого не знайдено</div>
        </div>

        <div v-else class="ui-search__items">
          <div v-for="(item, index) in results" :key="index" class="ui-search__item" @click="selectItem(item)">
            <div class="ui-search__item-image">
              <img :src="item.imageUrl" alt="" />
            </div>
            <div class="ui-search__item-content">
              <div class="ui-search__item-name">{{ item.title }}</div>
              <div class="ui-search__item-description">{{ item.description }}</div>
              <UiPrice v-if="item.price" :price="item.price.base" :old-price="item.price.old" />
            </div>
          </div>
        </div>
      </div>

      <button v-show="!loading && false" class="ui-search__button" @click="onInput">
        <BaseSvg class="ui-search__button-icon" id="search-icon" />

        <span>Пошук</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.ui-search {
  position: relative;
  width: 100%;

  &__input-wrapper {
    position: relative;
    width: 100%;
    z-index: 10;
  }

  &__input {
    width: 100%;
    height: 48px;
    padding: 0 48px;
    border-radius: 12px;
    border: 1px solid rgba($text, 0.1);
    background-color: $white;
    font-size: 16px;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: $main-color;
      // box-shadow: 0 0 0 2px rgba($main-color, 0.2);
      outline: 1px solid $main-color;
    }

    &::placeholder {
      color: rgba($text, 0.5);
    }
  }

  &__icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: rgba($text, 0.5);
  }

  &__clear {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    padding: 10px;

    border: none;
    background: none;
    cursor: pointer;
    color: rgba($text, 0.5);
    transition: color 0.2s ease;

    &:hover {
      color: $text;
    }
  }

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba($text, 0.5);

    display: flex;
    flex-direction: column;

    overflow-y: auto;
  }

  &__results {
    background-color: $white;
    padding: 60px 0 0;
    flex-grow: 1;
    overflow-y: auto;
    max-height: 100vh;
  }

  &__loading,
  &__empty {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &-text {
      margin-top: -15px;
      font-size: 12px;
    }
  }

  &__animation {
    max-height: 100px;
  }

  &__loading {
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
  }

  &__item {
    display: flex;
    gap: 16px;
    padding: 5px;
    border-radius: 12px;
    background-color: $background;
    cursor: pointer;
    transition: transform 0.3s;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:active {
      transform: scale(0.98);
    }
  }

  &__item-image {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
  }

  &__item-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__item-name {
    font-weight: 500;
    font-size: 16px;
  }

  &__item-description {
    font-size: 14px;
    color: rgba($text, 0.7);
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }

  &__button {
    position: fixed;
    bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100% - 50px);
    height: 48px;
    border-radius: 30px;
    margin: 0 25px;
    border: none;
    outline: none;
    background-color: $main-color;
    text-shadow: $main-text-shadow;
    color: $white;
    font-size: 20px;
    gap: 5px;
    transition: transform 0.2s ease;
    text-transform: uppercase;

    &:active {
      transform: scale(0.95);
    }

    &-icon {
      width: 25px;
      height: 25px;
    }
  }
}
</style>

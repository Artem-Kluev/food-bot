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
        @blur="toggleBottomBar(true)"
      />
      <BaseSvg class="ui-search__icon" id="search-icon" />
      <button v-if="searchQuery" class="ui-search__clear" @click="clearSearch">
        <BaseSvg id="close-icon" />
      </button>
    </div>

    <div v-if="searchQuery" class="ui-search__overlay" @click.self="closeSearch">
      <div class="ui-search__results">
        <div v-if="loading" class="ui-search__loading">
          <!-- <BaseLottie :path="'/animations/loading.json'" /> -->
        </div>
        <div v-else-if="!searchQuery" class="ui-search__empty">Введіть текст для пошуку</div>
        <div v-else-if="results.length === 0" class="ui-search__empty">Нічого не знайдено</div>
        <div v-else class="ui-search__items">
          <div
            v-for="(item, index) in results"
            :key="index"
            class="ui-search__item"
            @click="selectItem(item)"
          >
            <div class="ui-search__item-image">
              <img :src="item.image" alt="" />
            </div>
            <div class="ui-search__item-content">
              <div class="ui-search__item-name">{{ item.name }}</div>
              <div class="ui-search__item-description">{{ item.description }}</div>
              <!-- <UiPrice :price="item.price" :old-price="item.oldPrice" /> -->
            </div>
          </div>
        </div>
      </div>

      <button class="ui-search__button">
        <BaseSvg class="ui-search__button-icon" id="search-icon" />

        <span>Пошук</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseSvg from '@/components/base/BaseSvg.vue'
import BaseLottie from '@/components/base/BaseLottie.vue'
import UiPrice from '@/components/ui/UiPrice.vue'
import { toggleBottomBar } from '@/composable/useBottomBar'

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
const results = ref<SearchItem[]>([])

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

  // Імітація запиту до API з затримкою
  searchTimeout = setTimeout(() => {
    // Тут буде реальний пошук через API
    // Зараз просто імітуємо результати
    mockSearch(searchQuery.value)
    loading.value = false
  }, 500) as unknown as number
}

function mockSearch(query: string) {
  // Імітація результатів пошуку
  if (query.length > 0) {
    results.value = [
      {
        id: 1,
        name: 'Піца Маргарита',
        description: 'Томатний соус, моцарела, базилік',
        price: 199,
        oldPrice: 249,
        image: '/images/resto/pizza1.jpg',
      },
      {
        id: 2,
        name: 'Піца Пепероні',
        description: 'Томатний соус, моцарела, пепероні',
        price: 229,
        image: '/images/resto/pizza2.jpg',
      },
      {
        id: 3,
        name: 'Суші Філадельфія',
        description: 'Лосось, крем-сир, авокадо, огірок',
        price: 299,
        image: '/images/resto/sushi1.jpg',
      },
    ]
  } else {
    results.value = []
  }
}

function clearSearch() {
  searchQuery.value = ''
  results.value = []
}

function closeSearch() {
  isActive.value = false
}

function selectItem(item: SearchItem) {
  // Тут буде логіка вибору елемента
  console.log('Selected item:', item)
  closeSearch()
}

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
    closeSearch()
  }
}
</script>

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
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    padding: 0;
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

    padding: 80px 0 20px;
    flex-grow: 1;
    overflow-y: auto;
    max-height: 100vh;
  }

  &__loading,
  &__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    color: rgba($text, 0.5);
    font-size: 18px;
  }

  &__loading {
    height: 100px;
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__item {
    display: flex;
    gap: 16px;
    padding: 16px;
    border-radius: 12px;
    background-color: $background;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

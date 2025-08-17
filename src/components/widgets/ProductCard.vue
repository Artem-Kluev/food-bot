<template>
  <div class="product" :class="{ ['product_' + modifier]: modifier === 'resto' }" @click="handleProductClick">
    <div class="product__like">
      <UiLike v-model="isLiked" @click.stop />
    </div>

    <div class="product__image">
      <img :src="slideData.image" alt="product image" />

      <UiRating v-if="slideData.rating" :rating="slideData.rating" class="product__rating" />
      <UiTime v-if="slideData.type === 'resto' && slideData.time" :time="slideData.time" class="product__time" />
      <UiPrice v-if="slideData.type === 'food' && slideData.price" :price="slideData.price" class="product__price" />
    </div>
    <div class="product__info">
      <h3 class="product__name">{{ slideData.title }}</h3>

      <UiCounter v-if="counter" v-model="productCount" class="product__counter" @click.stop />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Resto, Food } from '@/mixins/interfaces'
import UiLike from '@/components/ui/UiLike.vue'
import UiRating from '@/components/ui/UiRating.vue'
import UiTime from '@/components/ui/UiTime.vue'
import UiPrice from '@/components/ui/UiPrice.vue'
import UiCounter from '@/components/ui/UiCounter.vue'
import { toggleRestoBlock } from '@/composable/useRestoBlock'
import { useBasket } from '@/composable/useBasket'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  slideData: Resto | Food
  modifier?: 'resto'
  counter?: boolean
}

const props = defineProps<Props>()

const isLiked = ref(false)
const productCount = ref(0)
const router = useRouter()

const { getProduct, add, remove } = useBasket()

function handleProductClick() {
  if (props.slideData.type === 'resto') {
    toggleRestoBlock(true)
  } else if (props.slideData.type === 'food') {
    // Якщо це продукт і він вже в кошику, перейти до кошика
    // Інакше додати його в кошик
    if (productCount.value > 0) {
      router.push('/basket')
    } else {
      productCount.value = 1 // Це автоматично додасть продукт у кошик через watch
    }
  }
}

onMounted(() => {
  if (props.counter && props.slideData.type === 'food') {
    console.log('Ініціалізація лічильника для продукту:', props.slideData.title)
    const basketProduct = getProduct(props.slideData.id)

    if (basketProduct) {
      console.log('Знайдено продукт в кошику, кількість:', basketProduct.count)
      productCount.value = basketProduct.count
    }
  }
})

watch(productCount, (newCount) => {
  console.log('Зміна кількості продукту:', props.slideData.title, 'нова кількість:', newCount)

  if (!props.counter || props.slideData.type !== 'food') return

  if (newCount > 0) {
    // Перевіряємо наявність необхідних полів
    if (!props.slideData.price?.base) {
      console.warn('Відсутня ціна для продукту:', props.slideData.title)
      return
    }
    
    if (!props.slideData.restoId) {
      console.warn('Відсутній restoId для продукту:', props.slideData.title)
      return
    }
    
    add(
      {
        id: props.slideData.id,
        title: props.slideData.title,
        image: props.slideData.image,
        price: props.slideData.price.base, // Використовуємо price.base без fallback
        restoId: props.slideData.restoId,
      },
      newCount,
    )
  } else {
    remove(props.slideData.id)
  }
})
</script>

<style lang="scss" scoped>
@use '@/assets/styles/vars.scss' as *;

.product {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
  margin-bottom: 30px;
  position: relative;

  &__like {
    position: absolute;
    top: 8px;
    right: 18px;
    z-index: 1;
  }

  &__tag {
    padding: 2px 5px;
    border-radius: 4px;
    font-size: 10px;
    width: fit-content;
    margin-bottom: 5px;
    font-weight: 500;
  }

  &__image {
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__rating {
    position: absolute;
    bottom: 8px;
    right: 8px;
  }

  &__time {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  &__price {
    position: absolute;
    bottom: 8px;
    left: 8px;
  }

  &__tags {
    position: absolute;
    padding: 10px 5px;
    top: 0;
    z-index: 1;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 12px;
  }

  &__counter {
    align-self: flex-start;
    margin-top: 4px;
  }

  &__name {
    font-size: 16px;
    font-weight: 500;
    height: 24px;
    color: $text;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &_resto {
    .product {
      &__image {
        aspect-ratio: 4/2.2;
      }
    }
  }
}
</style>

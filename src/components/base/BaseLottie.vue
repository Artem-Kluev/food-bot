<template>
  <div ref="container" class="base-lottie"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import lottie from 'lottie-web'
import type { AnimationItem } from 'lottie-web'

interface Props {
  src: string
  loop?: boolean
  autoplay?: boolean
  renderer?: 'svg' | 'canvas' | 'html'
  assetsPath?: string
}

const props = defineProps<Props>()

const container = ref<HTMLElement | null>(null)
let animation: AnimationItem | null = null

async function loadAnimation() {
  if (!container.value) return
  if (!props.src || !props.src.endsWith('.json')) {
    console.warn('[BaseLottie] src має бути шляхом до .json файлу')
    return
  }

  // Якщо є assetsPath — завантажуємо JSON, підміняємо шляхи
  if (props.assetsPath) {
    try {
      const response = await fetch(props.src)
      if (!response.ok) throw new Error('Failed to fetch JSON animation')
      const data = await response.json()

      if (data.assets && Array.isArray(data.assets)) {
        data.assets.forEach((asset: any) => {
          asset.u = props.assetsPath
        })
      }

      if (animation) {
        animation.destroy()
        animation = null
      }

      animation = lottie.loadAnimation({
        container: container.value,
        renderer: props.renderer || 'svg',
        loop: props.loop ?? true,
        autoplay: props.autoplay ?? true,
        animationData: data,
      })
    } catch (error) {
      console.error('[BaseLottie] Error loading or parsing animation JSON:', error)
    }
  } else {
    // Якщо assetsPath не заданий — завантажуємо звичайно
    if (animation) {
      animation.destroy()
      animation = null
    }
    animation = lottie.loadAnimation({
      container: container.value,
      renderer: props.renderer || 'svg',
      loop: props.loop ?? true,
      autoplay: props.autoplay ?? true,
      path: props.src,
    })
    animation.addEventListener('data_failed', () => {
      console.error('[BaseLottie] Не вдалося завантажити анімацію за шляхом:', props.src)
    })
  }
}

onMounted(() => {
  loadAnimation()
})

watch(
  () => props.src,
  () => {
    if (animation) {
      animation.destroy()
      animation = null
    }
    loadAnimation()
  },
)

onBeforeUnmount(() => {
  if (animation) {
    animation.destroy()
    animation = null
  }
})
</script>

<style scoped>
.base-lottie {
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>

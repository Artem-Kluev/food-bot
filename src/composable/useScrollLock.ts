import { onUnmounted } from 'vue'

export function useScrollLock() {
  let scrollPosition = 0
  let isLocked = false

  function lockScroll() {
    if (isLocked) return
    
    scrollPosition = window.scrollY
    
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition}px`
    document.body.style.width = '100%'
    
    isLocked = true
  }

  function unlockScroll() {
    if (!isLocked) return
    
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('width')
    
    window.scrollTo(0, scrollPosition)
    
    isLocked = false
  }

  onUnmounted(() => {
    if (isLocked) {
      unlockScroll()
    }
  })

  return {
    lockScroll,
    unlockScroll,
    isLocked: () => isLocked
  }
}
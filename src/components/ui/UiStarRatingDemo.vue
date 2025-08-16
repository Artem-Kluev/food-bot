<script setup lang="ts">
import { ref } from 'vue'
import UiStarRating from './UiStarRating.vue'

const currentRating = ref(4.3)

function updateRating(newRating: number) {
  currentRating.value = newRating
}
</script>

<template>
  <div class="star-rating-demo">
    <h3>Star Rating Demo</h3>
    <p>Current rating: {{ currentRating }}</p>
    
    <div class="rating-container">
      <UiStarRating 
        :rating="currentRating" 
        @update:rating="updateRating"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.star-rating-demo {
  padding: 20px;
  
  h3 {
    margin-bottom: 10px;
  }
  
  p {
    margin-bottom: 15px;
  }
  
  .rating-container {
    display: inline-block;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
}
</style>
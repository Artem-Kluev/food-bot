<script setup lang="ts">
interface Props {
  id: string
}

defineProps<Props>()
</script>

<template>
  <svg>
    <use :href="`#${id}`"></use>
  </svg>
</template>

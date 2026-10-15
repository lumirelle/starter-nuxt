<!-- This is port from https://github.com/npmx-dev/npmx.dev/blob/eafa727d13b1296938fb9f6d1ca0d8899f6bdf93/app/components/OgBrand.vue -->
<!-- With some customize. -->
<!-- Thanks to npmx.dev! -->

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    height?: number
  }>(),
  {
    height: 60,
  },
)

const width = computed(() => props.height)
</script>

<template>
  <img
    src="/1.icon.svg"
    alt="Starter template for Nuxt 4"
    :width="width"
    :height="height"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
</template>

<script setup lang="ts">
const color = useColorMode()
function toggleColorMode(): void {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <a class="i-carbon-sun dark:i-carbon-moon h-[1em] w-[1em] cursor-pointer !outline-none" href="javascript:void(0)" title="Toggle Color Mode" aria-label="Toggle Color Mode" @click="toggleColorMode" />
</template>

<!-- This is port from https://github.com/npmx-dev/npmx.dev/blob/eafa727d13b1296938fb9f6d1ca0d8899f6bdf93/app/components/OgImage/Page.takumi.vue -->
<!-- Thanks to npmx.dev! -->

<script setup lang="ts">
const { title, description } = defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <OgLayout>
    <div class="px-15 py-12 flex flex-col gap-12 h-full justify-center">
      <OgBrand :height="48" />

      <div v-if="title" class="flex flex-col gap-3 max-w-full">
        <div
          class="text-5xl leading-none tracking-tighter font-mono lg:text-7xl"
          :style="{ lineClamp: 1, textOverflow: 'ellipsis' }"
        >
          {{ title }}
        </div>
      </div>

      <div
        v-if="description"
        class="text-3xl pt-3 opacity-70 lg:text-4xl"
        :style="{ lineClamp: 2, textOverflow: 'ellipsis' }"
      >
        {{ description }}
      </div>
    </div>
  </OgLayout>
</template>

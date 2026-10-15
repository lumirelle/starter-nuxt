<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.home.title'),
  ogTitle: () => t('seo.home.title'),
  twitterTitle: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogDescription: () => t('seo.home.description'),
  twitterDescription: () => t('seo.home.description'),
})

const online = useOnline()
const { data: nav } = await useNav()
</script>

<template>
  <main>
    <div>
      <PageView v-if="online" />
      <div v-else text-gray:80>
        {{ t('status.offline') }}
      </div>

      <AppNav v-if="nav?.payload" :items="nav.payload.items" />
    </div>
  </main>
</template>

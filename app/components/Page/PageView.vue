<!-- A component to show how many page views a user has -->

<script setup lang="ts">
const { data: pageView } = await usePageView()
const { t } = useI18n()
const timeAgo = useTimeAgo(() => pageView.value?.payload?.startAt || 0)
</script>

<template>
  <div text="gray:80 center">
    <span text-gray font-500>{{ pageView?.payload?.pageview }}</span>
    {{ t('page.views_since') }}
    <span text-gray>{{ timeAgo }}</span>
  </div>
</template>

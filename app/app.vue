<script lang="ts" setup>
const darkMode = usePreferredDark()
const colorMode = useColorMode()
const colorScheme = computed(() => {
  return {
    system: darkMode ? 'dark light' : 'light dark',
    light: 'only light',
    dark: 'only dark',
  }[colorMode.preference]
})

const { locale } = useI18n()
useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
  meta: [{ name: 'color-scheme', content: colorScheme }],
})

if (import.meta.server)
  setJsonLd(createWebSiteSchema())

defineOgImage('Page.takumi', {}, { alt: 'Starter template for Nuxt 4 — This is a Nuxt 4 application template, built on top of Vite 8.' })
</script>

<template>
  <div min-h-screen>
    <NuxtPwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

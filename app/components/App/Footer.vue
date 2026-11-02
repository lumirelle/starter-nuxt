<!-- Application Footer -->

<template>
  <footer my-5>
    <ul text="xl gray-400" flex gap-3 justify-center>
      <li><NuxtLinkLocale i-carbon-campsite to="index" title="Go Home" aria-label="Go Home" /></li>
      <li>
        <NuxtLink
          i-carbon-logo-github
          to="https://github.com/lumirelle/starter-nuxt"
          external
          title="View on GitHub"
          aria-label="View on GitHub"
        />
      </li>
      <li><ToggleColorMode /></li>
      <li><ToggleLanguage /></li>
    </ul>
    <slot />
  </footer>
</template>

<template>
  <div>
    <!-- In order to support page-level transitions -->
    <!-- We need to ensure the layout has only one root element -->
    <AppHeader />
    <slot />
    <AppFooter>
      <div mx-auto mt-5 text="sm center" opacity-65>
        [Default Layout]
      </div>
    </AppFooter>
  </div>
</template>

<!-- Application Header -->

<template>
  <header my-10>
    <h1 flex justify-center>
      <span flex="~ col" text-2xl children:mx-auto>
        <i i-public-nuxt h-18 w-18 inline-block />
        <span text-green-400 mt--2>Nuxt 4</span>
      </span>
      <span text="3xl gray-400" i-carbon-add mx-4 my-auto transform transition-all-500 hover:rotate-135 />
      <span flex="~ col" text-2xl children:mx-auto>
        <!-- Too keep the consistent icon size with Nuxt logo... -->
        <i i-public-vite m-2 h-14 w-14 inline-block />
        <span text-purple-500 mt--2>Vite 8</span>
      </span>
    </h1>
  </header>
</template>

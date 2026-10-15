const APP_NAME = 'Starter template for Nuxt 4'
const APP_DESCRIPTION = 'This is a Nuxt 4 application template, built on top of Vite 8.'
const APP_URL = 'https://starter-nuxt.lumirelle.me'
const APP_LOCALES = [
  { code: 'en-US', language: 'en-US', name: 'English', file: 'en-US.json' },
  /**
   * For Chinese, it should be expressed with a script subtag instead of a region subtag. So we use `Hans` (for Simplified) and `Hant` (for Traditional) as recommended by BCP 47.
   *
   * @see https://en.wikipedia.org/wiki/IETF_language_tag#ISO_3166-1_and_UN_M.49
   */
  { code: 'zh-Hans', language: 'zh-Hans', name: '简体中文', file: 'zh-Hans.json' },
  // ...
]

export default defineNuxtConfig({
  /// keep-sorted
  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils/module',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    'nuxt-og-image',
  ],

  imports: {
    dirs: ['composables/repository/*'],
  },

  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en-US',
      },
      templateParams: { separator: '·' },
      meta: [
        // `favicon.ico`, `apple-touch-icon.png` are handled by `nuxt-seo-utils`
        // See https://nuxtseo.com/docs/nuxt-seo/guides/using-the-modules#seo-utils
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  css: ['~/assets/styles/main.css'],

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  site: {
    name: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
  },

  colorMode: {
    // Better eyes!
    fallback: 'dark',
    // Use `data-*` to perform custom color mode logic is much better than class (less conflict).
    dataValue: 'theme',
  },

  runtimeConfig: {
    example: {
      secret: undefined,
    },

    public: {
      example: {
        publicSecret: undefined,
      },
    },
  },

  future: {
    compatibilityVersion: 5,
  },

  /**
   * @see https://github.com/nuxt/nuxt/blob/main/packages/schema/src/config/experimental.ts for default values
   */
  experimental: {
    inlineRouteRules: true,
    typedPages: true,
  },

  compatibilityDate: '2026-10-15',

  nitro: {
    externals: {
      /** @see https://nitro.build/config#noexternals */
      inline: [
        'shiki',
        '@shikijs/langs',
        '@shikijs/themes',
        '@shikijs/types',
        '@shikijs/engine-javascript',
        '@shikijs/core',
      ],
    },
  },

  vite: {
    css: {
      transformer: 'lightningcss',
    },
    optimizeDeps: {
      include: [
        '@antfu/utils',
        '@vueuse/core',
      ],
    },
  },

  eslint: {
    config: {
      standalone: false,
      nuxt: { sortConfigKeys: true },
    },
  },

  i18n: {
    locales: APP_LOCALES,
    defaultLocale: 'en-US',
    detectBrowserLanguage: {
      cookieKey: 'locale',
    },
    experimental: {
      typedOptionsAndMessages: 'all',
    },
  },

  image: {
    format: ['avif', 'webp'],
    /**
     * Enable image optimization on external websites.
     *
     * @see https://image.nuxt.com/get-started/configuration#domains
     */
    domains: [
      'images.unsplash.com',
      // ...
    ],
    alias: {
      unsplash: 'https://images.unsplash.com',
      // ...
    },
  },

  pwa: {
    // Disable service worker
    disable: true,
    manifest: {
      name: APP_NAME,
      short_name: APP_NAME,
      description: APP_DESCRIPTION,
      theme_color: '#ffffff',
      icons: [
        { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: 'maskable-icon.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
      ],
    },
  },

  vueuse: {
    ssrHandlers: true,
  },
})

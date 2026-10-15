export const APP_NAME = 'Vitesse for Nuxt 4'
export const APP_DESCRIPTION = 'This is a Nuxt 4 application template, built on top of Vitesse.'
export const APP_THEME_LIGHT_COLOR = 'white'
export const APP_THEME_DARK_COLOR = '#222222'
export const APP_LOCALES = [
  { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
  /**
   * For Chinese, it should be expressed with a script subtag instead of a region subtag. So we use `Hans` (for Simplified) and `Hant` (for Traditional) as recommended by BCP 47.
   *
   * @see https://en.wikipedia.org/wiki/IETF_language_tag#ISO_3166-1_and_UN_M.49
   */
  { code: 'zh', language: 'zh-Hans', name: '简体中文', file: 'zh-Hans.json' },
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
    '@nuxtjs/seo',
    '@unocss/nuxt',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
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
      templateParams: { separator: '·' },
      meta: [
        // `favicon.ico`, `apple-touch-icon.png` are handled by `nuxt-seo-utils`
        // See https://nuxtseo.com/docs/nuxt-seo/guides/using-the-modules#seo-utils
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        // See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/theme-color
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: APP_THEME_LIGHT_COLOR },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: APP_THEME_DARK_COLOR },
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
  },

  colorMode: {
    // Better eyes!
    fallback: 'dark',
  },

  runtimeConfig: {
    EXAMPLE_PRIVATE_CONFIG: undefined,

    public: {
      EXAMPLE_PUBLIC_CONFIG: undefined,
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

  compatibilityDate: '2026-06-20',

  vite: {
    optimizeDeps: {
      include: [
        '@antfu/utils',
        '@unhead/schema-org/vue',
        '@vueuse/core',
      ],
    },
  },

  a11y: {
    axe: {
      options: {
        rules: [
          { id: 'color-contrast', enabled: false },
        ],
      },
      runOptions: {},
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
    defaultLocale: 'en',
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

  robots: {
    blockNonSeoBots: true,
  },

  vueuse: {
    ssrHandlers: true,
  },
})

import type { PresetWind4Theme } from 'unocss'
import type { IconsOptions } from 'unocss/preset-icons'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig<PresetWind4Theme>({
  presets: [
    /**
     * Tailwind CSS v4 only supports modern browsers. If you need to support legacy browsers, please use `presetWind3` instead.
     *
     * @see https://tailwindcss.com/docs/compatibility
     */
    presetWind4(),
    presetAttributify(),
    presetIcons({
      ...presetLocalIcons(),
      extraProperties: {
        'display': 'inline-block',
        'forced-color-adjust': 'preserve-parent-color',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],

  theme: {
    /**
     * Use fonts name directly, `@nuxt/font` will auto resolve the font resources from predefined providers.
     *
     * @see https://fonts.nuxt.com/get-started/usage#unocss
     */
    font: {
      sans: 'DM Sans',
      serif: 'DM Serif Display',
      mono: 'DM Mono',
    },
  },
  shortcuts: [
    // Nuxt & Vite colors
    [/^(bg|text|decoration|border|fill|stroke)-(nuxt|vite)$/, ([, prefix, suffix]) => {
      const color = suffix === 'nuxt' ? 'green-400' : 'purple-500'
      return `${prefix}-${color}`
    }],
    // Vitesse colors, use Nuxt color for normal state, Vite color for hover state, with transition on hover
    [/^(bg|text|decoration|border|fill|stroke)-vitesse$/, ([, prefix]) => {
      return `${prefix}-nuxt hover:${prefix}-vite transition-colors duration-200 ease-in-out`
    }],
    // Vitesse colors with specific states
    [/^(bg|text|decoration|border|fill|stroke)-vitesse-(nuxt|vite)$/, ([, prefix, suffix]) => {
      return `hover:${prefix}-${suffix} transition-colors duration-200 ease-in-out`
    }],
  ],
})

/**
 * Preset for loading local icons from `./public/icons` directory, with width and height transformed to `em` unit for better scaling.
 */
function presetLocalIcons(): IconsOptions {
  return {
    collections: {
      public: FileSystemIconLoader('./public/icons'),
    },
    processor(props, meta) {
      if (meta.collection === 'public') {
        let { width = 1, height = 1 } = props
        if (typeof width === 'string')
          width = Number.parseInt(width)
        if (typeof height === 'string')
          height = Number.parseInt(height)
        const min = Math.min(width, height)
        props.width = `${Math.round((width / min) * 100) / 100}em`
        props.height = `${Math.round((height / min) * 100) / 100}em`
      }
    },
  }
}

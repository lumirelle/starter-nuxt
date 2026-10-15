// @ts-check
import { antfu } from '@antfu/eslint-config'
import oxlint from 'eslint-plugin-oxlint'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    unocss: true,
    toml: {
      overrides: {
        'toml/array-element-newline': ['error', 'consistent'],
        'toml/array-bracket-spacing': ['error', 'never'],
      },
    },
  },
  /** Don't forget to set `standalone: false` in your Nuxt ESLint module options. */
  nuxt(),
  ...oxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
)

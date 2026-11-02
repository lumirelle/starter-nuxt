import type { Options } from '@lumirelle/linter-config'

/**
 * Linter options shared by ESLint and Oxlint.
 *
 * Type-aware linting stays off: Nuxt's root `tsconfig.json` is a solution file (`files: []` plus
 * `references`), and neither Oxlint nor the ESLint `projectService` follows those references, so
 * the program they build misses the generated `.nuxt/**` declarations and every Nuxt auto-import
 * (`$fetch`, `defineEventHandler`, …) resolves to an `error` type. Type checking is `nuxt typecheck`
 * instead, which `hk` runs as its own step.
 */
export const options = {
  vue: true,
  unocss: true,
  oxlint: true,
  ignores: ['.agents/**', '.claude/**'],
  overrides: {
    // Formatting belongs to oxfmt; these template rules disagree with its Vue output.
    // Tracked in https://github.com/lumirelle/linter-config/issues/47.
    vue: {
      rules: {
        'vue/html-closing-bracket-newline': 'off',
        'vue/html-indent': 'off',
        'vue/html-self-closing': 'off',
        'vue/singleline-html-element-content-newline': 'off',
      },
    },
  },
} satisfies Options

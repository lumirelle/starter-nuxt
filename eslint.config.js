// @ts-check
import { eslint } from '@lumirelle/linter-config/eslint'
import nuxt from './.nuxt/eslint.config.mjs'
import { options } from './linter.config.ts'

/** Don't forget to set `standalone: false` in your Nuxt ESLint module options. */
export default eslint(options).append(nuxt())

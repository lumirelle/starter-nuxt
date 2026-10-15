import { defineVitestProject } from '@nuxt/test-utils/config'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

// @ts-expect-error TODO: Type error.
const rootDir = import.meta.dirname

export default defineConfig({
  resolve: {
    alias: {
      '~': `${rootDir}/app`,
      '~~': rootDir,
      '#shared': `${rootDir}/shared`,
      '#server': `${rootDir}/server`,
    },
  },
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['./test/unit/*.{test,spec}.ts'],
          benchmark: { include: ['./test/unit/*.{bench,benchmark}.ts'] },
          environment: 'node',
        },
      },
      () => defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['./test/nuxt/*.{test,spec}.ts'],
          benchmark: { include: ['./test/nuxt/*.{bench,benchmark}.ts'] },
          environment: 'nuxt',
          /** @see https://github.com/npmx-dev/npmx.dev/blob/main/vite.config.ts#L235 */
          environmentOptions: {
            nuxt: {
              rootDir,
              overrides: {
                vue: {
                  runtimeCompiler: true,
                },
                experimental: {
                  payloadExtraction: false,
                  viteEnvironmentApi: false,
                },
                ogImage: false,
              },
            },
          },
          browser: {
            enabled: true,
            // @ts-expect-error TODO: Type error.
            provider: playwright(),
            instances: [{ browser: 'chromium', headless: true }],
          },
        },
      }),
      {
        test: {
          name: 'e2e',
          include: ['./test/e2e/*.{test,spec}.ts'],
          benchmark: {
            include: ['./test/e2e/*.{bench,benchmark}.ts'],
          },
          testTimeout: 120_000,
          environment: 'node',
          /** @see https://github.com/npmx-dev/npmx.dev/blob/main/playwright.config.ts#L30 */
          environmentOptions: {
            nuxt: {
              rootDir,
            },
          },
        },
      },
    ],
    coverage: {
      enabled: true,
      exclude: ['**/node_modules/**', '**/*.json'],
    },
  },
})

/**
 * Middlewares are used to apply extra logic before route changes, to apply logic after route changes, please use router plugins instead.
 *
 * @see [save-user-source.client.ts](../plugins/save-user-source.client.ts)
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // oxlint-disable-next-line no-console
  console.log(
    '%c🐕 track\n\n%cyou are navigating from',
    'font: bold 20px system-ui, sans-serif; color: oklch(0.79 0.17 70.66); padding-top: 12px;',
    'font: 16px system-ui, sans-serif; padding-bottom: 12px;',
    from.fullPath,
    'to ',
    to.fullPath,
    '.',
  )
})

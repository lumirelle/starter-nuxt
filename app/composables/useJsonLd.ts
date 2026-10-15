import type { Thing, WebSite, WithContext } from 'schema-dts'

/**
 * Inject JSON-LD script into head
 */
export function setJsonLd(schema: WithContext<Thing> | WithContext<Thing>[]): void {
  const schemas = Array.isArray(schema) ? schema : [schema]

  useHead({
    script: schemas.map((s, i) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(s),
      key: `json-ld-${i}`,
    })),
  })
}

/**
 * Create WebSite schema with search action
 */
export function createWebSiteSchema(options?: {
  name?: string
  description?: string
}): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': options?.name ?? 'Starter template for Nuxt 4',
    'url': 'https://starter-nuxt.lumirelle.me',
    'description': options?.description ?? 'This is a Nuxt 4 application template, built on top of Vite 8.',
  }
}

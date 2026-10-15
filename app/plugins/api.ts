/**
 * A custom `$fetch` with additional controls, to avoid repeating the same logic in every API call.
 *
 * 1. Custom `baseURL` for convenience;
 * 2. Manipulate headers (e.g. forward headers from incoming request for server-side requests, and add additional headers like token and locale for both server-side and client-side requests);
 * 3. Error handling (e.g. redirect to login page when user doesn't login or token expires).
 *
 * Provided via:
 * 1. `globalThis.$api`;
 * 2. `nuxtApp.$api`.
 *
 * @see https://nuxt.com/docs/4.x/guide/recipes/custom-usefetch#recipe-custom-fetch-instance
 */
import type { ExtractedRouteMethod, InternalApi, NitroFetchOptions, TypedInternalResponse } from 'nitropack'
import type { FetchRequest } from 'ofetch'

const BASE_URL = '/api'

// Type internal API keys by trimming the prefix based on the `BASE_URL`
type BaseUrl = typeof BASE_URL
type TrimLeft<S extends string, C extends string> = S extends `${C}${infer R}` ? TrimLeft<R, C> : S
type InternalApiKeys = Exclude<keyof InternalApi, `/_${string}` | `${BaseUrl}/_${string}`>
type TrimmedInternalApiKeys = TrimLeft<InternalApiKeys, `${BaseUrl}`>
/** A map from trimmed internal API keys to their full paths */
type TrimmedInternalApiKeysMap = {
  [K in TrimmedInternalApiKeys]: Extract<InternalApiKeys, `${K}` | `${BaseUrl}${K}`>
}
export type ApiNitroFetchRequest = TrimmedInternalApiKeys | Exclude<FetchRequest, string> | (string & {})
type Base$Fetch<
  DefaultT = unknown,
  DefaultR extends ApiNitroFetchRequest = ApiNitroFetchRequest,
> = <
  T = DefaultT,
  R extends ApiNitroFetchRequest = DefaultR,
  O extends NitroFetchOptions<R> = NitroFetchOptions<R>,
  MappedR = R extends keyof TrimmedInternalApiKeysMap ? TrimmedInternalApiKeysMap[R] : R,
>(
  request: R,
  opts?: O,
) => Promise<
  TypedInternalResponse<MappedR, T, NitroFetchOptions<R> extends O ? 'get' : ExtractedRouteMethod<R, O>>
>
export type $Api<T = unknown, R extends ApiNitroFetchRequest = ApiNitroFetchRequest> = Base$Fetch<T, R> & {
  raw: never
  create: never
}

// Type context
declare module '#app' {
  interface NuxtApp {
    $api: $Api<unknown, ApiNitroFetchRequest>
  }
}
declare module 'vue' {
  interface ComponentCustomProperties {
    $api: $Api<unknown, ApiNitroFetchRequest>
  }
}
declare global {
  var $api: $Api<unknown, ApiNitroFetchRequest>
}

export default defineNuxtPlugin({
  // Make plugin who is standlone loading parallel, to gain better performance.
  parallel: true,
  setup(nuxtApp) {
  // @ts-expect-error TODO: Type error
    const api = $fetch.create<unknown, ApiNitroFetchRequest>({
    // Custom `baseURL` for convenience
      baseURL: BASE_URL,

      // Manipulate headers
      onRequest({ options }) {
        const locale = useCookie('locale', { default: () => 'en' }).value
        const token = useCookie('token').value
        const requestHeaders = useRequestHeaders()
        // For server-side requests, forward the headers from the incoming request.
        if (import.meta.server) {
          for (const [key, value] of Object.entries(requestHeaders)) {
            options.headers.set(key, value)
          }
        }
        // Additional headers for both server-side and client-side requests
        options.headers.set('Language', locale)
        if (token) {
          options.headers.set('X-Token', token)
        }
      },

      // Error handling
      onRequestError({ error }) {
        console.error('Request error:', error)
      },
      async onResponseError({ response }) {
        switch (response.status) {
          case 401:
          case 403:
            console.error('User has not login!')
            await nuxtApp.runWithContext(async () => await navigateTo('/'))
            break
          default:
            console.error('Response error:', response.status, response.statusText)
        }
      },
    })

    // Provide via globalThis
    globalThis.$api = api as unknown as $Api<unknown, ApiNitroFetchRequest>

    // Provide via Nuxt plugin context
    return {
      provide: {
        api,
      },
    }
  },
})

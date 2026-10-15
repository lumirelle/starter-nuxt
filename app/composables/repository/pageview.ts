export function usePageviewRepository() {
  return {
    get: async () => {
      try {
        return await $fetch('/api/v1/pageview')
      }
      catch (e) {
        console.error('Fetching pageview failurei.\n\n', e)
      }
    },
  }
}

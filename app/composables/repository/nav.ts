export function useNavRepository() {
  return {
    get: async () => {
      try {
        return await $fetch('/api/v1/nav')
      }
      catch (e) {
        console.error('Fetching nav failure.\n\n', e)
      }
    },

  }
}

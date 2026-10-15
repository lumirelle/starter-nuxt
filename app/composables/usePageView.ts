export function usePageView() {
  const pageviewRepository = usePageviewRepository()
  return useAsyncData('pageview', pageviewRepository.get)
}

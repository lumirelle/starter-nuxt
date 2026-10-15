export function useNav() {
  const navRepository = useNavRepository()
  return useAsyncData('nav', navRepository.get)
}

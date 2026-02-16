import { isClientSide } from '@/utils/is-client-side'

const STORAGE_PREFIX = 'compose'

export function useStorage<T>(key: string) {
  const storageKey = `${STORAGE_PREFIX}:${key}`

  function get(): T | undefined {
    if (!isClientSide()) return
    const raw = window.localStorage.getItem(storageKey)
    if (raw) {
      try {
        return JSON.parse(raw) as T
      } catch (error) {
        console.error(`Failed to parse storage key "${storageKey}"`, error)
      }
    }
  }

  function set(value: T) {
    if (!isClientSide()) return
    window.localStorage.setItem(storageKey, JSON.stringify(value))
  }

  function remove() {
    if (!isClientSide()) return
    window.localStorage.removeItem(storageKey)
  }

  return { get, set, remove }
}

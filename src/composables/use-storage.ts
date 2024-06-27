import { YTheme } from '@/types/theme'
import { isClientSide } from '@/utils/is-client-side'

enum StorageKeys {
  yTheme = 'y-theme',
}

// interface Storage {
//   [StorageKeys.yTheme]: YTheme
// }

export function useStorage() {
  function getStorageTheme(): YTheme | undefined {
    if (isClientSide()) {
      const storedTheme = window.localStorage.getItem(StorageKeys.yTheme)

      if (storedTheme) {
        try {
          return JSON.parse(storedTheme)
        } catch (error) {
          console.error('Failed to parse theme from localStorage', error)
        }
      }
    }
  }

  function setStorageTheme(theme: YTheme) {
    window.localStorage.setItem(StorageKeys.yTheme, JSON.stringify(theme))
  }

  return { getStorageTheme, setStorageTheme }
}

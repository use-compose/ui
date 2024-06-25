export interface ColorTheme {
  [key: string]: string
}

export function useComposeTheme() {
  function getPrimary() {
    return getComputedStyle(document.documentElement).getPropertyValue('--primary')
  }

  function setPrimary(color: string) {
    document.documentElement.style.setProperty('--primary', color)
  }

  function getBackground() {
    return getComputedStyle(document.documentElement).getPropertyValue('--color-bg')
  }

  function setBackground(color: string) {
    document.documentElement.style.setProperty('--color-bg', color)
  }

  function composeTheme(values: ColorTheme[]) {
    values.forEach((value) => {
      Object.keys(value).forEach((key) => {
        document.documentElement.style.setProperty(`--${key}`, value[key])
      })
    })
  }

  return { getPrimary, setPrimary, getBackground, setBackground, composeTheme }
}

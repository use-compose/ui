export interface ColorTheme {
  [key: string]: string
}

export interface ComposeTheme {
  primary: '--primary'
  background: '--color-bg'
}

export const composeTheme: ComposeTheme = {
  primary: '--primary',
  background: '--color-bg',
}

export function useComposeTheme() {
  function getPrimary() {
    // return isClientSide()
    //   ? getComputedStyle(document.documentElement).getPropertyValue('--primary')
    //   : ''
    return getComputedStyle(document.documentElement).getPropertyValue('--primary')
  }

  function setPrimary(color: string) {
    document.documentElement.style.setProperty('--primary', color)
  }

  function getBackground() {
    // return isClientSide()
    //   ? getComputedStyle(document.documentElement).getPropertyValue('--color-bg')
    //   : ''
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

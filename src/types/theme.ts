export enum Theme {
  primary = '--color-primary',
  secondary = '--color-secondary',
  background = '--color-bg',
  dark = '--color-main-dark',
  danger = '--color-danger',
}

export interface YTheme {
  primary?: string
  secondary?: string
  background?: string
  dark?: string
  danger?: string
}

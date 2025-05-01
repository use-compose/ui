// import { Wrapper } from './components'

// export { Wrapper }
// import './assets/scss/main.scss'

// import { Wrapper, YButton, YInput, Container, Flex, Card, Highlighted } from './components'

// Composables
export { useComposeTheme, useTheme } from './composables'

export {
  AppCompose,
  // ModalProvider,
  Wrapper,
  // YBaseModal,
  YButton,
  YCard,
  // Container,
  YFlex,
  YInput,
} from './components'

export { Theme } from './types/theme'
export type { YTheme } from './types/theme'

export function helloAnqsdqsdqsdqsqsdything(thing: string): string {
  return `Helloo ${thing}!`
}

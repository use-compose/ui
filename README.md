# Compose UI

Unopinionated personal UI components library, that uses a mix of SCSS, runtime CSS Custom Properties and (less possible) JavaScript to allow dynamic theming and runtime color changes.

Vue 3 / Vite components Library using CSS Custom Properties and OKlch color space, allowing dynamic theming and runtime color changes.

- Unopinionated
- Aim to use more CSS/SCSS and less JavaScript
- Uses OKlch color space ([OKLCH](https://www.w3.org/TR/css-color-4/#oklch-notation) - https://www.w3.org/TR/css-color-4/#oklch-notation) - using each channel to control different aspects of the color (lightness, chroma, hue) as each of them is represented by a color, a variant and a state.
- The interest is that everything is derivated from just one color at first, but it aims to be also usable with a predefined set of color in a Design System

## Installation

```bash
npm install
```

Start playground

```bash
npm run dev
```

## Storybook - [Link](https://compose-ui.arthurplazanet.com/)

Start locally

```bash
npm run storybook
```

## Run style-dictionary - [Link](https://github.com/use-compose/compose-ui/tree/dev/style-dictionary)

```bash
npm run build:style
```

## Assets - [Link](https://github.com/use-compose/compose-ui/tree/dev/src/assets)

## Usage

1. Import the type `YTheme` to define your theme

```vue
<script setup lang="ts">
import type { YTheme } from 'compose-ui'

// The format of the color can be any valid CSS color value, such as hex, rgb, rgba, hsl, hsla, or named colors.
const theme: YTheme = {
  primary: '#6F53DB',
  secondary: '#5942AF',
  background: '#f5f5f5',
  dark: '#0b0c0c',
  danger: '#96524a',
}

// You can also save the theme in a reactive variable, such as `useCookie` if you're using Nuxt

// TODO: verify if needed 2 steps
const theme: YTheme | undefined = useCookie<{ primary: string; background: string; dark: string }>(
  'theme',
)
const myTheme = theme.value
  ? theme.value
  : { primary: '#000', background: '#ABCDF8', dark: '#0b0c0c' }
</script>
```

2. Import the `AppCompose` component in the root of your app

```vue
<template>
  <AppCompose :theme="myTheme">
    <!-- Your app content goes here -->
  </AppCompose>
</template>

<script setup lang="ts">
import { AppCompose } from 'compose-ui'
</script>
```

3. Use and access the theme with the `useTheme` composable later anywhere in your app

```vue
<script setup lang="ts">
import { useTheme } from 'compose-ui'

const { theme, setPrimary, setBackground } = useTheme()
</script>
```

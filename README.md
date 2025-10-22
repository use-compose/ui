# Compose UI

![NPM Package Version](https://img.shields.io/npm/v/@use-compose/ui?color=e3c567)

<img align="left" width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/f492ff1b-02cc-4de9-89a6-7c9086f4f189" />

Unopinionated UI components library, that uses a mix of SCSS, runtime CSS Custom Properties and (less possible) JavaScript to allow dynamic theming and runtime color changes.

Vue 3 / Vite components Library using CSS Custom Properties tricks and OKlch color space, allowing dynamic theming and runtime theme changes.

> [!IMPORTANT]
> TODO: SCSS is still used with a heavy old setup, but the goal is to move to a more native CSS based approach

- Customizable and dynamic theming that you can generate and extends
- More CSS and less JavaScript
- Uses OKlch color space ([OKLCH](https://www.w3.org/TR/css-color-4/#oklch-notation) - https://www.w3.org/TR/css-color-4/#oklch-notation) mixing 3 main tokens (background, text color and border color) with 3 customizables variants:

  - color: primary, secondary, dark, light, danger
    - Will focus on all 3 tokens
  - variant: (mismatch name TODO:): contained, outlined, text
    - Will focus specific CSS rules for each variant
  - states: hover, active, focus, disabled
    - Will focus on setting the lightness

- The interest is that everything is derivated from just one color at first, but it aims to be also usable with a predefined set of color in a Design System

See [the style-dictionary used](https://github.com/use-compose/ui/blob/b738ba305ed63b90fa1445141a13e959587da462/style-dictionary) to generate the CSS variables and the CSS files.

## Try locally

Start playground

```bash
npm run dev
```

## Storybook - [Link](https://ui.arthurplazanet.com/)

<!-- TODO: -->

Start locally

```bash
npm run storybook
```

## Run style-dictionary - [Link](https://github.com/use-compose/ui/tree/dev/style-dictionary)

```bash
npm run build:style
```

## Assets - [Link](https://github.com/use-compose/ui/tree/dev/src/assets)

## Getting started

Installation

```bash
npm install @use-compose/ui
```

### Basic Usage

1. Import the type `YTheme` to define your theme

```vue
<script setup lang="ts">
import type { YTheme } from '@use-compose/ui'

// The format of the color can be any valid CSS color value, such as hex, rgb, rgba, hsl, hsla, or named colors.
const theme: YTheme = {
  primary: '#6F53DB',
  secondary: '#5942AF',
  background: '#f5f5f5',
  dark: '#0b0c0c',
  danger: '#96524a',
  text: '#000',
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
import { AppCompose } from '@use-Components/ui'
</script>
```

3. Use and access the theme with the `useTheme` composable later anywhere in your app

```vue
<script setup lang="ts">
import { useTheme } from 'ui'

const { theme, setPrimary, setBackground } = useTheme()
</script>
```

### CSS Customization

### Commands

Generate public theme CSS variables

```bash
use-compose generate:theme
```

TODO: private/public theme etc.

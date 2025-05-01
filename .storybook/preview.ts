import type { Preview } from '@storybook/vue3'
import { AppCompose, Wrapper, YTheme } from '../src'

// import '../src/assets/css/theme/color/color.css'
// import '../src/assets/css/theme/component/component.css'
// import './storybook.scss'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    tags: ['autodocs'],
  },
  decorators: [
    (story) => ({
      components: { story, AppCompose, Wrapper },
      template: `
        <AppCompose :theme="theme">
            <story />
        </AppCompose>`,
      setup() {
        const theme: YTheme = { primary: 'hsl(45, 69%, 65%)', background: 'hsl(0, 0%, 19%)', dark: '#0b0c0c', secondary: 'blue' }

        console.log('📟 - file: preview.ts:35 - theme → ', theme)

        return { theme }
      },
    }),
  ],
}

export default preview

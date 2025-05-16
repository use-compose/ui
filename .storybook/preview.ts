import type { Preview } from '@storybook/vue3'
import { AppCompose, Wrapper, YTheme } from '../src'

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
        const theme: YTheme = {
          primary: '#e3c568',
          secondary: '#353739',
          background: '#f5f5f5',
          dark: '#0b0c0c',
          danger: '#96524a',
        }

        return { theme }
      },
    }),
  ],
}

export default preview

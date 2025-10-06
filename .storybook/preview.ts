import type { Preview } from '@storybook/vue3-vite'
import { AppCompose, Wrapper, type YTheme } from '../src'

const theme: YTheme = {
  primary: '#e3c567',
  secondary: '#5942AF',
  background: '#f5f5f5',
  dark: '#0b0c0c',
  danger: '#96524a',
}

const preview: Preview = {
  parameters: {
    layout: 'centered',
    // actions: { argTypesRegex: '^on[A-Z].*' },
    // controls: {
    //   matchers: {
    //     color: /(background|color)$/i,
    //     date: /Date$/i,
    //   },
    // },
    // tags: ['autodocs'],
  },
  decorators: [
    (story) => ({
      components: { story, AppCompose, Wrapper },
      template: `
        <AppCompose :theme="theme">
          <Wrapper> 
            <story />
          </Wrapper> 
        </AppCompose>
        `,

      setup() {
        return {
          theme,
        }
      },
    }),
  ],
}

export default preview

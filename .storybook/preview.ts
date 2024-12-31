import type { Preview } from '@storybook/vue3'
import { AppCompose, useTheme, Wrapper } from '../src'

import './storybook.css'

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
        const { theme, setPrimary } = useTheme()

        setPrimary('#e3c567')

        console.log('📟 - file: preview.ts:35 - theme → ', theme)

        return { theme }
      },
    }),
  ],
}

export default preview

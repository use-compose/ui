import type { Preview } from '@storybook/vue3-vite'
import { AppCompose, Wrapper, type YTheme } from '../src'
import { ComponentDocs } from './components/ComponentDocs'
// Supports weights 100-900
import '@fontsource-variable/roboto'

const theme: YTheme = {
  primary: '#e3c567',
  secondary: '#5942AF',
  background: '#f5f5f5',
  dark: '#0b0c0c',
  danger: '#96524a',
  text: '#0b0c0c',
}

const preview: Preview = {
  parameters: {
    componentDocs: {
      title: '',
      description: '',
    },
  },
  decorators: [
    (story, context) => ({
      components: { story, AppCompose, Wrapper, ComponentDocs },
      template: `
        <AppCompose :theme="theme">
          <ComponentDocs>
            <template v-if="title" #title>
              <h3>{{ title }}</h3>
            </template>
            <template v-if="description" #description>
              <p>{{ description }}</p>
            </template>
            <story />
          </ComponentDocs>
        </AppCompose>
      `,

      setup() {
        return {
          theme,
          title: context.parameters.componentDocs?.title ?? '',
          description: context.parameters.componentDocs?.description ?? '',
        }
      },
    }),
  ],
}

export default preview

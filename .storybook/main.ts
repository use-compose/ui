import type { StorybookConfig } from '@storybook/vue3-vite'
import path from 'path'
import { fileURLToPath } from 'url'
import { mergeConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    './components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links', // '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-designs',
    '@storybook/addon-a11y',
    // 'storybook-addon-pseudo-states',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
    },
  },
  docs: {},
  async viteFinal(config) {
    return mergeConfig(config, {
      // css: {
      //   postcss: null,
      //   preprocessorOptions: {
      //     css: {
      //       additionalData: `
      //         @use "@/assets/css/global.css";
      //       `,
      //     },
      //     // SCSS syntax
      //     //
      //     scss: {
      //       additionalData: `
      //         @use "@/assets/scss/index.scss";
      //       `,
      //     },
      //   },
      // },
      // // TODO: doesn't work?
      resolve: {
        alias: [
          // storybook components alias (specific to avoid conflict with storybook/internal)
          { find: 'storybook/components', replacement: path.resolve(__dirname, './components') },

          // put the most specific first
          { find: '~/composables', replacement: path.resolve(__dirname, '../src/composables') },
          { find: '~/components', replacement: path.resolve(__dirname, '../src/components') },

          // then the broad ones
          { find: '~', replacement: path.resolve(__dirname, '../src') },
          { find: '@', replacement: path.resolve(__dirname, '../src') },
        ],
      },
    })
  },
}
export default config

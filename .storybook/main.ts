import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      // css: {
      //   postcss: null,
      //   preprocessorOptions: {
      //     scss: {
      //       additionalData: `
      //         @import "${path.resolve(__dirname, '../src/assets/scss/theme')}";
      //       `,
      //     },
      //   },
      // },
      // // TODO: doesn't work?
      // resolve: {
      //   alias: [
      //     { find: '@', replacement: path.resolve(__dirname, './src') },
      //     { find: '@/composables', replacement: path.resolve(__dirname, '.src/composables') },
      //   ],
      // },
    })
  },
}
export default config

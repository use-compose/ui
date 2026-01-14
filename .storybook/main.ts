import type { StorybookConfig } from '@storybook/vue3-vite'
import { StoriesEntry } from 'storybook/internal/types'
// https://uxdesign.cc/how-to-connect-storybook-figma-toppling-the-great-divide-6c1923182653

async function findStories(): Promise<StoriesEntry[]> {
  // your custom logic returns a list of files
  return ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)']
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // stories: async (list: StoriesEntry[]) => {
  //   // https://storybook.js.org/docs/configure#with-a-custom-implementation
  //   // eslint-disable-next-line no-console
  //   console.log('📟 - list → ', list)
  //   return [
  //     // 👇 Add your found stories to the existing list of story files
  //     ...(await findStories()),
  //   ]
  // },
  addons: [
    '@storybook/addon-links',
    // '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-designs',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
    },
  },
  docs: {},
  // async viteFinal(config) {
  //   return mergeConfig(config, {
  //     css: {
  //       postcss: null,
  //       preprocessorOptions: {
  //         css: {
  //           additionalData: `
  //             @use "@/assets/css/global.css";
  //           `,
  //         },
  //         // SCSS syntax
  //         //
  //         scss: {
  //           additionalData: `
  //             @use "@/assets/scss/index.scss";
  //           `,
  //         },
  //       },
  //     },
  //     // TODO: doesn't work?
  //     resolve: {
  //       alias: [
  //         { find: '@', replacement: path.resolve(__dirname, './src') },
  //         { find: '@/composables', replacement: path.resolve(__dirname, '.src/composables') },
  //       ],
  //     },
  //   })
  // },
}
export default config

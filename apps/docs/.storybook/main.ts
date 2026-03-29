import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import path from 'path'
import { fileURLToPath } from 'url'
import { mergeConfig, type PluginOption } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const uiSrc = path.resolve(__dirname, '../../../packages/ui/src')

const config: StorybookConfig = {
  stories: [
    '../../../packages/ui/src/**/*.mdx',
    '../../../packages/ui/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
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
    // Ensure Vue plugin is present (pnpm may prevent the framework from resolving it)
    const plugins = (config.plugins || []).flat() as PluginOption[]
    const hasVuePlugin = plugins.some(
      (p) => p && typeof p === 'object' && 'name' in p && p.name === 'vite:vue',
    )
    if (!hasVuePlugin) {
      config.plugins = [...(config.plugins || []), vue()]
    }

    return mergeConfig(config, {
      resolve: {
        alias: [
          // storybook components alias (specific to avoid conflict with storybook/internal)
          { find: 'storybook/components', replacement: path.resolve(__dirname, './components') },

          // @use-compose/ui -> source for dev
          { find: '@use-compose/ui', replacement: uiSrc },

          // put the most specific first
          { find: '~/composables', replacement: path.resolve(uiSrc, 'composables') },
          { find: '~/components', replacement: path.resolve(uiSrc, 'components') },

          // then the broad ones
          { find: '~', replacement: uiSrc },
          { find: '@', replacement: uiSrc },

          // unholy-tokens aliases
          {
            find: 'unholy-tokens/css-var',
            replacement: path.resolve(uiSrc, 'assets/css/themes/tokens/token-css-vars.ts'),
          },
          {
            find: 'unholy-tokens/types',
            replacement: path.resolve(uiSrc, 'assets/css/themes/tokens/tokens.types.ts'),
          },
          {
            find: 'unholy-tokens',
            replacement: path.resolve(uiSrc, 'assets/css/themes/tokens/tokens.tree.ts'),
          },
        ],
      },
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `
              @use "${uiSrc}/assets/scss/global.scss";
            `,
          },
        },
        transformer: 'lightningcss',
        lightningcss: {
          targets: browserslistToTargets(browserslist('>= 0.25%')),
        },
      },
    })
  },
}
export default config

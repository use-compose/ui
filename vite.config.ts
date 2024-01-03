import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

import EsLint from 'vite-plugin-linter'
const { EsLinter, linterPlugin, TypeScriptLinter } = EsLint

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    vue(),
    linterPlugin({
      include: ['./src/**/*.ts', './src/**/*.tsx'],
      linters: [new EsLinter({ configEnv: configEnv }), new TypeScriptLinter()],
    }),

    dts({
      include: ['lib'],
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'GammaCompose',
      // the proper extensions will be added
      fileName: 'gamma-compose',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
}))

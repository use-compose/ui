import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// Other imports as needed

const pathSrc = resolve(__dirname, './src')

const config = defineConfig((configEnv) => {
  const viteConfig = {
    plugins: [
      vue(),
      // Other plugins
    ],
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@use '${pathSrc}/assets/scss/variables.scss';`,
    //     },
    //   },
    // },
    build: {
      copyPublicDir: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'gamma-compose',
        fileName: 'gamma-compose',
        formats: ['es', 'cjs', 'umd'],
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
    // Other config options
  }

  // Now you can log the whole config or specific parts of it
  console.log(viteConfig)
  // Or, if you want to log a specific part
  // console.log(viteConfig.css.preprocessorOptions.scss)

  // Return the config object
  return viteConfig
})

export default config

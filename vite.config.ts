import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'url'

const pathSrc = resolve(__dirname, './src')

export default defineConfig((configEnv) => {
  const viteConfig = {
    plugins: [vue()],
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src/', import.meta.url)) },
        { find: '../../../', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      ],
    },
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
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
             @import "@/assets/scss/theme.scss";
          `,
        },
      },
    },
  }

  console.log(viteConfig)

  return viteConfig
})

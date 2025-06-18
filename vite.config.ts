import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// const pathSrc = resolve(__dirname, './src')

export default defineConfig(() => {
  const viteConfig = {
    plugins: [
      vue(),
      dts({
        // rollupTypes: true,
      }),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src/', import.meta.url)) },
        { find: '../../../', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      ],
    },
    build: {
      copyPublicDir: false,
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
        esmExternals: true,
      },
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'gamma-compose',
        fileName: (format) => {
          if (format === 'es') return 'index.mjs'
          if (format === 'cjs') return 'index.cjs'
          return `index.${format}.js`
        },
        formats: ['es', 'cjs'],
      },
      // manifest: true,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
        // input: './index.html',
      },
    },
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `
            //  @use "@/assets/css/global.css";
          `,
        },
        scss: {
          additionalData: `
              @use "@/assets/scss/index.scss";
          `,
          // https://github.com/sass/dart-sass/issues/2352#issuecomment-2358290696
          api: 'modern',
        },
      },
    },
  }

  return viteConfig
})

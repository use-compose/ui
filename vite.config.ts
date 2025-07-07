import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// const pathSrc = resolve(__dirname, './src')

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: './src',
      tsconfigPath: path.join(__dirname, './tsconfig.json'),
      include: ['./src/**/*'],
      outDir: './dist',
      rollupTypes: true,
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
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@use-compose/ui',
      fileName: 'index',
      formats: ['es'], // optionally also 'cjs' if you want CJS support
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        entryFileNames: `index.mjs`,
        // optional: preserve modules for tree-shaking
        preserveModules: false,
      },
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
})

import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// const pathSrc = resolve(__dirname, './src')

export default defineConfig({
  plugins: [
    vue(),
    dts({
      entryRoot: './src',
      tsconfigPath: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
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
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: '@use-compose/ui',
      fileName: 'index',
      // formats: ['es'], // optionally also 'cjs' if you want CJS support
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        // entryFileNames: `index.js`,
        // optional: preserve modules for tree-shaking
        // preserveModules: false,
      },
    },
  },
  css: {
    preprocessorOptions: {
      // css: {
      //   additionalData: `
      //        @use "@/assets/css/global.css";
      //     `,
      // },
      scss: {
        additionalData: `
              @use "@/assets/scss/global.scss";
              
          `,
        // https://github.com/sass/dart-sass/issues/2352#issuecomment-2358290696
        api: 'modern',
      },
    },
  },
})

import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

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
  build: {
    outDir: './dist',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: '@use-compose/tiptap',
      fileName: (format) => {
        if (format === 'es') return 'index.mjs'
        if (format === 'cjs') return 'index.js'
        return `index.${format}.js`
      },
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@use-compose/ui', /^@tiptap\//],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})

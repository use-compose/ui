import vue from '@vitejs/plugin-vue'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import vueDevTools from 'vite-plugin-vue-devtools'

// const pathSrc = resolve(__dirname, './src')

export default defineConfig(({ mode }) => {
  const isStorybook =
    mode === 'storybook' ||
    process.env.STORYBOOK === 'true' ||
    process.env.npm_lifecycle_event?.includes('storybook')
  return {
    plugins: [
      vue(),
      dts({
        entryRoot: './src',
        tsconfigPath: fileURLToPath(new URL('./tsconfig.json', import.meta.url)),
        include: ['./src/**/*'],
        outDir: './dist',
        rollupTypes: true,
      }),
      !isStorybook &&
        vueDevTools({
          launchEditor: 'code',
          componentInspector: true,
        }),
    ],
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('./src/', import.meta.url)) },
        { find: '../../../', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      ],
    },
    // publicDir: 'public',
    build: {
      // copyPublicDir: false,
      outDir: './dist',
      emptyOutDir: true,
      reportCompressedSize: true,
      lib: {
        entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        name: '@use-compose/ui',
        fileName: (format) => {
          if (format === 'es') return 'index.mjs'
          if (format === 'cjs') return 'index.js'
          return `index.${format}.js`
        },
        formats: ['es', 'cjs'],

        // Naming of CSS file Vite v6
        //https://v6.vite.dev/config/build-options.html#build-lib
        cssFileName: 'style',

        // formats: ['es'], // optionally also 'cjs' if you want CJS support
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
          assetFileNames: 'assets/[name][extname]',
          // entryFileNames: `index.js`,
          // optional: preserve modules for tree-shaking
          // preserveModules: false,
        },
      },
      cssMinify: 'lightningcss',
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
          // api: 'modern',
        },
      },
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist('>= 0.25%')),
      },
    },
    assetsInclude: [
      '**/*.OTF',
      '**/*.ttf',
      '**/*.woff',
      '**/*.woff2',
      'fonts/*',
      'assets/fonts/*',
      '**/fonts/*',
    ],
    // publicDir: 'assets',
  }
})

import StyleDictionary from 'style-dictionary'
import { formats, transformGroups } from 'style-dictionary/enums'
import tinycolor from 'tinycolor2'
import { filterBuildTimeSCSS } from './style-dictionary/filters/filter-build-time-scss.js'
import { themeTypesFormatter } from './style-dictionary/formatters/theme-types.js'
import { componentStatesTransform } from './style-dictionary/transforms/component-states.js'

StyleDictionary.registerFilter(filterBuildTimeSCSS)

StyleDictionary.registerFormat(themeTypesFormatter)
StyleDictionary.registerTransform(componentStatesTransform)

const tt = ['hue', 'saturation', 'lightness']

tt.forEach((channel, i) => {
  StyleDictionary.registerTransform({
    name: `color/${channel}`,
    type: 'value',
    filter: (token) => {
      return token.attributes.type === 'primary-hsl' && token.attributes.item === channel
    },
    transform: (token) => {
      const hsl = tinycolor(token.value).toHsl()
      if (channel === 'hue') return `${hsl.h}deg`
      if (channel === 'saturation') return `${hsl.s * 100}%`
      if (channel === 'lightness') return `${hsl.l * 100}%`
    },
  })
})

function generateThemeFiles(directories) {
  const genericAttributes = {
    format: formats.cssVariables,
    options: {
      outputReferences: true,
    },
  }
  return directories.map((dir) => {
    return {
      ...genericAttributes,
      // output the dironent tokens in the right folder and file e.g. dironents/button/button-vars.css
      destination: `${dir}/${dir}.css`,
      format: formats.cssVariables,
      // only include the tokens that are inside this dironent token group
      filter: (token) => {
        // console.log('📟 - token → ', token)
        // console.log('token.path[0] === dironents + dir)')
        // console.log('📟 - token.path[0] → ', token.path[0])
        // console.log('📟 - dironents + dir) → ', token.attributes.category)
        // console.log('📟 - dironents + dir) → ', dir)
        // console.log('📟 - dironents + dir) → ', token.attributes.category === dir)
        return token.attributes.category === dir
      },
    }
  })
}

export default {
  source: ['./style-dictionary/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      transforms: [
        'color/hue',
        'color/saturation',
        'color/lightness',
        'attribute/cti', // pick up category/type/item
        'color/hsl',
        // 'custom/component-state',
      ],
      buildPath: './src/assets/css/theme/',
      clearBuildPath: true,

      files: [
        // → type–item only, drop category  files:
        {
          destination: './src/assets/variables.css',
          format: formats.cssVariables,
          //   // filter only the tokens that are inside the global object
          //   // filter: (token) => token.path[0] === 'global',
          //   options: {
          //     outputReferences: true,
          //   },
        },
        // dynamically generate file outputs for each dironent
        // ...generateThemeFiles(['color', 'component', 'theme']),
        // {
        //   destination: 'dironents/background/background-vars.css',
        //   format: formats.cssVariables,
      ],
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'generated/',
      files: [
        {
          destination: 'theme.d.ts',
          format: 'typescript/theme-declarations',
        },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: './src/assets/scss/theme/',
      clearBuildPath: true,
      files: [
        {
          destination: 'variables.scss',
          format: 'scss/variables',
          filter: 'custom/filter-build-time-scss',
        },
      ],
    },
  },
}

// const lol = await sd.extend({
//   source: ['./style-dictionary/tokens/**/*.json'],
//   platforms: {
//     css: {
//       buildPath: './src/assets/theme/',
//       clearBuildPath: true,
//       files: [
//         {
//           destination: './src/assets/variables.css',
//           format: 'css/variables',
//         },
//       ],
//     },
//   },
// })

// const lqsqsol = await lol.buildAllPlatforms()

// export default lqsqsol

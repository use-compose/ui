import StyleDictionary from 'style-dictionary'
import { formats, transformGroups } from 'style-dictionary/enums'
import { filterBuildTimeSCSS } from './filters/filter-build-time-scss.js'
import { themeTypesFormatter } from './formatters/theme-types.js'
import { parseInitialTheme } from './parsers/initial-theme-parser.js'
import { componentStatesTransform } from './transforms/component-states.js'

StyleDictionary.registerParser(parseInitialTheme)
StyleDictionary.registerFilter(filterBuildTimeSCSS)

StyleDictionary.registerFormat(themeTypesFormatter)
StyleDictionary.registerTransform(componentStatesTransform)

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
        // console.log('📟 - dir → ', dir)
        if (token.attributes.type === 'conditional') {
          // console.log('📟 - token → ', token)
        }

        return token.path[0] === dir || token.attributes.type === dir
      },
    }
  })
}

function generateInitialThemeTokens() {
  return {
    parser: 'initial-theme-parser',
    source: ['./style-dictionary/tokens/initial-theme.json'],
    platforms: {
      css: {
        transformGroup: transformGroups.css,
        transforms: ['attribute/cti', 'color/hsl'],
        buildPath: './src/assets/css/theme/',
        clearBuildPath: true,
        files: [
          {
            destination: 'initial-theme.css',
            format: formats.cssVariables,
          },
        ],
      },
    },
  }
}

// const initialDictionary = StyleDictionary.extend(generateInitialThemeTokens())

export default {
  parser: 'initial-theme-parser',
  source: ['./style-dictionary/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      transforms: [
        // 'color/hue',
        // 'color/saturation',
        // 'color/lightness',
        'attribute/cti', // pick up category/type/item
        // 'color/hsl',
        // 'custom/component-state',
      ],
      buildPath: './src/assets/css/variables/',
      clearBuildPath: true,

      files: [
        {
          destination: 'conditional.css',
          format: formats.cssVariables,
          filter: (token) => {
            return token.attribute?.type === 'conditional'
          },

          //   options: {
          //     outputReferences: true,
          //   },
        },
        {
          destination: 'primitives.css',
          format: formats.cssVariables,
          //   // filter only the tokens that are inside the global object
          filter: (token) => {
            return token.attributes?.type === 'primitive'
          },
          //   options: {
          //     outputReferences: true,
          //   },
        },
        {
          destination: 'variant.css',
          format: formats.cssVariables,
          //   // filter only the tokens that are inside the global object
          filter: (token) => {
            return token.attributes?.category === 'variant'
          },
          options: {
            fileHeader: (defaultMessage) => {
              // defaultMessage are the 2 lines above that appear in the default file header
              // you can use this to add a message before or after the default message 👇

              // the fileHeader function should return an array of strings
              // which will be formatted in the proper comment style for a given format
              return [...defaultMessage, 'Variant tokens']
            },
          },
          //   options: {
          //     outputReferences: true,
          //   },
        },
        {
          destination: 'variants.css',
          format: formats.cssVariables,
          //   // filter only the tokens that are inside the global object
          filter: (token) => {
            if (token.type === 'color') {
              // console.log('📟 - token → ', token)
            }
            // console.log(token)
            console.log('📟 - token.attributes?.type → ', token.attributes)
            const variants = ['variant', 'state', 'color']
            return variants.includes(token.attributes?.category)
          },
          options: {
            fileHeader: (defaultMessage) => {
              // defaultMessage are the 2 lines above that appear in the default file header
              // you can use this to add a message before or after the default message 👇

              // the fileHeader function should return an array of strings
              // which will be formatted in the proper comment style for a given format
              return [...defaultMessage, 'Variant tokens']
            },
          },
          // options: {
          //   outputReferences: true,
          // },
        },
        {
          destination: 'base.css',
          format: formats.cssVariables,
          //   // filter only the tokens that are inside the global object
          filter: (token) => {
            return token.attributes?.category === 'base'
          },
          options: {
            fileHeader: (defaultMessage) => {
              // defaultMessage are the 2 lines above that appear in the default file header
              // you can use this to add a message before or after the default message 👇

              // the fileHeader function should return an array of strings
              // which will be formatted in the proper comment style for a given format
              return [...defaultMessage, 'Base component variables']
            },
          },
          //   options: {
          //     outputReferences: true,
          //   },
        },
        // ...generateThemeFiles(['color', 'component', 'theme', 'conditional']),
        ...generateThemeFiles(['component']),
        // {
        //   destination: 'dironents/background/background-vars.css',
        //   format: formats.cssVariables,
      ],
    },
    // Types
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
  },
}

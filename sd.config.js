import StyleDictionary from 'style-dictionary'
import { formats } from 'style-dictionary/enums'
import tinycolor from 'tinycolor2'
// const tokenPath = '/style-dictionary/tokens/'
// console.log('📟 - tokenPath → ', tokenPath)
// const fullPath = import.meta.dirname + tokenPath
// console.log('📟 - fullPath → ', fullPath)
// console.log('import.meta.dirname}${tokenPath}/**/*.json', import.meta.dirname + tokenPath)
// // You can use the .registerParser() method like this
// StyleDictionary.registerParser({
//   name: 'json-parser',
//   pattern: /\.json$/,
//   parser: ({ contents, filePath }) => {
//     console.log('📟 - contents → ', contents)
//     console.log('📟 - filePath → ', filePath)
//     // Probably a good idea to wrap this in a try/catch block
//     try {
//       const object = JSON.parse(contents)
//       // You can now perform any modifications to the file content
//       // or perform any side-effects based on the file

//       // Here we are going to grab the filepath and turn it into a prefix.
//       // tokens/color/core.json will become 'color-core'. We will append this
//       // to all token names.
//       const pathParts = filePath.replace(fullPath, '').replace('.json', '').split('/').join('-')
//       console.log('📟 - pathParts → ', pathParts)

//       const output = {}

//       for (const key in object) {
//         console.log('📟 - key → ', key)
//         console.log('📟 - object → ', object)
//         console.log('📟 - Object.hasOwn(object, key) → ', Object.hasOwn(object, key))
//         if (key === 'color' && Object.hasOwn(object, key)) {
//           const element = object[key]
//           console.log('📟 - element → ', element)
//           output[`${pathParts}-${key}`] = element
//         }
//       }

//       return output
//     } catch (error) {
//       console.log(error)
//     }
//   },
// })

// export default {
//   // 1) no prefix
//   prefix: '',

//   source: ['./style-dictionary/tokens/**/*.json'],

//   platforms: {
//     css: {
//       // 2) override the default transformGroup
//       //    so it uses name/ti/kebab instead of name/cti/kebab
//       transforms: [
//         'attribute/cti', // pick up category/type/item
//         // 'name/ti/kebab', // → type–item only, drop category
//         'color/css', // format any color values
//       ],
//       buildPath: 'build/',
//       files: [
//         {
//           destination: 'variables.css',
//           format: 'css/variables',
//         },
//       ],
//     },
//   },
// }
const tokenPath = '/style-dictionary/tokens/'
const fullPath = import.meta.dirname + tokenPath
console.log('📟 - fullPath → ', fullPath)

StyleDictionary.registerTransformGroup({
  // name: `color/${channel}`,
  name: `hsl-color`,
  type: 'value',
  filter: function (token) {
    console.log('📟 - token → ', token)
    return token.type === 'color' // &&
  },
  // token.attributes.type === 'primary' &&
  // token.attributes.item === channel,
  transformer: function (token) {
    console.log('📟 - token → ', token)
    const hsl = tinycolor(token.value).toHsl()
    console.log('📟 - hsl → ', hsl)
    // if (channel === 'hue')        return `${hsl.h}deg`;
    // if (channel === 'saturation') return `${hsl.s * 100}%`;
    // if (channel === 'lightness')  return `${hsl.l * 100}%`;
    return token.value //`hsl(${hsl.h}, ${hsl.s * 100}%, ${hsl.l * 100}%)`
  },
  transforms: [
    'attribute/cti', // pick up category/type/item
    'color/hsl', // → type–item only, drop category
    // 'name/ti/kebab', // → type–item only, drop category
    // 'color/css', // format any color values
  ],
})

StyleDictionary.registerParser({
  name: 'json-parser',
  pattern: /tokens\/.*\.json$/,
  parser: ({ contents, filePath }) => {
    const object = JSON.parse(contents)
    console.log('📟 - object → ', object)

    // turn path “tokens/color/core.json” → [ 'tokens', 'color', 'core' ]
    // const parts = filePath.replace(fullPath, '').replace('.json', '').split('/')
    // console.log('📟 - filePath → ', filePath)
    // console.log('📟 - parts → ', parts)
    // parts[1] is your folder name (“color”), parts[2] is the token group (“core”)
    // const group = parts[0]
    console.log('📟 - group → ', group)

    const output = {}
    for (const key in object) {
      if (key === 'color' && Object.hasOwn(object, key)) {
        const element = object[key]
        console.log('📟 - element → ', element)
        output[`${key}`] = element
      }
      output[key] = object[key]
    }
    return output
  },
})
export default {
  // Or you can add parsers directly on the configuration object here like this:
  // hooks: {
  //   parsers: {
  //     'json-parser': {
  //       pattern: /\.json$/,
  //       parse: ({contents, filePath}) => {}
  //     }
  //   }
  // },
  // parsers: ['json-parser'],
  source: ['./style-dictionary/tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'hsl-color',
      // transforms: [
      //   'attribute/cti', // pick up category/type/item
      //   'color/hsl', // → type–item only, drop category
      //   // 'name/ti/kebab', // → type–item only, drop category
      //   // 'color/css', // format any color values
      // ],
      buildPath: 'build/',
      clearBuildPath: true,
      files: [
        {
          destination: 'variables.css',
          format: formats.cssVariables,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
}

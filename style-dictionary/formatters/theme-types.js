import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const themeTypesFormatter = {
  name: 'typescript/theme-declarations',
  format: function ({ dictionary }) {
    const props = dictionary.allTokens
      .filter((token) => token.attribute?.type === 'theme')
      .map((token) => `  "${token.name}": string;`)
      .join('\n')
    // return JSON.stringify(dictionary.tokens, null, 2)
    return `export interface YTheme {\n${props}\n}\n`
  },
}

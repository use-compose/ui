export const themeTypesFormatter = {
  name: 'typescript/theme-declarations',
  format: function ({ dictionary }) {
    const props = dictionary.allTokens
    const types = props.map((token) => `${token.name}: string;`).join('\n')

    return `export interface YThemeToken {\n${types}\n}\n`
  },
}

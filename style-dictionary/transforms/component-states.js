export const componentStatesTransform = {
  name: 'custom/component-state',
  type: 'value',
  filter: (token) => {
    console.log('📟 - token → ', token)
    console.log('📟 - token → ', token.attributes)
    return token.attribute?.type === 'bg-lightness'
  },
  transform: function (token) {
    console.log('📟 - token → ', token)
    const ratio = token['value']
    console.log('📟 - ratio → ', ratio)
    const sign = ratio >= 0 ? '+' : '-'
    console.log('📟 - sign → ', sign)
    console.log('📟 -  `calc(var(--component-bg-lightness) ${sign} ${Math.abs(ratio)}%)` → ', `calc(var(--component-bg-lightness) ${sign} ${Math.abs(ratio)}%))`)
    return `calc(var(--component-bg-lightness) ${sign} ${Math.abs(ratio)}%)`
  },
}

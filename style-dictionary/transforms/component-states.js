export const componentStatesTransform = {
  name: 'custom/component-state',
  type: 'value',
  filter: (token) => {
    console.log('📟 - token → ', token)
    console.log('📟 - token → ', token.attributes)
    return token.attribute?.type === 'state'
  },
  transform: function (token) {
    console.log('📟 - token → ', token)
    const ratio = token['value']
    console.log('📟 - ratio → ', ratio)
    const sign = ratio >= 0 ? '+' : '-'
    console.log('📟 - sign → ', sign)
    return `hsl(var(--theme-hue), var(--theme-saturation), calc(var(--theme-lightness) ${sign} ${Math.abs(ratio)}%))`
  },
}

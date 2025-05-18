export const componentStatesTransform = {
  name: 'custom/component-state',
  type: 'value',
  filter: (token) => {
    return token.attribute?.type === 'bg-lightness'
  },
  transform: function (token) {
    const ratio = token['value']
    const sign = ratio >= 0 ? '+' : '-'
    return `calc(var(--component-bg-lightness) ${sign} ${Math.abs(ratio)}%)`
  },
}

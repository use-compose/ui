type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

// from https://www.w3.org/wiki/CSS/Properties/color#Description
type CssGlobals = 'inherit' | 'currentColor' | 'transparent'

export type Color = RGB | RGBA | HEX | CssGlobals

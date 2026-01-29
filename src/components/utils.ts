import { PropType } from 'vue'
import type { DesignTokens } from '../assets/css/themes/tokens/types/theme'

// TODO: Review as done by Claude 80%
export {
  getSpacingOptions,
  isDefined,
  parseBackgroundColorProps,
  parseBorderProps,
  parseHeightProps,
  parseMarginProps,
  parsePaddingProps,
  parseRadiusProps,
  parseWidthProps,
}

function isDefined(value: unknown): boolean {
  return value !== undefined && value !== null
}

// Derive types from DesignTokens interface (type-only import, no runtime dependency)
export type SpacingKey = keyof DesignTokens['spacing']
export type RadiusKey = keyof DesignTokens['radius']
export type WidthKey = keyof DesignTokens['cube']['utility']['width']
export type HeightKey = keyof DesignTokens['cube']['utility']['height']
export type MarginKey = SpacingKey | 'auto' | '0'
export type BorderKey =
  | keyof DesignTokens['cube']['utility']['border']
  | keyof DesignTokens['cube']['utility']['border']['theme']
  | keyof DesignTokens['cube']['utility']['border']['width']
export type BackgroundColorKey = keyof DesignTokens['cube']['utility']['bg']

const spacingOptions: SpacingKey[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

function getSpacingOptions(): SpacingKey[] {
  return spacingOptions
}

/**
 * Take a input to represent padding in a Vue component props and generate corresponding utility classes
 *
 * e.g.
 * padding="md sm xs lg" => will generate ['padding-top-md', 'padding-right-sm', 'padding-bottom-xs', 'padding-left-lg']
 *
 * @param {(SpacingKey | SpacingKey[])} paddingProps
 * @returns {(string | string[])}
 */
function parsePaddingProps(paddingProps?: SpacingKey | SpacingKey[]): string | string[] {
  if (!isDefined(paddingProps)) {
    return []
  }

  const values = paddingProps
    ?.toString()
    .split(' ')
    .map((v) => v.trim())

  if (values && values.length === 1) {
    const value = values[0]

    return [`padding-${value}`]
  }

  if (values && values.length === 2) {
    const [vertical, horizontal] = values
    return [`padding-x-${horizontal}`, `padding-y-${vertical}`]
  }

  if (values && values.length === 3) {
    const [top, horizontal, bottom] = values
    return [`padding-top-${top}`, `padding-x-${horizontal}`, `padding-bottom-${bottom}`]
  }

  if (values && values.length === 4) {
    const [top, right, bottom, left] = values
    return [
      `padding-top-${top}`,
      `padding-right-${right}`,
      `padding-bottom-${bottom}`,
      `padding-left-${left}`,
    ]
  }

  return []
}

export function definePropsFromType<T>() {
  return {} as {
    [K in keyof T]: {
      type: PropType<T[K]>
    }
  }
}

function parseRadiusProps(radiusProps?: RadiusKey | RadiusKey[]): string | string[] {
  if (!isDefined(radiusProps)) {
    return []
  }

  const values = radiusProps
    ?.toString()
    .split(' ')
    .map((v) => v.trim())

  if (values && values.length === 1) {
    const value = values[0]

    return [`radius-${value}`]
  }

  if (values && values.length === 2) {
    const [top, bottom] = values
    return [`radius-y-top-${top}`, `radius-y-bottom-${bottom}`]
  }

  if (values && values.length === 3) {
    const [topLeft, topRight, bottom] = values
    return [`radius-top-left-${topLeft}`, `radius-top-right-${topRight}`, `radius-bottom-${bottom}`]
  }

  if (values && values.length === 4) {
    const [topLeft, topRight, bottomRight, bottomLeft] = values
    return [
      `radius-top-left-${topLeft}`,
      `radius-top-right-${topRight}`,
      `radius-bottom-right-${bottomRight}`,
      `radius-bottom-left-${bottomLeft}`,
    ]
  }

  return []
}

/**
 * Parse width prop and generate corresponding utility class
 *
 * e.g.
 * width="full" => ['width-full']
 *
 * @param {WidthKey} widthProps
 * @returns {string[]}
 */
function parseWidthProps(widthProps?: WidthKey): string[] {
  if (!isDefined(widthProps)) {
    return []
  }
  return [`width-${widthProps}`]
}

/**
 * Parse height prop and generate corresponding utility class
 *
 * e.g.
 * height="screen" => ['height-screen']
 *
 * @param {HeightKey} heightProps
 * @returns {string[]}
 */
function parseHeightProps(heightProps?: HeightKey): string[] {
  if (!isDefined(heightProps)) {
    return []
  }
  return [`height-${heightProps}`]
}

/**
 * Parse margin prop and generate corresponding utility classes
 * Follows the same CSS shorthand pattern as padding
 *
 * e.g.
 * margin="md" => ['margin-md']
 * margin="md lg" => ['margin-y-md', 'margin-x-lg']
 * margin="md lg sm" => ['margin-top-md', 'margin-x-lg', 'margin-bottom-sm']
 * margin="md lg sm xl" => ['margin-top-md', 'margin-right-lg', 'margin-bottom-sm', 'margin-left-xl']
 *
 * @param {(MarginKey | MarginKey[])} marginProps
 * @returns {string[]}
 */
function parseMarginProps(marginProps?: MarginKey | MarginKey[]): string[] {
  if (!isDefined(marginProps)) {
    return []
  }

  const values = marginProps
    ?.toString()
    .split(' ')
    .map((v) => v.trim())

  if (values && values.length === 1) {
    const value = values[0]
    return [`margin-${value}`]
  }

  if (values && values.length === 2) {
    const [vertical, horizontal] = values
    return [`margin-y-${vertical}`, `margin-x-${horizontal}`]
  }

  if (values && values.length === 3) {
    const [top, horizontal, bottom] = values
    return [`margin-top-${top}`, `margin-x-${horizontal}`, `margin-bottom-${bottom}`]
  }

  if (values && values.length === 4) {
    const [top, right, bottom, left] = values
    return [
      `margin-top-${top}`,
      `margin-right-${right}`,
      `margin-bottom-${bottom}`,
      `margin-left-${left}`,
    ]
  }

  return []
}

/**
 * Parse border prop and generate corresponding utility classes
 *
 * e.g.
 * border="all" => ['border-all']
 * border="top bottom" => ['border-top', 'border-bottom']
 *
 * @param {(BorderKey | BorderKey[])} borderProps
 * @returns {string[]}
 */
function parseBorderProps(borderProps?: BorderKey | BorderKey[]): string[] {
  if (!isDefined(borderProps)) {
    return []
  }

  if (Array.isArray(borderProps)) {
    return borderProps.map((v) => `border-${v}`)
  }
  const values = borderProps
    ?.toString()
    .split(' ')
    .map((v) => v.trim())
  if (!values || values.length === 0) {
    return []
  }

  return values.map((v) => `border-${v}`)
}

/**
 * Parse backgroundColor prop and generate corresponding utility class
 *
 * e.g.
 * backgroundColor="primary" => ['bg-primary']
 *
 * @param {BackgroundColorKey} backgroundColorProps
 * @returns {string[]}
 */
function parseBackgroundColorProps(backgroundColorProps?: BackgroundColorKey): string[] {
  if (!isDefined(backgroundColorProps)) {
    return []
  }
  return [`bg-${backgroundColorProps}`]
}

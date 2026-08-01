import type { InjectionKey } from 'vue'
import type { DropdownInterface } from '../types'
import { FontSize, FONT_SIZES, type Size } from './font-size'
import { StyledImage } from './image'
import { LinkMenu } from './link'

export { FONT_SIZES, FontSize, type Size }
export { StyledImage }
export { LinkMenu }

export const dropdownKey: InjectionKey<DropdownInterface> = Symbol('dropdown')

export const FONT_SIZE_LABELS: Record<Size, string> = {
  'rt-smaller': 'XS',
  'rt-small': 'S',
  'rt-normal': 'M',
  'rt-big': 'L',
  'rt-bigger': 'XL',
}

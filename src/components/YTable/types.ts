import { ThemeComponentBaseProps } from '@/composables/component-theme'
import { InjectionKey } from 'vue'
import { TableFooter } from './YTableFooter/YTableFooter.types'
import { TableHeader } from './YTableHeader/YTableHeader.types'

export type TableHeaders = TableHeader[]

export interface YTableProps extends ThemeComponentBaseProps {
  headers?: TableHeaders

  rows?: Record<string, string>[]
  footer?: TableFooter[] // Footer can be an array of TableFooter
}

interface YTableKeyInterface extends YTableProps {}

const yTableKey: InjectionKey<YTableKeyInterface> = Symbol('tableKey')

export { yTableKey }
export type { YTableKeyInterface }

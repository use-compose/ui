import { YTableDataCellProps } from '../YTableDataCell/types'

export type { KeyValueFooter, TableFooter }

interface KeyValueFooter {
  key: string
  value: string
}

type TableFooter = string | KeyValueFooter | YTableDataCellProps

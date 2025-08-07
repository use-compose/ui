import { YTableDataCellProps } from '../YTableDataCell/types'

export type { TableHeader, YKeyValueHeader }

interface YKeyValueHeader {
  key: string
  value: string
}

type TableHeader = string | YKeyValueHeader | YTableDataCellProps

export interface YTableDataCellProps {
  // Component specific props
  header?: boolean // Indicates if this cell is a header cell
  colspan?: number // Number of columns this cell should span
  rowspan?: number // Number of rows this cell should span
}

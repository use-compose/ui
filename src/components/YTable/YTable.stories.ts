import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed } from 'vue'
import type { YTableProps } from './types'
import YTable from './YTable.vue'
import { YTableDataCell } from './YTableDataCell'

const meta: Meta<typeof YTable> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Data/YTable',
  component: YTable,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof YTable>

const renderGenericStory: Story = {
  render: (args: YTableProps) => ({
    components: { YTable, YTableDataCell },
    props: Object.keys(args),
    template: `
      <YTable :headers="headers" :rows="rows" >
        <template #header >
          <YTableDataCell v-for="(column, index) in headers" :key="index" header>
            {{ column.key }}
          </YTableDataCell>
        </template>

      <template #default="{ row }">
          <YTableDataCell v-for="(column, index) in headers" :key="index">
            {{ row[column.value] }}
          </YTableDataCell>
        </template> 
      </YTable>
  `,
    setup() {
      const headers = [
        {
          key: 'Header 0',
          value: 'column1',
        },
        {
          key: 'Header 1',
          value: 'column2',
        },
        {
          key: 'Header 2',
          value: 'column3',
        },
        {
          key: 'Header 3',
          value: 'column4',
        },
      ]

      const rows = computed(() => [
        { key: 'row1', column1: 'Row 1 Col 1', column2: 'Row 1 Col 2', column3: 'Row 1 Col 3' },
        { key: 'row2', column1: 'Row 2 Col 1', column2: 'Row 2 Col 2', column3: 'Row 2 Col 3' },
        { key: 'row3', column1: 'Row 3 Col 1', column2: 'Row 3 Col 2', column3: 'Row 3 Col 3' },
      ])

      return { args, headers, rows }
    },
  }),
}

export { renderGenericStory as Default }

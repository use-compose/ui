import { YCheckbox } from '@/components/YCheckbox'
import type { Meta, StoryObj } from '@storybook/vue3'
import { reactive } from 'vue'
import { YTableDataCell } from '../YTableDataCell'
import { YTableRow } from '../YTableRow'
import YTableBody from './YTableBody.vue'

const meta: Meta<typeof YTableBody> = {
  title: 'Components/Data/YTableBody',
  component: YTableBody,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof YTableBody>

const renderGenericStory: Story = {
  render: (args) => ({
    components: { YTableBody, YTableRow, YTableDataCell, YCheckbox },
    props: Object.keys(args),
    template: `
      <YTableBody v-bind="args" :rows="rows">
        <template #default="{ row, rowIndex }">
          <YTableDataCell>
            {{ row.customer }}
          </YTableDataCell>
          <YTableDataCell>
            {{ row.value }}
          </YTableDataCell>

          <YTableDataCell>
            <YCheckbox
              size="small"
              raw
              variant="text"
            />
          </YTableDataCell>
        </template>
      </YTableBody>
  `,
    setup() {
      const rows = reactive([
        { id: 0, customer: 'Customer 1', value: 'Row 1 Col 1', checked: false },
        { id: 1, customer: 'Customer 2', value: 'Row 2 Col 1', checked: false },
        { id: 2, customer: 'Customer 3', value: 'Row 3 Col 1', checked: false },
      ])

      return { args, rows }
    },
  }),
}

export { renderGenericStory as Default }

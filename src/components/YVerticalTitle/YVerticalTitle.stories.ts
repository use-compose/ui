import type { Meta, StoryObj } from '@storybook/vue3-vite'
import type { YVerticalTitleProps } from './YVerticalTitle.types'
import YVerticalTitle from './YVerticalTitle.vue'

const meta: Meta<typeof YVerticalTitle> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Typography/YVerticalTitle',
  component: YVerticalTitle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (args: YVerticalTitleProps, { argTypes }) => ({
    components: { YVerticalTitle },
    props: Object.keys(argTypes),
    template: `
      <div>
        <YVerticalTitle v-bind="args">
          Vertical Title
        </YVerticalTitle>
      </div>
    `,
    setup() {
      return { args }
    },
  }),
}
const Default = renderGenericStory
export { Default }

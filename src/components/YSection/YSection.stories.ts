import type { Meta, StoryObj } from '@storybook/vue3'
import YFlex from '../layout/YFlex/YFlex.vue'
import YSection from './YSection.vue'

const meta: Meta<typeof YSection> = {
  // TODO: TO CHANGE PATH
  title: 'Compose/YSection',
  component: YSection,
  tags: ['autodocs'],
  args: {
    title: 'Section Title',
  },
}

export default meta
type Story = StoryObj<typeof meta>

const Default: Story = {
  render: (args) => ({
    components: { YSection, YFlex },
    setup() {
      return { args }
    },
    template: `<YSection v-bind="args" >
      <YFlex>
        <h3>Content inside the section</h3>
        <p>Lorem  ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </YFlex>
    </YSection>`,
  }),
}

export { Default }

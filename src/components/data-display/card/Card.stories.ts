import { Meta, StoryObj } from '@storybook/vue3'

import Card from './Card.vue'
import { CardProps } from './Card.vue'
import YButton from '../../form/button/YButton.vue'
import Flex from '../../layout/flex/Flex.vue'
// import YButton from '@/components/form/button/YButton.vue'
// import Flex from '@/components/layout/flex/Flex.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Compose/Card',
  component: Card,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
const template = `
 <Card v-bind="args">
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum hic harum architecto quisquam
    consequatur minima a rerum, alias minus nihil perspiciatis voluptate asperiores quaerat
    blanditiis temporibus accusantium cum. Exercitationem, dicta?
  </p> 
  <Flex justify="flex-end" align="flex-end"><YButton @click="handleClick" v-bind="args" style="--component-margin-bottom: 0">YButton</YButton></Flex>
</Card>

 `

// Define a generic render function
const renderTemplate = (args: CardProps) => ({
  components: { Card, YButton, Flex },
  setup() {
    return {
      args,
    }
  },
  template,
})

export const Primary: Story = {
  render: (args) => renderTemplate(args),
  args: {},
}

export const Outlined: Story = {
  render: (args) => renderTemplate(args),
  args: {
    outlined: true,
  },
}

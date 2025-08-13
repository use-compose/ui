import { YButton } from '@/components/YButton'
import { useThemeComponentStory } from '@/composables'
import { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import { YFlex } from '../YFlex'
import YCard, { YCardProps } from './YCard.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YCard)

const meta = {
  title: 'Components/Data Display/YCard',
  component: YCard,
  subcomponents: { YButton, YFlex },
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
  },
  args: {},
} satisfies Meta<typeof YCard>

export default meta

type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */

const template = `
 <YCard v-bind="args">
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum hic harum architecto quisquam
    consequatur minima a rerum, alias minus nihil perspiciatis voluptate asperiores quaerat
    blanditiis temporibus accusantium cum. Exercitationem, dicta?
  </p> 
  <YFlex justify="flex-end" align="flex-end"><YButton v-bind="args" style="--component-margin-bottom: 0">YButton</YButton></YFlex>
</YCard>
 `

// Define a generic render function
const renderTemplate = (args: YCardProps, { argTypes }: ArgTypes) => ({
  components: { YCard, YButton, YFlex },
  props: Object.keys(argTypes),

  template,
  setup() {
    return { args }
  },
})

const baseStory: Story = {
  render: renderTemplate,
  args: {},
}

const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(baseStory)

export { Default, Disabled, Large, Outlined, Raw, Small }

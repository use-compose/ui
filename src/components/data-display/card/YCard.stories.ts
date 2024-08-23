import { Meta } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import YButton from '../../form/button/YButton.vue'
import Flex from '../../layout/flex/Flex.vue'
import YCard, { YCardProps } from './YCard.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YCard)

const meta = {
  title: 'Compose/Card',
  component: YCard,
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
  },
} satisfies Meta<typeof YCard>

export default meta

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
  <Flex justify="flex-end" align="flex-end"><YButton @click="handleClick" v-bind="args" style="--component-margin-bottom: 0">YButton</YButton></Flex>
</YCard>
 `

// Define a generic render function
const renderTemplate = (args: YCardProps) => ({
  components: { YCard, YButton, Flex },
  setup() {
    return {
      args,
    }
  },
  template,
})

const { Default, Outlined, Disabled, Raw } = generateCommonStories(renderTemplate)

export { Default, Disabled, Outlined, Raw }

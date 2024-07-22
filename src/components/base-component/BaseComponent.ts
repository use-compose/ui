import { Meta, StoryObj } from '@storybook/vue3'

import BaseComponent from './BaseComponent.vue'
// import YButton from '@/components/form/button/YButton.vue'
// import Flex from '@/components/layout/flex/Flex.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Compose/BaseComponent',
  component: BaseComponent,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof BaseComponent>

export default meta
type Story = StoryObj<typeof meta>

// TODO: use it in @/composables/use-theme-component-story?
// const template = `
//  <BaseComponent v-bind="args">
//   <p>
//     Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum hic harum architecto quisquam
//     consequatur minima a rerum, alias minus nihil perspiciatis voluptate asperiores quaerat
//     blanditiis temporibus accusantium cum. Exercitationem, dicta?
//   </p>
//   <Flex justify="flex-end" align="flex-end"><YButton @click="handleClick" v-bind="args" style="--component-margin-bottom: 0">YButton</YButton></Flex>
// </BaseComponent>

//  `

// export const baseComponentStories: Story[] = {
//   Disabled: {
//     args: {
//       disabled: true,
//     },
//   },

//   Outlined: {
//     args: {
//       outlined: true,
//     },
//   },
// }

// export const Disabled: Story = {
//   render: (args) => renderTemplate(args),
//   args: {
//     disabled: true,
//   },
// }

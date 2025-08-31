import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import { YButtonProps } from './types'

import { useThemeComponentStory } from '@/composables'
import { ref } from 'vue'
import YButton from './YButton.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YButton)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YButton> = {
  title: 'Components/Form/YButton',
  component: YButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    onClick: { action: 'handleClick' },
    // backgroundColor: { control: "color" },
    // onClick: { action: "handleClick"},
  },
  args: {
    // onClick: action('onClick'),
  }, // default value
}

export default meta

type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (args: YButtonProps, { argTypes }: ArgTypes) => ({
    components: { YButton },
    props: Object.keys(argTypes),
    template: `
    <YButton @click="handleClick"  v-bind="args">Label</YButton>
  `,
    setup(props: YButtonProps) {
      const clickCount = ref(0)

      const handleClick = (e: UIEvent) => {
        // eslint-disable-next-line no-console
        console.warn('Click event !', e)
      }

      return { props, args, clickCount, handleClick }
    },
  }),

  args: {
    size: 'medium',
    color: 'primary',
    variant: 'contained',
    state: 'base',
    raw: false,
  },
}

const { Default, Outlined, Disabled, Raw, Large, Small } = generateCommonStories(renderGenericStory)

export { Default, Disabled, Large, Outlined, Raw, Small }

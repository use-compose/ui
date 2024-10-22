import type { Meta, StoryObj } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import { action } from '@storybook/addon-actions'
import YInput, { YInputProps } from './YInput.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory<YInputProps>(YInput)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Compose/Form/YInput',
  component: YInput,
  ...commonArgTypes,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    hero: { control: 'boolean' },
    label: { control: 'text' },
    onBlur: { action: 'handleBlur' },
    // handleInput: { control: 'text' },
    // backgroundColor: { control: "color" },
    // onClick: { action: "handleClick"},
    'onUpdate:modelValue': { action: 'onInput', control: 'text' },
    modelValue: { control: 'text' },
  },
  args: {
    modelValue: 'YInput',
    onBlur: action('onBlur'),
    'onUpdate:modelValue': action('onInput'),
  }, // default value
} satisfies Meta<typeof YInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

const renderGenericStory: Story = {
  render: (args: YInputProps, { argTypes }) => ({
    components: { YInput },
    props: Object.keys(argTypes),
    template: `
    <YInput v-bind="args" />
  `,
    setup() {
      // const emit = defineEmits(['update:modelValue', 'blur'])

      // const handleInput = (event: Event) => {
      //   emit('update:modelValue', (event.target as HTMLInputElement).value)
      // }

      return {
        args,
        // handleInput,
      }
    },
  }),
  args: {
    modelValue: 'YInput',
  },
}

const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

export const Hero: Story = {
  args: {
    ...Default.args,
    modelValue: 'Hero',
    hero: true,
  },
}

export { Default, Disabled, Large, Outlined, Raw, Small }

import { useThemeComponentStory } from '@/composables'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YColorInput from './YColorInput.vue'
import { YColorInputProps } from './types'

const { commonArgs, commonArgTypes, generateCommonStories } =
  useThemeComponentStory<YColorInputProps>(YColorInput)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Components/Form/Input/YColorInput',
  component: YColorInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    hero: { control: 'boolean' },
    label: { control: 'text' },
    // backgroundColor: { control: "color" },
    // onClick: { action: "handleClick"},
  },
  args: {
    ...commonArgs,
    modelValue: 'var(--color-primary)',
  }, // default value
} satisfies Meta<typeof YColorInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

const renderGenericStory: Story = {
  render: (args: YColorInputProps, { argTypes }) => ({
    components: { YColorInput },
    props: Object.keys(argTypes),
    template: `
    <YColorInput v-bind="$props" />
  `,
    setup() {
      // const emit = defineEmits(['update:modelValue', 'blur'])
      const color = args.modelValue || 'var(--color-primary)'
      // const handleInput = (event: Event) => {
      //   emit('update:modelValue', (event.target as HTMLInputElement).value)
      // }

      return {
        args,
        color,
        // modelValue: 'fsddf',
        // handleInput,
      }
    },
  }),
  args: {
    modelValue: 'Default',
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

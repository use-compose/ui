import { useThemeComponentStory } from '@/composables'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import YInputText from './YInputText.vue'
import type { YInputTextProps } from './types'

const { commonArgTypes, generateCommonStories } =
  useThemeComponentStory<YInputTextProps>(YInputText)

const meta = {
  title: 'Components/Form/YInputText',
  component: YInputText,
  ...commonArgTypes,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    hero: { control: 'boolean' },
    label: { control: 'text' },
    // onBlur: { action: 'handleBlur' },
    // handleInput: { control: 'text' },
    // backgroundColor: { control: "color" },
    // onClick: { action: "handleClick"},
    // 'onUpdate:modelValue': { action: 'onInput', control: 'text' },
    modelValue: { control: 'text' },
  },
  args: {
    modelValue: 'YInput',
    // onBlur: action('onBlur'),
    // 'onUpdate:modelValue': action('onInput'),
  }, // default value
} satisfies Meta<typeof YInputText>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

const renderGenericStory: Story = {
  render: (args: YInputTextProps, { argTypes }) => ({
    components: { YInputText },
    props: Object.keys(argTypes),
    template: `
   <YInputText data-compose-ui Text v-model="inputVal" v-bind="args" />
  `,
    setup(props: YInputTextProps) {
      const inputVal = ref('modelValue')
      // const emit = defineEmits(['update:modelValue', 'blur'])

      // const handleInput = (event: Event) => {
      //   emit('update:modelValue', (event.target as HTMLInputElement).value)
      // }

      return {
        args,
        props,
        inputVal,
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

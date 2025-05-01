import type { Meta, StoryObj } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import { action } from '@storybook/addon-actions'
import { defineEmits, ref } from 'vue'
import YCheckbox from './YCheckbox.vue'
import type { YCheckboxProps } from './types'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YCheckboxProps>(YCheckbox)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Compose/Form/YCheckbox',
  component: YCheckbox,
  ...commonArgTypes.value,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    modelValue: { control: 'boolean' },
    hero: { control: 'boolean' },
    label: { control: 'text' },
    // 'onUpdate:modelValue': { action: 'onInput', control: 'boolean' },
    onBlur: { action: 'handleBlur' },
    // onChange: { action: 'handleInput' },
  },
  args: {
    ...commonArgs,
    // 'onUpdate:modelValue': action('onInput'),
    onBlur: action('onBlur'),
    modelValue: false,
  }, // default value
} satisfies Meta<typeof YCheckbox>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

const renderGenericStory: Story = {
  render: (args: YCheckboxProps, { argTypes }) => ({
    components: { YCheckbox },
    props: Object.keys(argTypes),
    template: `
    <YCheckbox v-bind="args" :modelValue="checked" @update:modelValue="updateModel" />
  `,
    setup(props: YCheckboxProps) {
      const checked = ref(false)
      const emit = defineEmits(['update:modelValue', 'blur'])
      const updateModel = (val: boolean) => (checked.value = val)

      const handleInput = (event: Event) => {
        if (props.disabled) {
          event.preventDefault()
        } else {
          emit('update:modelValue', !props.modelValue)
        }
      }

      return {
        modelValue: props.modelValue,
        args,
        handleInput,
        updateModel,
        checked,
      }
    },
  }),
}

const { Default, Outlined, Disabled, Raw, Large, Small } = generateCommonStories(renderGenericStory)

// export const Hero: Story = {
//   args: {
//     ...Default.args,
//     modelValue: false,
//     hero: true,
//   },
// }

export { Default, Disabled, Large, Outlined, Raw, Small }

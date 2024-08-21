import type { Meta, StoryObj } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import YInput, { YInputProps } from './YInput.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory<YInputProps>(YInput)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Compose/Form/YInput',
  component: YInput,
  ...commonArgTypes.value,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    small: { control: 'boolean' },
    big: { control: 'boolean' },
  },
  args: {
    modelValue: 'Default',
  }, // default value
} satisfies Meta<typeof YInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */

const template = '<YInput v-bind="args" />'

const renderTemplate = (args: YInputProps) => ({
  components: { YInput },
  setup() {
    const emit = defineEmits(['update:modelValue', 'blur'])

    const handleInput = (event: Event) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value)
    }

    return {
      args,
      modelValue: 'fsddf',
      handleInput,
    }
  },
  template,
})

const { Default, Outlined, Disabled, Raw } = generateCommonStories(renderTemplate)

export const Small: Story = {
  args: {
    modelValue: 'Small',
    small: true,
  },
}

export const Big: Story = {
  args: {
    modelValue: 'Big',
    big: true,
  },
}

export const Hero: Story = {
  args: {
    modelValue: 'Hero',
    hero: true,
  },
}

export { Default, Disabled, Outlined, Raw }

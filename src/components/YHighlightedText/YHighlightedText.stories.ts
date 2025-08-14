import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import YHighlightedText from './YHighlightedText.vue'
import type { YHighlightedTextProps } from './types'

const meta: Meta<typeof YHighlightedText> = {
  // TODO: TO CHANGE PATH
  title: 'Animations/YHighlightedText',
  component: YHighlightedText,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (args: YHighlightedTextProps, { argTypes }) => ({
    components: { YHighlightedText },
    props: Object.keys(argTypes),
    template: `
      <div>
        <YHighlightedText  v-bind="args" animate >
          Highlighted Text
        </YHighlightedText>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec
          ligula luctus aliquam. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
          facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
        </p>
      </div>
    `,
    setup() {
      const isHovered = ref(false)

      const highlightedText = ref<EventTarget | null>(null)
      // useEventListener(highlightedText, 'mouseover', () => (isHovered.value = true))
      // useEventListener(highlightedText, 'mouseleave', () => (isHovered.value = false))

      return { args, isHovered, highlightedText }
    },
  }),
}

const Default = renderGenericStory

const Inactive = {
  ...renderGenericStory,
  args: {
    active: false,
  },
}

export { Default, Inactive }

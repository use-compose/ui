import { useThemeComponentStory } from '@/composables'
import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import YChipGroup from '../YChipGroup/YChipGroup.vue'
import type { YChipProps } from './YChip.types'
import YChip from './YChip.vue'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YChipProps>(YChip)

const meta: Meta<typeof YChip> = {
  title: 'Components/Data Display/YChip',
  component: YChip,
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
  },
  args: {
    ...commonArgs,
  },
}

export default meta

type Story = StoryObj<typeof YChip>

const { Default } = generateCommonStories()

export { Default }

export const Removable: Story = {
  args: { ...commonArgs, removable: true },
  render: (args: YChipProps, { argTypes }: ArgTypes) => ({
    components: { YChip },
    props: Object.keys(argTypes),
    setup: (props: YChipProps) => ({ args, props }),
    template: `<YChip v-bind="args" @remove="() => {}">Removable chip</YChip>`,
  }),
}

export const Selected: Story = {
  render: (args) => ({
    components: { YChip },
    setup: () => ({ args, selected: ref(true) }),
    template: `<YChip v-bind="args" v-model:selected="selected">Selected chip</YChip>`,
  }),
}

export const Group: Story = {
  render: () => ({
    components: { YChip, YChipGroup },
    setup: () => ({
      selection: ref(['react']),
      options: ['react', 'vue', 'svelte'],
    }),
    template: `
      <YChipGroup v-model="selection" multiple>
        <YChip v-for="option in options" :key="option" :value="option">
          {{ option }}
        </YChip>
      </YChipGroup>
    `,
  }),
}

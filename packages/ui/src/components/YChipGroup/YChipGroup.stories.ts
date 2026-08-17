import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import YChip from '../YChip/YChip.vue'
import YChipGroup from './YChipGroup.vue'

const meta: Meta<typeof YChipGroup> = {
  title: 'Components/Data Display/YChipGroup',
  component: YChipGroup,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof YChipGroup>

export const SingleSelect: Story = {
  render: () => ({
    components: { YChip, YChipGroup },
    setup: () => ({
      selection: ref(['medium']),
      sizes: ['small', 'medium', 'large'],
    }),
    template: `
      <YChipGroup v-model="selection">
        <YChip v-for="size in sizes" :key="size" :value="size">
          {{ size }}
        </YChip>
      </YChipGroup>
    `,
  }),
}

export const MultiSelect: Story = {
  render: () => ({
    components: { YChip, YChipGroup },
    setup: () => ({
      selection: ref(['react', 'vue']),
      options: ['react', 'vue', 'svelte', 'angular'],
    }),
    template: `
      <YChipGroup v-model="selection" multiple>
        <YChip v-for="option in options" :key="option" :value="option" removable>
          {{ option }}
        </YChip>
      </YChipGroup>
    `,
  }),
}

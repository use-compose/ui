import { useThemeComponentStory } from '@/composables'
import type { Meta } from '@storybook/vue3-vite'
import YThemeSwitcher from './YThemeSwitcher.vue'
import type { YThemeSwitcherProps } from './types'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YThemeSwitcherProps>(YThemeSwitcher)

const meta: Meta<typeof YThemeSwitcher> = {
  title: 'Components/Core/YThemeSwitcher',
  component: YThemeSwitcher,
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    border: { control: 'boolean' },
    spacing: { control: 'boolean' },
    radius: { control: 'boolean' },
    font: { control: 'boolean' },
    height: { control: 'boolean' },
    margin: { control: 'boolean' },
  },
  args: {
    ...commonArgs,
    border: true,
    spacing: true,
    radius: true,
    font: true,
    height: false,
    margin: false,
  },
}

export default meta

const { Default } = generateCommonStories()

export { Default }

/**
 * Story structure configuration
 * Maps: Category -> Group -> Component names
 */
export const storiesStructure: Record<string, Record<string, string[]>> = {
  Components: {
    Form: ['YButton', 'YInput', 'YSelect', 'YCheckbox', 'YColorInput', 'YDateInput', 'YDateTimeInput', 'YTimeInput', 'YInputText', 'YDropdown'],
    'Data Display': ['YHeader', 'YCard', 'YSection', 'YTag', 'YTable', 'YHighlightedText', 'YLabel', 'YSkeleton', 'YVerticalTitle'],
    Layout: ['YBox', 'YFlow', 'YRow', 'YStack', 'YModal', 'YOverlay', 'YMenu'],
    Core: ['AppCompose', 'Wrapper', 'YThemePicker'],
  },
}

/**
 * Get the story path for a component
 */
export function getStoryPath(componentName: string): string | null {
  for (const [category, groups] of Object.entries(storiesStructure)) {
    for (const [group, components] of Object.entries(groups)) {
      if (components.includes(componentName)) {
        return `${category}/${group}/${componentName}`
      }
    }
  }
  return null
}

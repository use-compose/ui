const storiesStructure: Record<string, Record<string, string[]>> = {
  Components: {
    Form: ['YButton', 'YInput', 'YSelect'],
    'Data Display': ['YHeader', 'YCard', 'YSection', 'YTag'],
  },
  Primitive: {
    Typography: ['YTypography'],
  },
}

/**
 * TODO: Implement a function to get the story path for a given component story
 * As of now "Error: CSF: unexpected dynamic title"
 */
export function getStoryPath(componentStory: string) {
  const categories = Object.keys(storiesStructure)
  categories.forEach((category) => {
    const stories = storiesStructure[category] as Record<string, string[]>
    const groups = Object.keys(stories)
    // console.log('📟 - items → ', items)
    for (const group of groups) {
      // eslint-disable-next-line no-console
      console.log('📟 - group → ', storiesStructure[category][group])

      const items = storiesStructure[category][group]
      // eslint-disable-next-line no-console
      console.log('📟 - items → ', items)

      for (const item of items) {
        if (item === componentStory) {
          return `${category}/${group}/${componentStory}`
        }
      }
    }
  })
  return `Components/${componentStory}`
}

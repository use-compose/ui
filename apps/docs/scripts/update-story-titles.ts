#!/usr/bin/env npx tsx
/* eslint-disable no-console */

/**
 * Updates story titles based on the centralized storiesStructure config.
 *
 * Usage: npx tsx scripts/update-story-titles.ts
 */
import fg from 'fast-glob'
import { readFileSync, writeFileSync } from 'fs'
import { getStoryPath, storiesStructure } from '../src/utils/storybook'

const STORIES_GLOB = 'src/components/**/*.stories.ts'

async function updateStoryTitles() {
  const storyFiles = await fg(STORIES_GLOB)
  let updated = 0
  let skipped = 0

  for (const file of storyFiles) {
    const content = readFileSync(file, 'utf-8')

    // Extract component name from file path (e.g., src/components/YButton/YButton.stories.ts -> YButton)
    const match = file.match(/\/([A-Z][a-zA-Z]+)\.stories\.ts$/)
    if (!match) {
      console.log(`  Skipped: ${file} (couldn't extract component name)`)
      skipped++
      continue
    }

    const componentName = match[1]
    const newPath = getStoryPath(componentName)

    if (!newPath) {
      console.log(`  Skipped: ${componentName} (not in storiesStructure)`)
      skipped++
      continue
    }

    // Match title in meta object: title: 'Something/Here'
    const titleRegex = /title:\s*['"`]([^'"`]+)['"`]/
    const currentMatch = content.match(titleRegex)

    if (!currentMatch) {
      console.log(`  Skipped: ${file} (no title found)`)
      skipped++
      continue
    }

    const currentTitle = currentMatch[1]
    if (currentTitle === newPath) {
      console.log(`  OK: ${componentName} (already correct)`)
      continue
    }

    // Replace the title
    const newContent = content.replace(titleRegex, `title: '${newPath}'`)
    writeFileSync(file, newContent)
    console.log(`  Updated: ${componentName} "${currentTitle}" -> "${newPath}"`)
    updated++
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`)
}

// Print structure overview
console.log('Story Structure:\n')
for (const [category, groups] of Object.entries(storiesStructure)) {
  for (const [group, components] of Object.entries(groups)) {
    console.log(`  ${category}/${group}/`)
    components.forEach((c) => console.log(`    - ${c}`))
  }
}
console.log('\nUpdating story files...\n')

updateStoryTitles().catch(console.error)

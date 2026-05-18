// import { RtI18nHelper } from '@reteach/shared/utils'
import { type MenuComponent, menuComponents } from '.'

type ExtensionInput = string | ExtensionInput[]

function groupAndSortComponents(input: ExtensionInput, result: MenuComponent[] = []): MenuComponent[] {
  for (const item of input) {
    if (Array.isArray(item)) {
      const nestedResult: MenuComponent[] = []
      result.push({ ...menuComponents.group, children: groupAndSortComponents(item, nestedResult) })
      continue
    } else if (typeof item === 'string' && !!menuComponents[item] && !!menuComponents[item].component) {
      result.push(menuComponents[item])
    } else {
      // eslint-disable-next-line no-console
      console.warn(`Component "${item}" not found.`)
    }
  }

  return result
}

export function generateMenuComponents(input: ExtensionInput): MenuComponent[] {
  return groupAndSortComponents(input)
}

// export function getComponentTooltip(menuComponent: MenuComponent, rtTranslate: RtI18nHelper) {
//   return menuComponent.tooltip && menuComponent.tooltip(rtTranslate)
// }
export function getComponentTooltip(menuComponent: MenuComponent): string | undefined {
  return menuComponent.tooltip
}

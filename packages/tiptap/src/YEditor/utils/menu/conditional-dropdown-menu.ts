import type { InjectionKey } from 'vue'
import { type Ref } from 'vue'
import { type MenuComponent } from '.'

export interface ConditionalDropdownMenuInterface {
  children: Ref<MenuComponent[]>
}

// https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject
export const conditionalDropdownMenuKey: InjectionKey<ConditionalDropdownMenuInterface> =
  Symbol('conditionalDropdownMenu')

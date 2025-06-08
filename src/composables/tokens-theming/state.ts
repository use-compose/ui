import { State, states, ThemeComponentBaseProps } from '@/types/base-props'
import { computed, PropType } from 'vue'

export const stateProps = {
  state: {
    type: String as PropType<State>,
    default: 'base',
    validator: (value: State) => states.includes(value),
  },
}

export function useState(props: ThemeComponentBaseProps) {
  const state = props.state || 'base'

  const stateClasses: { [key in State]: string } = {
    base: 'base',
    hover: 'hover',
    active: 'active',
    focus: 'focus',
    disabled: 'disabled',
  }
  const isDisabled = computed(() => {
    return state === 'disabled'
  })

  const stateClass = computed(() => {
    return stateClasses[state] || stateClasses.base
  })

  return {
    stateClass,
    isDisabled,
  }
}

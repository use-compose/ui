import { computed, PropType } from 'vue'

export { stateProps, states, useState }
export type { State, StateProps }

const states = ['base', 'hover', 'active', 'focus', 'disabled'] as const
type State = (typeof states)[number]

interface StateProps {
  state?: State
}

const stateProps = {
  state: {
    type: String as PropType<State>,
    default: 'base',
    validator: (value: State) => states.includes(value),
  },
}

function useState(props: StateProps) {
  const { state = 'base' } = props

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

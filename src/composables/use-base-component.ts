import { ThemeComponentBaseProps } from '@/utils/base-props'
import { computed } from 'vue'

export function useBaseComponent(props: ThemeComponentBaseProps) {
  const baseClasses = computed(() => {
    const { disabled, raw, outlined, interactive } = props

    return [
      disabled ? `disabled` : '',
      raw ? 'raw' : '',
      outlined ? 'outlined' : '',
      interactive ? 'interactive' : '',
    ]
  })

  // const renderTemplate = (args: YButtonProps) => ({
  //   components: { YButton },
  //   setup() {
  //     // Define the handleClick method here
  //     const handleClick = () => {
  //       action('handleClick')()
  //       // Your actual handleClick logic if any
  //     }

  //     return {
  //       args,
  //       handleClick,
  //     }
  //   },
  //   template,
  // })

  return {
    baseClasses,
  }
}

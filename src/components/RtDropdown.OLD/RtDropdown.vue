<template>
  <div ref="rtDropdownRef" class="rt-relative rt-dropdown" :style="rtDropdownStyle">
    <!-- The dropdown trigger - we use the default slot -->
    <RtDropdownTrigger>
      <template #default>
        <slot name="default" v-bind="{ toggle, isOpen }" />
      </template>
    </RtDropdownTrigger>

    <!-- The dropdown menu - we use the named slot "dropdown" -->
    <!-- and the logic to toggle it is already handled -->
    <Transition name="slide-down">
      <RtMenu
        v-if="isOpen"
        ref="rtDropdownMenuRef"
        :z-index="'calc(var(--dropdown-z-index) + 1)'"
        class="rt-max-h-[512px]"
      >
        <template #default>
          <slot name="dropdown" />
        </template>
      </RtMenu>
    </Transition>
  </div>
</template>

<script lang="ts">
import { default as RtMenu } from '@/components/RtMenu/RtMenu.vue'
import { useDropdown } from '@/composables/dropdown'
// import { stateProps } from '@/composables/theming/state'
import './RtDropdown.css'
import { default as RtDropdownTrigger } from './RtDropdownTrigger.vue'
import { RtDropdownProps } from './types'

import { useOnClickOutside } from '@/composables/on-click-outside'
import { computed, defineComponent, SetupContext } from 'vue'

export default defineComponent({
  name: 'RtDropdown',
  components: {
    RtDropdownTrigger,
    RtMenu
  },
  // props: {
  //   ...stateProps
  // },
  setup(props: RtDropdownProps, context: SetupContext) {
    const { isOpen, toggle, rtDropdownRef, rtDropdownMenuRef, rtDropdownTriggerRef, open, close, stackIndex, zIndex } =
      useDropdown({
        props,
        context
      })
    // 1. Use generic theme composable to get classes if it fits
    // const { themeClasses } = useComponentTheme(props)
    // or use specific one
    useOnClickOutside(rtDropdownRef, close, window, rtDropdownTriggerRef)

    const rtDropdownStyle = computed(() => ({
      '--rt-dropdown-z-index': zIndex
    }))

    return {
      props,
      isOpen,
      toggle,
      rtDropdownRef,
      rtDropdownMenuRef,
      rtDropdownTriggerRef,
      open,
      close,
      stackIndex,
      rtDropdownStyle
    }
  }
})
</script>

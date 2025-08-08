<template>
  <div ref="dropdownRef" class="y-dropdown" :style="yDropdownStyle">
    <!-- The dropdown trigger - we use the default slot -->
    <YDropdownTrigger>
      <template #default>
        <slot name="default" v-bind="{ toggle, isOpen }" />
      </template>
    </YDropdownTrigger>

    <!-- The dropdown menu - we use the named slot "dropdown" -->
    <!-- and the logic to toggle it is already handled -->
    <Transition name="slide-down">
      <YMenu
        v-if="isOpen"
        ref="dropdownMenuRef"
        :z-index="'calc(var(--dropdown-z-index) + 1)'"
        class="rt-max-h-[512px]"
      >
        <template #default>
          <slot name="dropdown" />
        </template>
      </YMenu>
    </Transition>
  </div>
</template>

<script lang="ts">
import YDropdownTrigger from '@/components/YDropdown/YDropdownTrigger.vue'
import YMenu from '@/components/YMenu/YMenu.vue'
import { useDropdown } from '@/composables/dropdown'
import { useOnClickOutside } from '@/composables/on-click-outside'
import { computed, defineComponent } from 'vue'
import './YDropdown.scss'

export default defineComponent({
  name: 'YDropdown',
  components: {
    YDropdownTrigger,
    YMenu,
  },
  props: {
    hasScrollbar: {
      type: Boolean,
      default: false,
    },
    openOnHover: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    // 1. Use generic theme composable to get classes if it fits
    // const { themeClasses } = useComponentTheme(props)
    // or use specific one

    const { isOpen, toggle, dropdownRef, dropdownMenuRef, dropdownTriggerRef, close, zIndex } =
      useDropdown({
        props,
        context,
      })

    useOnClickOutside(dropdownRef, close, window, dropdownTriggerRef)
    // const { rawClasses } = useRaw(props)
    const yDropdownStyle = computed(() => ({
      '--dropdown-z-index': zIndex,
    }))
    return {
      isOpen,
      toggle,
      dropdownRef,
      dropdownMenuRef,
      dropdownTriggerRef,
      close,
      yDropdownStyle,
    }
  },
})
// const props = withDefaults(defineProps<YDropdownProps>(), {
//   hasScrollbar: false,
//   openOnHover: false,
// })

// const { isOpen, toggle, dropdownRef, dropdownMenuRef, dropdownTriggerRef, close, zIndex } =
//   useDropdown({
//     props,
//   })

// useOnClickOutside(dropdownRef, close, window, dropdownTriggerRef)
// // const { rawClasses } = useRaw(props)
// const yDropdownStyle = computed(() => ({
//   '--dropdown-z-index': zIndex,
// }))
// const getClasses = computed(() => {
//  return [variantClass.value,
//    stateClass.value,
//    colorClass.value,
//    sizeClass.value,
//    rawClasses.value,
//  ]
//})
</script>

<template>
  <YInput
    v-bind="props"
    input-class="y-input-text"
    type="text"
    :value="modelValue"
    @input="handleInput"
  />
  <!-- <div><p>qsdqs</p></div> -->
</template>

<script lang="ts">
import { YInput } from '@/components/form/YInput'
import { useInput } from '@/composables/input'
import { defineComponent, SetupContext, useAttrs } from 'vue'
import type { YInputTextProps } from './types'

export default defineComponent({
  name: 'YInputText',
  components: {
    YInput,
  },
  emits: ['update:modelValue', 'input', 'change', 'blur'],
  setup(props: YInputTextProps, context: SetupContext) {
    const attrs: Record<string, unknown> = useAttrs()
    const emit = context.emit

    const { modelValue, handleInput } = useInput({ props, attrs, emit })

    return {
      modelValue,
      props,
      handleInput,
    }
  },
})

// const model = defineModel(props ? props.modelValue : '', { type: String })
</script>

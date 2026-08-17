<template>
  <div class="y-chip-group" role="group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import type { YChipValue } from '../YChip/YChip.types'
import './YChipGroup.css'
import { yChipGroupKey, type YChipGroupProps } from './YChipGroup.types'

const props = withDefaults(defineProps<YChipGroupProps>(), {
  modelValue: () => [],
  multiple: false,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: YChipValue[]): void
}>()

function isSelected(value?: YChipValue) {
  if (value === undefined) return false
  return props.modelValue.includes(value)
}

function toggle(value?: YChipValue) {
  if (value === undefined) return

  if (props.multiple) {
    const next = isSelected(value)
      ? props.modelValue.filter((item) => item !== value)
      : [...props.modelValue, value]
    emit('update:modelValue', next)
    return
  }

  emit('update:modelValue', isSelected(value) ? [] : [value])
}

// Functions read `props.modelValue` at call time rather than a captured
// snapshot, so injected children stay in sync the same way YTimeline's
// getter-based provide does for its own group state.
provide(yChipGroupKey, {
  isSelected,
  toggle,
})
</script>

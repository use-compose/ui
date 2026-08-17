<template>
  <span
    data-compose-ui="block"
    :class="getClasses"
    role="button"
    :tabindex="isDisabled ? undefined : 0"
    :aria-pressed="isSelected"
    :aria-disabled="isDisabled ? 'true' : undefined"
    @click="handleClick"
    @keydown.enter="handleKeydown"
    @keydown.space.prevent="handleKeydown"
  >
    <slot>
      <span>YChip</span>
    </slot>

    <button
      v-if="removable"
      type="button"
      class="y-chip-remove"
      :disabled="isDisabled"
      :aria-label="removeLabel"
      @click.stop="handleRemove"
    >
      <CloseIcon :width="12" :height="12" />
    </button>
  </span>
</template>

<script setup lang="ts">
import { CloseIcon } from '@/components/icons'
import { useColor, useRaw, useSize, useState, useVariant } from '@/composables'
import { basePropsDefault } from '@/composables/component-theme'
import { computed, inject } from 'vue'
import { yChipGroupKey } from '../YChipGroup/YChipGroup.types'
import './YChip.css'
import type { YChipProps } from './YChip.types'

const props = withDefaults(defineProps<YChipProps>(), {
  ...basePropsDefault,
  // Chips exist to be clicked (selected/removed), so — unlike YTag — they
  // keep the button-style hover/active depth affordance by default.
  raw: false,
  removable: false,
  removeLabel: 'Remove',
})

const emit = defineEmits<{
  (event: 'click', payload: Event): void
  (event: 'remove', value: YChipProps['value']): void
  (event: 'update:selected', value: boolean): void
}>()

// A bare chip works standalone: no group means "not an error", just no
// shared selection state to read from.
const group = inject(yChipGroupKey, null)

const { variantClass } = useVariant(props)
const { stateClass, isDisabled } = useState(props)
const { colorClass } = useColor(props)
const { sizeClass } = useSize(props)
const { rawClasses } = useRaw(props)

const isSelected = computed(() => {
  if (group) return group.isSelected(props.value)
  return props.selected ?? false
})

const getClasses = computed(() => [
  variantClass.value,
  stateClass.value,
  colorClass.value,
  sizeClass.value,
  rawClasses.value,
  'y-chip',
  isSelected.value ? 'is-selected' : '',
  props.removable ? 'is-removable' : '',
])

function handleClick(e: Event) {
  if (isDisabled.value) return

  if (group) {
    group.toggle(props.value)
  } else {
    emit('update:selected', !isSelected.value)
  }

  emit('click', e)
}

function handleKeydown(e: Event) {
  handleClick(e)
}

function handleRemove() {
  if (isDisabled.value) return
  emit('remove', props.value)
}
</script>

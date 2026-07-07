<template>
  <YFlow :class="getClasses">
    <slot>
      <p>Default content for YStack component</p>
    </slot>
  </YFlow>
</template>

<script setup lang="ts">
import { parseGapProps, SpacingKey } from '@/components/utils'
import { computed } from 'vue'
import YFlow, { YFlowProps } from '../YFlow/YFlow.vue'
import './YStack.css'

export interface YStackProps extends YFlowProps {
  gap?: SpacingKey | string
}

const props = withDefaults(defineProps<YStackProps>(), {
  gap: 'sm',
})

const getClasses = computed(() => {
  return ['y-stack', ...parseGapProps(props.gap as SpacingKey)]
})
</script>

<template>
  <YFlow v-bind="flowProps" :class="getClasses">
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

// `gap` is consumed here (it drives the class list below) — everything else
// inherited from `YBoxProps` still needs forwarding explicitly, since
// declaring it via `defineProps` takes it out of `$attrs`. See YCenter.vue
// for the same pattern.
const flowProps = computed<YFlowProps>(() => {
  const rest: Partial<YStackProps> = { ...props }
  delete rest.gap
  return rest
})

const getClasses = computed(() => {
  return ['y-stack', ...parseGapProps(props.gap as SpacingKey)]
})
</script>

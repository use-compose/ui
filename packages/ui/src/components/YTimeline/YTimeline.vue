<template>
  <component :is="props.ordered ? 'ol' : 'ul'" :class="getClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { useColor, useVariant } from '@/composables'
import { basePropsDefault } from '@/composables/component-theme'
import { computed, provide } from 'vue'
import './YTimeline.css'
import { yTimelineKey, type YTimelineProps } from './YTimeline.types'

const props = withDefaults(defineProps<YTimelineProps>(), {
  ...basePropsDefault,
  ordered: false,
  collapsible: false,
})

// Provided through a getter rather than as a plain value so items keep
// tracking the prop — `provide(key, { collapsible: props.collapsible })`
// would snapshot it at setup and never update.
provide(yTimelineKey, {
  get collapsible() {
    return props.collapsible
  },
})

// Color/variant only, no `state`/`size`/`raw`/`data-compose-ui="block"`: the
// rail isn't a clickable block, so it skips the shared engine's
// shadow/transform styling and just reads `.primary`/`.secondary`/`.danger`
// and `.contained`/`.outlined`/`.text` directly in YTimeline.css.
const { variantClass } = useVariant(props)
const { colorClass } = useColor(props)

const getClasses = computed(() => ['y-timeline', variantClass.value, colorClass.value])
</script>

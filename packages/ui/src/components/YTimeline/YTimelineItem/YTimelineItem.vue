<template>
  <li :class="getClasses">
    <span class="y-timeline-marker" aria-hidden="true" />

    <div class="y-timeline-body">
      <p v-if="tag" class="y-timeline-tag">{{ tag }}</p>

      <div class="y-timeline-content">
        <component :is="`h${headingLevel}`" class="y-timeline-title">
          <button
            v-if="isCollapsible"
            type="button"
            class="y-timeline-toggle"
            :aria-expanded="isOpen"
            :aria-controls="descriptionId"
            @click="isOpen = !isOpen"
          >
            <YHighlightedText :active="highlighted">{{ title }}</YHighlightedText>
          </button>
          <YHighlightedText v-else :active="highlighted">{{ title }}</YHighlightedText>
        </component>

        <div v-if="hasDescription" :id="descriptionId" class="y-timeline-description">
          <slot>
            <p>{{ description }}</p>
          </slot>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import YHighlightedText from '@/components/YHighlightedText/YHighlightedText.vue'
import { computed, inject, ref, useId, useSlots } from 'vue'
import { yTimelineKey } from '../YTimeline.types'
import type { YTimelineItemProps } from './YTimelineItem.types'
import './YTimelineItem.css'

const props = withDefaults(defineProps<YTimelineItemProps>(), {
  headingLevel: 3,
  highlighted: false,
})

const slots = useSlots()
// Items are usable on their own, so a missing provider just means "not
// collapsible" rather than an error.
const timeline = inject(yTimelineKey, { collapsible: false })

const descriptionId = useId()
const isOpen = ref(false)

const hasDescription = computed(() => Boolean(props.description || slots.default))
// A toggle with nothing to reveal would be a button that does nothing, and
// `aria-controls` would point at an element that isn't rendered.
const isCollapsible = computed(() => timeline.collapsible && hasDescription.value)

// `is-` prefixed rather than bare `highlighted`/`open`: `.highlighted` is a
// global class owned by YHighlightedText (uppercase, line-height, position),
// so a bare modifier here would inherit all of it.
const getClasses = computed(() => [
  'y-timeline-item',
  props.highlighted ? 'is-highlighted' : '',
  isCollapsible.value ? 'is-collapsible' : '',
  isCollapsible.value && isOpen.value ? 'is-open' : '',
])
</script>

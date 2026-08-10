<template>
  <article
    class="card position-relative overflow-hidden radius-medium"
    :class="{ raw: !isInteractive }"
    data-compose-ui="block"
  >
    <div v-if="hasMedia" class="card-media overflow-hidden">
      <slot name="image">
        <img v-if="src" :src="src" :alt="alt ?? ''" class="width-full height-full" />
      </slot>
    </div>

    <YStack class="card-body padding-md">
      <header v-if="hasHeader" class="card-header">
        <slot name="header">
          <component :is="`h${headingLevel}`" class="card-title">
            <a v-if="href" :href="href" class="card-link">{{ title }}</a>
            <span v-else>{{ title }}</span>
          </component>
        </slot>
      </header>

      <div v-if="hasContent">
        <slot>
          <p v-if="description" style="margin: 0">{{ description }}</p>
        </slot>
      </div>

      <footer v-if="hasFooter" class="cluster card-footer">
        <div v-if="slots.tags" class="cluster card-tags">
          <slot name="tags" />
        </div>
        <div v-if="slots.actions" class="cluster card-actions">
          <slot name="actions" />
        </div>
        <slot name="footer" />
      </footer>
    </YStack>
  </article>
</template>

<script setup lang="ts">
import { YStack } from '@/components/cube'
import { computed, useSlots } from 'vue'
import './Card.css'

export interface CardProps {
  title?: string
  description?: string
  href?: string
  src?: string
  alt?: string
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  clickable?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  headingLevel: 2,
  clickable: false,
})

const slots = useSlots()

// A card only earns the button-style hover/active depth affordance when it's
// actually clickable — otherwise it reads as interactive without being so.
const isInteractive = computed(() => props.clickable || !!props.href)

const hasMedia = computed(() => !!slots.image || !!props.src)
const hasHeader = computed(() => !!slots.header || !!props.title)
const hasContent = computed(() => !!slots.default || !!props.description)
const hasFooter = computed(() => !!slots.tags || !!slots.actions || !!slots.footer)
</script>

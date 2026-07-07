<template>
  <article class="card position-relative overflow-hidden radius-medium" data-compose-ui="block">
    <div v-if="hasMedia" class="card_media overflow-hidden">
      <slot name="image">
        <img v-if="src" :src="src" :alt="alt ?? ''" class="width-full height-full" />
      </slot>
    </div>

    <YStack class="card_body padding-md">
      <header v-if="hasHeader" class="card_header">
        <slot name="header">
          <component :is="`h${headingLevel}`" class="card_title">
            <a v-if="href" :href="href" class="card_link">{{ title }}</a>
            <span v-else>{{ title }}</span>
          </component>
        </slot>
      </header>

      <div v-if="hasContent">
        <slot>
          <p v-if="description" style="margin: 0">{{ description }}</p>
        </slot>
      </div>

      <footer v-if="hasFooter" class="cluster card_footer">
        <div v-if="slots.tags" class="cluster card_tags">
          <slot name="tags" />
        </div>
        <div v-if="slots.actions" class="cluster card_actions">
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

const hasMedia = computed(() => !!slots.image || !!props.src)
const hasHeader = computed(() => !!slots.header || !!props.title)
const hasContent = computed(() => !!slots.default || !!props.description)
const hasFooter = computed(() => !!slots.tags || !!slots.actions || !!slots.footer)
</script>

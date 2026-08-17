<template>
  <article
    class="y-card position-relative overflow-hidden radius-medium"
    :class="{ 'y-card-flat': props.flat }"
  >
    <div v-if="slots.media" class="y-card-media" aria-hidden="true">
      <slot name="media" />
    </div>

    <YStack class="padding-md">
      <p v-if="props.tag" class="text-caption margin-t-0 margin-b-0">{{ props.tag }}</p>

      <component :is="`h${props.headingLevel}`" v-if="props.title" class="margin-t-0 margin-b-0">
        <a v-if="props.href" :href="props.href" class="y-card-link">{{ props.title }}</a>
        <span v-else>{{ props.title }}</span>
      </component>

      <slot />

      <p v-if="slots.meta" class="y-card-interactive text-small margin-t-0 margin-b-0">
        <slot name="meta" />
      </p>
    </YStack>
  </article>
</template>

<script setup lang="ts">
import { YStack } from '@/components/cube'
import { useSlots } from 'vue'
import './YCard.css'
import type { YCardProps } from './YCard.types'

const props = withDefaults(defineProps<YCardProps>(), {
  headingLevel: 3,
  flat: false,
})
const slots = useSlots()
</script>

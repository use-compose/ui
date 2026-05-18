<template>
  <YFlow class="y-theme-switcher">
    <YSection v-for="group in groups" :key="group.key" :title="group.title">
      <YRow type="switcher">
        <button
          v-for="[name, val] in group.entries"
          :key="name"
          class="y-theme-switcher__btn"
          :class="{ active: selections[group.key] === val }"
          @click="select(group.key, val, group.flatCategory)"
        >
          {{ name }}
        </button>
      </YRow>
    </YSection>
  </YFlow>
</template>

<script setup lang="ts">
import { tokens } from '@/assets/css/themes/tokens/types/tokens.tree'
import { basePropsDefault } from '@/composables/component-theme'
import { useStorage } from '@/composables/use-storage'
import { useTokens, type TokenCategory } from '@/composables/use-theme-tokens'
import { computed, reactive } from 'vue'
import YFlow from '../YFlow/YFlow.vue'
import YRow from '../YRow/YRow.vue'
import YSection from '../YSection/YSection.vue'
import type { YThemeSwitcherProps } from './types'
import './YThemeSwitcher.css'

const props = withDefaults(defineProps<YThemeSwitcherProps>(), {
  ...basePropsDefault,
  border: true,
  spacing: true,
  radius: true,
  font: true,
  height: false,
  margin: false,
})

// Token instances for flat categories (reactivity + persistence via useStorage)
const flatCategories = ['spacing', 'radius'] as const
const tokenInstances = useTokens([...flatCategories])

// Extract leaf entries (string/number values only) from an object
function leafEntries(obj: object): [string, string][] {
  return Object.entries(obj)
    .filter(([, v]) => typeof v === 'string' || typeof v === 'number')
    .map(([k, v]) => [k, String(v)])
}

// Extract nested sub-groups that have leaf entries
function subGroupEntries(obj: object): [string, [string, string][]][] {
  return Object.entries(obj)
    .filter(([, v]) => typeof v === 'object' && v !== null && !Array.isArray(v))
    .map(([k, v]) => [k, leafEntries(v as object)] as [string, [string, string][]])
    .filter(([, entries]) => entries.length > 0)
}

interface SwitcherGroup {
  key: string
  title: string
  entries: [string, string][]
  flatCategory?: TokenCategory
}

const groups = computed<SwitcherGroup[]>(() => {
  const result: SwitcherGroup[] = []

  if (props.spacing) {
    result.push({
      key: 'spacing',
      title: 'Spacing',
      entries: leafEntries(tokens.spacing),
      flatCategory: 'spacing',
    })
  }

  if (props.radius) {
    result.push({
      key: 'radius',
      title: 'Radius',
      entries: leafEntries(tokens.radius),
      flatCategory: 'radius',
    })
  }

  if (props.border) {
    for (const [sub, entries] of subGroupEntries(tokens.border)) {
      result.push({
        key: `border-${sub}`,
        title: `Border ${sub}`,
        entries,
      })
    }
  }

  if (props.font) {
    for (const [sub, entries] of subGroupEntries(tokens.font)) {
      result.push({
        key: `font-${sub}`,
        title: `Font ${sub}`,
        entries,
      })
    }
  }

  return result
})

// Unified selection state for all groups
const selections = reactive<Record<string, string>>({})

// Restore flat category selections from token instances (persisted via useToken → useStorage)
for (const cat of flatCategories) {
  const val = tokenInstances[cat]?.token.value
  if (val) selections[cat] = String(val)
}

// Restore nested category selections from storage
for (const group of groups.value) {
  if (!group.flatCategory) {
    const stored = useStorage<string>(`token:${group.key}`).get()
    if (stored) selections[group.key] = stored
  }
}

function select(groupKey: string, val: string, flatCategory?: TokenCategory) {
  selections[groupKey] = val

  if (flatCategory) {
    // Flat categories: update token instance (reactivity + persistence)
    const instance = tokenInstances[flatCategory]
    if (instance) {
      instance.setToken({ value: val as any })
    }
  } else {
    // Nested categories: persist directly via useStorage
    useStorage<string>(`token:${groupKey}`).set(val)
  }
}
</script>

<template>
  <div v-if="editor" class="y-editor-toolbar">
    <RtEditorMenuComponent
      v-for="(item, key) in Object.values(menuComponents.visibleComponents)"
      :key="`${key}-${item.name}`"
      :menu-component="item"
      :editor="editor"
    >
    </RtEditorMenuComponent>
  </div>
</template>

<script setup lang="ts">
import { Editor } from '@tiptap/vue-3'
import { menuComponents } from '../utils/menu'

const { editor } = defineProps<{
  editor: Editor
}>()

// function isActive(format: string, attributes = {}) {
//   return editor.isActive(format, attributes)
// }

// const getMenuItemClass = (format: string, attributes = {}) => {
//   return {
//     active: isActive(format, attributes),
//   }
// }
</script>

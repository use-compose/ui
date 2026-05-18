<template>
  <div class="y-editor">
    <YEditorMenu v-if="editor" :editor="editor" />
    <EditorContent :editor="editor" class="y-editor-content" />
  </div>
</template>

<script setup lang="ts">
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { watch } from 'vue'
import YEditorMenu from './menu/YEditorMenu.vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editor = useEditor({
  content: props.modelValue ?? '',
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(
  () => props.modelValue,
  (val) => {
    if (!editor.value) return
    if (val === editor.value.getHTML()) return
    editor.value.commands.setContent(val ?? '', false)
  },
)
</script>

<style scoped>
.y-editor {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}

.y-editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid #d1d5db;
  background: #f9fafb;
}

.y-editor-toolbar button {
  padding: 3px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  background: white;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
}

.y-editor-toolbar button:hover {
  background: #f3f4f6;
}

.y-editor-toolbar button.active {
  background: #111827;
  color: white;
  border-color: #111827;
}

.y-editor-content {
  padding: 12px;
  min-height: 140px;
  outline: none;
}
</style>

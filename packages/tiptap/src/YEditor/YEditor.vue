<template>
  <div class="y-editor">
    <YEditorMenu v-if="editor" :editor="editor" :menu-options="menuOptions" />
    <div class="y-editor-body">
      <YEditorLinkFloatingMenu v-if="editor && isLinkMenuVisible" :editor="editor" />
      <EditorContent :editor="editor" class="y-editor-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { buildExtensions } from './utils/menu'
import { defaultMenuComponentsList } from './utils/menu/extensions-list'
import YEditorMenu from './menu/YEditorMenu.vue'
import YEditorLinkFloatingMenu from './menu/link/YEditorLinkFloatingMenu.vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  menuOptions?: string[]
  autofocus?: boolean
  isDisabled?: boolean
}>(), {
  modelValue: '',
  menuOptions: () => defaultMenuComponentsList,
  autofocus: false,
  isDisabled: false,
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const extensions = buildExtensions(props.menuOptions)

const editor = useEditor({
  content: props.modelValue,
  extensions,
  autofocus: props.autofocus,
  editable: !props.isDisabled,
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

const isLinkMenuVisible = computed(
  () => editor.value?.storage?.linkMenu?.isMenuVisible ?? false
)

watch(() => props.isDisabled, (val) => editor.value?.setEditable(!val))

watch(
  () => props.modelValue,
  (val) => {
    if (!editor.value || val === editor.value.getHTML()) return
    editor.value.commands.setContent(val ?? '', false)
  },
)

onBeforeUnmount(() => editor.value?.destroy())
</script>

<style scoped>
.y-editor {
  border: 1px solid var(--color-neutral-200, #d1d5db);
  border-radius: 6px;
  overflow: hidden;
}

.y-editor-body {
  position: relative;
}

.y-editor-content {
  padding: 12px;
  min-height: 140px;
  outline: none;
}
</style>

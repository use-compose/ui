<template>
  <YEditorDropDown ref="dropdownRef">
    <PictosEditeurAlignerDroiteIcon v-if="editor.isActive({ textAlign: 'right' })" size="xs" />
    <PictosEditeurAlignerMilieuIcon v-else-if="editor.isActive({ textAlign: 'center' })" size="xs" />
    <PictosEditeurAlignerGaucheIcon v-else size="xs" />

    <template #dropdown="{ isOpen }">
      <YEditorDropdownMenu v-if="isOpen" :has-scrollbar="false">
        <YEditorMenuGroup orientation="horizontal">
          <YEditorButton :is-active="editor.isActive({ textAlign: 'left' })" @click="editor.chain().focus().setTextAlign('left').run()">
            <PictosEditeurAlignerGaucheIcon size="xs" />
          </YEditorButton>
          <YEditorButton :is-active="editor.isActive({ textAlign: 'center' })" @click="editor.chain().focus().setTextAlign('center').run()">
            <PictosEditeurAlignerMilieuIcon size="xs" />
          </YEditorButton>
          <YEditorButton :is-active="editor.isActive({ textAlign: 'right' })" @click="editor.chain().focus().setTextAlign('right').run()">
            <PictosEditeurAlignerDroiteIcon size="xs" />
          </YEditorButton>
        </YEditorMenuGroup>
      </YEditorDropdownMenu>
    </template>
  </YEditorDropDown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { useDropdown } from '../composables/use-dropdown'
import {
  PictosEditeurAlignerDroiteIcon,
  PictosEditeurAlignerGaucheIcon,
  PictosEditeurAlignerMilieuIcon,
} from '../compose-icons'
import YEditorButton from '../YEditorButton.vue'
import YEditorDropDown from './YEditorDropDown.vue'
import YEditorDropdownMenu from './YEditorDropdownMenu.vue'
import YEditorMenuGroup from './YEditorMenuGroup.vue'

defineProps<{ editor: Editor }>()

const dropdownRef = ref<EventTarget | null>(null)
useDropdown({ dropdownRef, hasScrollbar: false })
</script>

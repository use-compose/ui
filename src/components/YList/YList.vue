<template>
  <div
    class="timeline-element"
    :class="{
      // highlighted: element.highlighted,
      open: open,
    }"
    @click="handleOpenElement"
  >
    <span class="dot"></span>
    <div class="display-flex">
      <div
        class="element-container"
        :style="{
          borderLeft: index === 0 && 'none',
        }"
      >
        <p class="font-gotham tag text-9">{{ tag }}</p>
        <div
          class="element-content"
          :style="{
            borderLeft: index !== 0 && 'none',
          }"
        >
          <HighlightedText level="h3" class="element-title" :active="highlighted">
            {{ title }}
          </HighlightedText>
          <p class="element-description">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="lastIndex" class="black-dot"></div>
  </div>
</template>

<script setup lang="ts">
import HighlightedText from '@/components/YHighlightedText/YHighlightedText.vue'
import { ref } from 'vue'

const props = defineProps<{
  index: number
  tag?: string
  title: string
  description?: string
  highlighted?: boolean
  lastIndex: boolean
}>()

const open = ref(false)

const handleOpenElement = () => {
  if (window.innerWidth <= 768) {
    open.value = !open.value
  }
}
</script>

<style scoped>
.timeline-element {
  position: relative;

  .dot {
    display: block;
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 2px solid var(--theme-current-color);
    background: var(--theme-current-color);
    top: 18.5px;
    left: -11.5px;
  }

  &.highlighted {
    .dot {
      background: var(--color-white);
      width: 35px;
      height: 35px;
      top: 13.5px;
      left: -16.5px;
    }
  }

  .element-container {
    border-left: 2px solid var(--theme-current-color);

    .tag {
      padding-left: 30px;
      margin-bottom: 6px;
      font-weight: bold;
      color: var(--theme-current-color);
    }

    .element-content {
      padding: 0 0 30px 30px;
      border-left: 2px solid var(--theme-current-color);

      .element-title,
      .element-description {
        ::placeholder {
          /* Chrome, Firefox, Opera, Safari 10.1+ */
          color: var(--color-black);
          opacity: 0.5; /* Firefox */
        }

        :-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: var(--color-black);
          opacity: 0.5;
        }

        ::-ms-input-placeholder {
          /* Microsoft Edge */
          color: var(--color-black);
          opacity: 0.5;
        }
      }

      .element-description {
        display: none;
      }
    }
  }

  .black-dot {
    position: absolute;
    bottom: 0;
    left: -4px;
    width: 10px;
    height: 10px;
    background-color: var(--color-black);
    border-radius: 50%;
  }

  &.open {
    .element-container .element-content .element-description {
      display: block;
    }
  }
}
</style>

import { defineComponent, h } from 'vue';
import { useComposeIcon } from 'nuxt-compose-icons/composables';
import type { ComposeIconProps } from 'nuxt-compose-icons/types';

export default defineComponent({
  name: 'ReduireIcon',
  props: {
    color: String,
    stroke: String,
    strokeWidth: [String, Number],
    fill: String,
    size: {
      type: String,
      default: 'md'
    }
  },
  setup(props: ComposeIconProps) {
    const { buildSvgAttributes } = useComposeIcon(props);
    const svgAttributes = {
  "width": 41,
  "height": 42,
  "fill": "none",
  "class": "compose-icon",
  "viewBox": "0 0 41 42"
};

    return () => h('svg', buildSvgAttributes(svgAttributes), [
      h('path', {
  "stroke": "var(--icon-stroke, #000)",
  "stroke-linecap": "round",
  "stroke-width": "var(--icon-stroke-width, 3)",
  "d": "M39 28.5H28M28 28.5V39.5M2 13.5H13M13 13.5V2.5"
}, [])
    ]);
  }
});
 
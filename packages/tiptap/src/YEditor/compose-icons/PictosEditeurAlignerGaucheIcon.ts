import { defineComponent, h } from 'vue';
import { useComposeIcon } from 'nuxt-compose-icons/composables';
import type { ComposeIconProps } from 'nuxt-compose-icons/types';

export default defineComponent({
  name: 'PictosEditeurAlignerGaucheIcon',
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
  "width": 82,
  "height": 82,
  "fill": "none",
  "class": "compose-icon",
  "viewBox": "0 0 82 82"
};

    return () => h('svg', buildSvgAttributes(svgAttributes), [
      h('path', {
  "stroke": "var(--icon-stroke, #000)",
  "stroke-miterlimit": "10",
  "stroke-width": "var(--icon-stroke-width, 3)",
  "d": "M14.22 11.5H67.51M14.22 26.11H49.75M14.22 40.72H67.51M14.22 55.34H49.75M14.22 69.95H60.55"
}, [])
    ]);
  }
});
 
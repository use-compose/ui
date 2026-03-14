# Assets structure

## Mixins and functions to initialize CSS Custom Properties

Source [CSS Custom Properties (vars) with SASS/SCSS, a practical architecture strategy](https://dev.to/felipperegazio/css-custom-properties-vars-with-sass-scss-a-practical-architecture-strategy-1m88)

## Theming with OKlch color space

Color palette - [huetone](https://huetone.ardov.me/)

3 main props:

### Variant: contained, outlined, text - will play on the Lightness

### Color: primary, secondary, danger - will play on the Chroma

### State: base, hover, focus/focus-visible, active, disabled - will play on the Lightness

With base Design Tokens for initial changing values: [style-dictionary](https://github.com/amzn/style-dictionary/tree/main)

CSS is used to defines initial tokens and runtime calculations, allowing dynamic theming and runtime color changes.

SCSS Mixins will allow different variations of Lightness/Chroma/Hue based on combination of Color/Variant/State.

e.g. in the Variants mixins:

```scss
@mixin outlined {
  &.outlined {
    // ... some styling rules

    // Use the state mixin to apply some specific styles for the outlined variant combined with the hover state
    @include state.hover {
      @include mixins.component(bg-opacity, var(--state-active-bg-lightness));
    }
  }
}
```

Sources:

- [Switch font color for different backgrounds with CSS](https://css-tricks.com/switch-font-color-for-different-backgrounds-with-css/)
- [Creating Color Themes With Custom Properties, HSL, and a Little calc()](https://css-tricks.com/creating-color-themes-with-custom-properties-hsl-and-a-little-calc/)

### Conditional / Boolean value in CSS

- [Pseudo-boolean CSS custom properties](https://keithclark.co.uk/articles/pseudo-boolean-css-custom-properties/)

### CSS-only Type Grinding

- [(not fully used) Cyclic Dependency Space Toggles](https://kizu.dev/cyclic-toggles/)

- [Inline conditionals in CSS, now?](https://lea.verou.me/blog/2024/css-conditionals-now/)

- [CSS-only Type Grinding](https://www.bitovi.com/blog/css-only-type-grinding-casting-tokens-into-useful-values)

```css
@property --color {
  syntax: 'primary | secondary | danger';
  initial-value: primary;
  inherits: true;
}

@property --primary {
  syntax: '<integer>';
  initial-value: 1;
  inherits: true;
}

@property --secondary {
  syntax: '<integer>';
  initial-value: 1;
  inherits: true;
}

@property --danger {
  syntax: '<integer>';
  initial-value: 1;
  inherits: true;
}

@property --primary-else-0 {
  syntax: 'primary | <integer>';
  initial-value: 0;
  inherits: true;
}

@property --secondary-else-0 {
  syntax: 'secondary | <integer>';
  initial-value: 0;
  inherits: true;
}

@property --danger-else-0 {
  syntax: 'danger | <integer>';
  initial-value: 0;
  inherits: true;
}

--danger-else-0: var(--color);
--danger: var(--danger-else-0);

--primary-else-0: var(--color);
--primary: var(--primary-else-0);

--secondary-else-0: var(--color);
--secondary: var(--secondary-else-0);

--theme-current-color: color-mix(
  in srgb,
  var(--color-primary) calc(var(--primary) * 100%),
  color-mix(
    in srgb,
    var(--color-secondary) calc(var(--secondary) * 100%),
    var(--color-danger) calc(var(--danger) * 100%)
  )
);
```

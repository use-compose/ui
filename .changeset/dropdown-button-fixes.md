---
'@use-compose/ui': patch
---

Fixed dropdown positioning, button click-effect glitches, and false
clickable affordance:

- `YDropdown`: the menu had no `position: absolute`, so it pushed layout
  instead of floating over the trigger. Adds absolute positioning plus a
  left/right `position` prop.
- compose-ui token engine: outlined/raw buttons kept the brutalist
  `translate()` click effect even with box-shadow hidden, reading as an
  unwanted jiggle. Gates the transform by the same is-box-shadow-hidden
  flag as the shadow itself.
- `YButton`: the `:focus` outline and the state engine's active-state
  box-shadow both drew a rectangle on click at once. Outline is now
  suppressed while `:active`.
- `YModal` footer buttons: `border: var(--component-border)` referenced an
  undefined custom property, resetting the border to `none` and making
  adjacent buttons merge into one block. Points at the real,
  already-computed border vars instead.
- `YTag`/`Card`: only apply the button-style hover/active depth effect
  when actually interactive (`YTag` defaults raw; `Card` gates on
  `href`/`clickable`), so static tags and cards stop reading as clickable.
- `YParallax`: was an unimplemented stub; ports the CSS-only
  perspective/`translateZ` technique from brutally-css with a
  back/default-slot API.

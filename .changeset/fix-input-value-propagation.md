---
'@use-compose/ui': patch
---

Fixed `v-model` not propagating on every form input component (`YInput`,
`YInputText`, `YCheckbox`, `YColorInput`, `YDateInput`, `YTimeInput`,
`YDateTimeInput`) — typing, checking a box, or picking a date/color never
wrote back to the bound value.

Root cause: `YInput`'s native `<input>` used `v-on="handleEvent"`, binding a
single function where `v-on` without an argument requires an event-name-keyed
object. Vue silently dropped it, so the input had no write-back path at all.
A second, independent bug in `useInput()`'s re-emit watcher (`newValue !==
modelValue.value`, which is always false since `newValue` *is*
`modelValue.value`) meant fixing `YInput` alone didn't fix wrappers built on
top of it — `useInput()` is now a small writable `computed` instead.

`YCheckbox` also emitted a checkbox's `.value` (e.g. `"on"`) instead of
`.checked` for its `change` event. `YColorInput` was rewritten to match the
fixed contract while preserving its "commit on `change`, not on every drag
tick" behavior.

Deleted `use-events.ts`, an unused, more-correct parallel implementation of
the same thing that nothing ever called.

# RtDropdown Component

## Usage

```vue
<RtDropdown>
  <RtButton>Open Dropdown</RtButton>

  <template #dropdown>
    <ul>
      <li>
        <RtCheckbox v-model="checked" label="Checkbox in Dropdown" />
      </li>
      <li>
        <RtRadio v-model="radioModel" label="Radio in Dropdown" :check-value="true" />
      </li>
      <li>
        <RtInput v-model="inputString" type="text" placeholder="Input in Dropdown" />
      </li>
      <li>
        <RtButton>Button in Dropdown</RtButton>
      </li>
    </ul>
  </template>
</RtDropdown>
```

## Props

| Prop           | Type      | Default    | Description                                                       |
| -------------- | --------- | ---------- | ----------------------------------------------------------------- |
| `isOpen`       | `boolean` | `false`    | Controls the open state of the dropdown                           |
| `placement`    | `string`  | `'bottom'` | Placement of the dropdown relative to the trigger                 |
| `hasScrollbar` | `boolean` | `false`    | Whether the dropdown should have a scrollbar if content overflows |
| `zIndex`       | `number`  | `1000`     | Z-index of the dropdown for stacking context                      |

## Slots

| Slot       | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `default`  | The trigger element for the dropdown                         |
| `dropdown` | The content of the dropdown, shown when the dropdown is open |

## Notes

- The `RtDropdown` component is a wrapper that uses a composable to manage the dropdown's state and behavior and ensuring the correct context for the dropdown menu and trigger.
- The `RtDropdownTrigger` component is used to trigger the dropdown. It is automatically provided when using default slot.
- The `RtMenu` component is used to display the dropdown content.
  - It is automatically provided when using the named slot `dropdown`.
  - It's completely separated from the Dropdown logic and can be used independently.
  - `useOnClickOutside` is used to close the dropdown menu when clicking outside of it.
    - It is also not part of the `RtMenu` component itself but is handled by the `RtDropdown` component through template refs.

# pagination.ts → `usePagination`

Created a pagination composable that handle list as follow:

- From the totalCount, create an array of the size of `totalCount` and fill it with `null` when not fetched yet.
- If we change page, then the batch based on the limit is fetched and replace `null` values in the list
  e.g. if we are on page 1 and limit is 10, and total is 29

```tsx
// length 29 and page 1 19 null
const list = [
  { ...object1 },
  { ...object2 },
  { ...object3 },
  { ...object4 },
  { ...object5 },
  { ...object6 },
  { ...object7 },
  { ...object8 },
  { ...object9 },
  { ...object10 },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]
```

Then if we go to page 2 (with limit 10), we fetch the next 10 objects and replace the `null` values:

```tsx
const list = [
  { ...object1 },
  { ...object2 },
  { ...object3 },
  { ...object4 },
  { ...object5 },
  { ...object6 },
  { ...object7 },
  { ...object8 },
  { ...object9 },
  { ...object10 },
  { ...object11 },
  { ...object12 },
  { ...object13 },
  { ...object14 },
  { ...object15 },
  { ...object16 },
  { ...object17 },
  { ...object18 },
  { ...object19 },
  { ...object20 },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]
```

This way, if we come back to page 1 when on page 2, we still have the data for page 1 available without needing to refetch it.
If we go to page 3, then we would need to fetch new data

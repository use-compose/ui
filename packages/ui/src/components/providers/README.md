# Providers

TODO-NEW-DESIGN-SYSTEM: To keep this approach or not with Flowbite

Components that provide context to their children.
Pros:

- Avoid prop drilling
- Avoid global state by referring to a specific context
- Allow reusability and multiple existenced of components (e.g. multiple modals, toasts, etc.) without conflicts
- Avoid use / dependency on Plugins: no modification on global state or configuration

Cons:

- More complex to understand and use
- Needs to be used in every layouts (even though we mostly use one in our Nuxt App)
- May be Flowbite has a better approach to this, so far I found this one just easier to implement and understand

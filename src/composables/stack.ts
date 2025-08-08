import { computed, ref } from 'vue'

/*
 * Used to manage components that are stacked on top of each other, such as modals or drawers.
 * The stack is a simple array that stores the instances of the components that are uniquely identified by a symbol.
 */
const stack = ref<symbol[]>([]) // Stores unique symbols like modal instances
console.log('📟 - stack → ', stack)

export function useStack() {
  function register(instance: symbol) {
    if (!stack.value.includes(instance)) {
      stack.value.push(instance)
    }
  }

  function unregister(instance: symbol) {
    const index = stack.value.indexOf(instance)
    if (index !== -1) {
      stack.value.splice(index, 1)
    }
  }

  function getIndex(instance: symbol): number {
    return stack.value.indexOf(instance)
  }

  // Returns the index of the instance in the stack to determine its z-index
  // The higher the index, the higher the z-index (modal on top of each others ofr example)
  // We don't use computed to avoid recalculating the z-index for each instance as it will be the same
  function getZIndex(instance: symbol, base = 1000, step = 10) {
    const index = getIndex(instance)
    return base + index * step
  }
  console.log('stack → ', stack.value)
  const stackCount = computed(() => stack.value.length)

  return {
    register,
    unregister,
    getIndex,
    getZIndex,
    stackCount,
  }
}

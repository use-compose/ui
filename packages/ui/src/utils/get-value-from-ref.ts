import { toRef } from 'vue'
/*
 * Initially inspired from VueUse
 * https://github.com/vueuse/vueuse/blob/main/packages/shared/toValue/index.ts
 * https://github.com/vueuse/vueuse/blob/main/packages/shared/utils/types.ts
 *
 * But will be part of the reactivity utilities of Vue 3 (3.3+)
 * https://vuejs.org/api/reactivity-utilities.html#tovalue
 *
 * The last function getValueFromRef is an extended version that also supports Vue components as ref
 * TODO-NUXT-3: once we upgrade to Vue 3.3+, remove the three first typing declarations and import them from vue
 */

import { isRef, Ref, unref, VueElement } from 'vue'

/**
 * Any function
 */
export type AnyFn<T> = (...args: T[]) => T

/**
 * Maybe it's a ref, or a plain value
 */
export type MaybeRef<T> = T | Ref<T>

/**
 * Maybe it's a ref, or a plain value, or a getter function
 */
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)

/**
 * @param source - A getter, an existing ref, or a non-function value.
 * @returns The value returned by the getter, or the value itself if not a getter.
 *
 * In addition to the toValue() utility of Vue https://vuejs.org/api/reactivity-utilities.html#tovalue
 * This function also accepts a source that can be a ref to a Vue component
 */

export function getValueFromRef<T>(source: MaybeRefOrGetter<T>): T {
  if (typeof source === 'function') {
    return (source as AnyFn<T>)()
  }
  if (isRef(source)) {
    const sourceRef = toRef(source)
    return sourceRef.value
  }

  const unrefSource = unref(source)

  // Custom additional condition that, if after applying unref on the source (which returns the ref value or the source itself if it's not a ref)
  // check if the result is an object and contains a '_isVue' property in it, then we return the $el property which will contains the desired value
  if (unrefSource && typeof unrefSource === 'object' && '_isVue' in unrefSource) {
    // return (unrefSource as unknown as Vue & { $el: T }).$el
    return (unrefSource as unknown as VueElement & { $el: T }).$el
  }

  return unrefSource
}

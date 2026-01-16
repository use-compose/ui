export function findHTMLElement(value: unknown): HTMLElement | null {
  if (!value) return null

  // Ref / computed / getter already unwrapped before calling this
  if (value instanceof HTMLElement) return value

  if (typeof value === 'object') {
    // Preferred: exposed el
    if ('el' in value) {
      return findHTMLElement((value as any).el)
    }

    // Fallback: component $el (only recurse, don't assume)
    if ('$el' in value) {
      return findHTMLElement((value as any).$el)
    }
  }

  return null
}

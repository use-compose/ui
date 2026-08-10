// source: CSS-Tricks - Prevent Page Scrolling When a Modal is Open
// and comment https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/#comment-1713778

export { allowScroll, preventScroll }

// Prevent scrolling when a modal is open for example
function preventScroll() {
  if (typeof document === 'undefined') return

  const body = document.body
  body.style.height = '100svh'
  body.style.overflowY = 'hidden'
  body.style.overscrollBehavior = 'contain'
}

// Re-enable scrolling when the modal is closed
function allowScroll() {
  if (typeof document === 'undefined') return

  const body = document.body
  body.style.height = 'auto'
  body.style.overflowY = 'auto'
  body.style.overscrollBehavior = 'auto'
}

export { isClientSide }

function isClientSide() {
  return typeof window !== 'undefined'
}

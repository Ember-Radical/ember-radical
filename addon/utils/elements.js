/**
 * Determine if a given element is a child of a given parent.
 * @param {Element} child
 * @param {Element} parent
 */

export function isChild(child, parent) {
  let { parentNode } = child
  while (parentNode) {
    if (parentNode === parent) {
      return true
    }
    parentNode = parentNode.parentNode
  }
  return false
}

/**
 * Determine the outerHeight including margins of an element
 * @param {Element} el
 */
export function outerHeight(el) {
  const height = el.offsetHeight
  const { marginTop, marginBottom } = getComputedStyle(el)
  return height + parseInt(marginTop, 10) + parseInt(marginBottom, 10)
}

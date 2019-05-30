import tabbable from 'tabbable'

/**
 * @class Utils.Listeners
 * @constructor
 */

/**
 * Since we are using closure actions as the actual listener, we need to ensure that
 * they are the same closure action when we add or remove them from the DOM.
 * So we create the closure action and store it in this hash. Then when we go to
 * remove the callback it is the same reference.
 */
const escapeCallbackHash = {}

/**
 * Handle binding a listener to an element that calls a callback (typically a
 * close method) when the escape key is pressed.
 * @method closeOnEscape
 * @param {string} namespace Unique namespace for the listener
 * @param {Function} cb      The method to call when the escape key is pressed
 * @return {undefined}
 */
export function bindOnEscape(namespace, cb) {
  if (!escapeCallbackHash[namespace]) {
    escapeCallbackHash[namespace] = evt => {
      if (evt.which === 27) {
        return cb()
      }
    }
  } else return
  document.addEventListener('keydown', escapeCallbackHash[namespace])
}

/**
 * Handle unbinding escape listener.
 * @method unbindOnEscape
 * @param {string} namespace Unique namespace for the listener
 * @return {undefined}
 */
export function unbindOnEscape(namespace) {
  if (!escapeCallbackHash[namespace]) return
  document.removeEventListener('keydown', escapeCallbackHash[namespace])
  delete escapeCallbackHash[namespace]
}

function tabLock(evt) {
  const { shiftKey, which, target } = evt
  if (which === 9) {
    const allTabbableItems = tabbable(this)
    const firstItem = allTabbableItems[0]
    const lastItem = allTabbableItems[allTabbableItems.length - 1]
    if (shiftKey) {
      if (target === firstItem) {
        evt.preventDefault()
        lastItem.focus()
      }
    } else if (target === lastItem) {
      evt.preventDefault()
      firstItem.focus()
    }
  }
}

export function bindTabLock(element) {
  element.addEventListener('keydown', tabLock)
}

export function unbindTabLock(element) {
  element.removeEventListener('keydown', tabLock)
}

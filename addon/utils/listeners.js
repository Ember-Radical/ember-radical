import $ from 'jquery'
import tabbable from 'tabbable'

/**
 * @class Utils.Listeners
 * @constructor
 */

/**
 * Handle binding a listener to an element that calls a callback (typically a
 * close method) when the escape key is pressed.
 * @method closeOnEscape
 * @param {string} namespace Unique namespace for the listener
 * @param {Function} cb      The method to call when the escape key is pressed
 * @return {undefined}
 */
export function bindOnEscape(namespace, cb) {
  $(document).bind(`keydown.${namespace}`, evt => {
    if (evt.which === 27) {
      return cb()
    }
  })
}

/**
 * Handle unbinding escape listener.
 * @method unbindOnEscape
 * @param {string} namespace Unique namespace for the listener
 * @return {undefined}
 */
export function unbindOnEscape(namespace) {
  $(document).unbind(`keydown.${namespace}`)
}

function tabLock(evt) {
  const { shiftKey, which, target } = evt
  if (which === 9) {
    const allTabbableItems = tabbable(this)
    const firstItem = allTabbableItems.shift()
    const lastItem = allTabbableItems.pop()
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

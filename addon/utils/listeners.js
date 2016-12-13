import $ from 'jquery';

/**
 * Handle binding a listener to an element that calls a callback (typically a
 * close method) when the escape key is pressed.
 * @method closeOnEscape
 * @param {string} namespace Unique namespace for the listener
 * @param {Function} cb      The method to call when the escape key is pressed
 * @return {undefined}
 */
export function bindOnEscape(namespace, cb) {
  $(document).bind(`keydown.${namespace}`, (evt) => {
    if (evt.which === 27) {
      cb();
    }
  });
}

/**
 * Handle unbinding escape listener.
 * @method unbindOnEscape
 * @param {string} namespace Unique namespace for the listener
 * @return {undefined}
 */
export function unbindOnEscape(namespace) {
  $(document).unbind(`keydown.${namespace}`);
}

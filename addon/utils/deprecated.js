/**
 * @class Utils.Deprecated
 * @constructor
 */

/**
 * Simple utility for emitting consistent, standardized deprecation notices
 * for properties, methods, or other arbitrary parts of the radical component
 * API that are slated to be removed in the next major release.
 *
 * @method deprecated
 * @param {String} oldItem The name of the deprecated item (property/method/etc)
 * @param {String} newItem The name of the new preferred item
 * @param {String} nextVersion = '2.0' The next major release of the app in which the oldItem will be removed.
 * @return {undefined}
 */
export default function deprecated(oldItem, newItem, nextVersion = '3.0') {
  if (!oldItem || !newItem) {
    return
  }
  console.warn(
    `You referenced ${oldItem}, which is deprecated and will be unsupported in Ember Radical ${nextVersion}! Please use ${newItem} instead.`,
  )
}

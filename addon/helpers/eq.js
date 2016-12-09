import Ember from 'ember';

/**
 * Helper to compare two values to see if they are equal. Uses strict equal
 * comparison
 * @class Eq
 * @param {array} args Positional args passed to helper which should be compared
 * @returns {boolean}
 */
export function eq([arg1, arg2]) {
  return arg1 === arg2;
}

export default Ember.Helper.helper(eq);

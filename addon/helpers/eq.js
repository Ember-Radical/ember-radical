import { helper } from '@ember/component/helper';

/**
 * Helper to compare two values to see if they are equal. Uses strict equal
 * comparison
 * @class Eq
 * @param {array} args Positional args passed to helper which should be compared
 * @return {boolean}
 */
export function eq([arg1, arg2]) {
  return arg1 === arg2;
}

export default helper(eq);

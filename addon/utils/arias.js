/**
 * @class Utils.Arias
 * @constructor
 */

/**
 * Method or generating a unique string to use for binding aria-controls
 * attributes. Returns a prefix with elementID.
 * @method controls
 * @static
 * @return {string} Unique string for use with binding `aria-controls`
 */
export function controls() {
  return `cntrls-${this.get('elementId')}`;
}

/**
 * Method for generating a unique string to use for binding aria-describedby
 * attributes. Returns a prefix with elementID
 * @method describedby
 * @static
 * @return {string} Unique string for use with binding `aria-describedby`
 */
export function describedby() {
  return `dscbdy-${this.get('elementId')}`;
}

/**
 * Method for use with binding aria-expanded. Returns string of negated boolean
 * for hidden.
 * @method expanded
 * @static
 * @return {string} String of negated boolean hidden for expanded
 */
export function expanded() {
  return this.get('hidden') ? 'false' : 'true';
}

/**
 * Method for use with directly binding `aria-hidden` to a component which
 * requires a string boolean b/c Ember will remove the attribute if it is
 * boolean false.
 * @method hiddenForArias
 * @static
 * @return {string} String of boolean hidden
 */
export function hiddenForArias() {
  return this.get('hidden') ? 'true' : 'false';
}

/**
 * Method for generating a unique string to use for binding aria-labelledby
 * attributes. Returns prefix with elementID
 * @method labelledby
 * @static
 * @return {string} Unique string for use with binding `aria-labelledby`
 */
export function labelledby() {
  return `lbldy-${this.get('elementId')}`;
}

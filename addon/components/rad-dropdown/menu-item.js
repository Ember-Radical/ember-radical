import hbs from 'htmlbars-inline-precompile';
import RadButton from '../rad-button';

/**
 * Core dropdown menu item
 *
 * @class Component.RadDropdown.MenuItem
 * @constructor
 * @extends Ember.RadButton
 */
export default RadButton.extend({
  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Binds `dropdown-item` class
   * @property classNames
   * @type {Array}
   */
  classNames: ['dropdown-item'],
  /**
   * Override default click behavior and close the dropdown
   * @event click
   * @return {undefined}
   */
  click() {
    this._super();
    this.hide();
  },
  /**
   * Closure action that hides the dropdown
   * @property hide
   * @closure
   */
  hide: () => {},

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

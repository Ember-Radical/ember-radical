import hbs from 'htmlbars-inline-precompile';
import CoreButton from '../rad-button';

/**
 * Core dropdown menu item
 *
 * @class Component.RadDropdown.MenuItem
 * @constructor
 * @extends Ember.CoreButton
 */
export default CoreButton.extend({
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

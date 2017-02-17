import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

import { hiddenForArias } from '../../utils/arias';

/**
 * Core dropdown content component
 *
 * @class Component.RadDropdown.Content
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------
  /**
   * Adds `dropdown-menu` class which removes padding in order to show
   * dropdown menu items.
   * @property dropdownMenu
   * @type {Boolean}
   * @passed
   */
  dropdownMenu: false,

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * String representation of boolean state for `aria` attrs.
   * @property hiddenForArias
   * @type {string}
   * @param hidden
   */
  hiddenForArias: computed('hidden', hiddenForArias),

  // Ember Props
  // ---------------------------------------------------------------------------
  /**
   * Bind `aria-hidden` for A+ usability
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: [
    'hiddenForArias:aria-hidden',
    'aria-labelledby:aria-labelledby'
  ],
  /**
   * Bind `dropdown-content`
   * @property classNames
   * @type {Array}
   */
  classNames: ['dropdown-content'],
  /**
   * Binds `dropdown-menu` class if {{cross-link class="Component.RadDropdown.Content" item="dropdownMenu"}} is true
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['dropdownMenu:dropdown-menu'],

  // Events
  //----------------------------------------------------------------------------

  /**
   * Nasty touch eventses. Tricksy touch eventses. Any short touch event on this
   * content component will fire the focusOut and the mouseLeave on the
   * `rad-popover` element. Real abnoxious when you're trying to click something.
   * Fire the link or button manually. Through the wonderful power of JavaScript.
   *
   * @event touchEnd
   */
  touchEnd(evt) {
    if(evt.target.tagName === 'A' || evt.target.tagName === 'BUTTON') {
      evt.target.click();
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

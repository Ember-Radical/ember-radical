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
  /**
  /**
   * The position that the tooltip is created in relative to its anchor element. Combine "top" with "right" to get a top and right aligned menu.
   * Valid options are:
   * - `"left"`
   * - `"top"`
   * - `"right"`
   * - `"top right"`
   *
   * Defaults to `"left"` if no value is supplied. Passed in from parent.
   *
   * @property position
   * @type {string}
   * @passed
   * @default ''
   */
  position: '',

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
   * Binds `dropdown-menu` class if {{cross-link class="Component.RadDropdown.Content" item="dropdownMenu"}} is true. Also
   * binds the positional class to the container
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['dropdownMenu:dropdown-menu', 'position'],

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

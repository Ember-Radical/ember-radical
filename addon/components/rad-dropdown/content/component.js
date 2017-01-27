import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

import { hiddenForArias } from '../../../utils/arias';

/**
 * Core dropdown content component
 *
 * @class Component.RadDropdown.Content
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({
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
  attributeBindings: ['hiddenForArias:aria-hidden'],
  /**
   * Bind `dropdown-content`
   * @property classNames
   * @type {Array}
   */
  classNames: ['dropdown-content'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

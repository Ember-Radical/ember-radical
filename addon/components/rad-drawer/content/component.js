import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';
import {hiddenForArias} from '../../../utils/arias';

/**
 * Core drawer content component
 *
 * @class Component.RadDrawer.Content
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
   * Bind `data-test` attr to modified `dataTest` value
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['hiddenForArias:aria-hidden', 'dataTest:data-test'],
  /**
   * Bind `dropdown-content`
   * @property classNames
   * @type {Array}
   */
  classNames: ['drawer-content'],

  // Hooks
  // ---------------------------------------------------------------------------

  didReceiveAttrs() {
    let dataTest = this.get('data-test');
    if (dataTest) {
      this.set('dataTest', `${dataTest}-content`);
    }
  },

  init() {
    this._super(...arguments);

    if (!this.get('ariaId')) { return console.warn('Aria id required for drawer content'); }

    this.set('elementId', this.get('ariaId'));
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{yield}}`
});

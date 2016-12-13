import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * Component that can be used for tracking state changes with modals or drawers.
 * Wrap either in one of these and use the yielded state and actions to handle
 * showing/hiding your component.
 *
 * Useful mainly for demonstration/documentation purposes, but also handy for
 * when you don't have a convenient place to store state (particularly during
 * early development stages).
 *
 * Try not to use this for real-real in prod tho, ok?
 *
 * @class Component.CoreState
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Boolean state tracking property. Use this to handle show/hide status.
   * @property active
   * @type {Boolean}
   */
  active: false,

  // Actions
  // ---------------------------------------------------------------------------
  /**
   * Actions hash
   * @property actions
   * @type {Object}
   */
  actions: {
    /**
     * Sets the [active](#property_active) property to false.
     * @method closeModal
     */
    close() {
      this.set('active', false);
    },
    /**
     * Sets the [active](#property_active) property to true.
     * @method openModal
     * @return {undefined}
     */
    open() {
      this.set('active', true);
    },
    /**
     * Sets the [active](#property_active) property to passed state.
     * @method toggleState
     * @param {boolean} state State to set active to
     * @return {undefined}
     */
    toggleState() {
      this.toggleProperty('active');
    }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{yield (action 'open') (action 'close') active (action 'toggleState')}}`
});

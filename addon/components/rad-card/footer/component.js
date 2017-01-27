import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * @class Component.RadCard.Footer
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bind standard core class: `card-footer`
   * @property classNames
   * @type {Array}
   */
  classNames: ['card-footer'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * @class Component.CoreCard.Body
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bind standard core class: `card-body`
   * @property classNames
   * @type {Array}
   */
  classNames: ['card-body'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

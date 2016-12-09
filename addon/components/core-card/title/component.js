import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * @class Component.CoreCard.Title
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bind standard core class: `card-title`
   * @property classNames
   * @type {Array}
   */
  classNames: ['card-title'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

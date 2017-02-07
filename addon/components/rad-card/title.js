import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * @class Component.RadCard.Title
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Props
  // ---------------------------------------------------------------------------

  /**
   * Bind standard core class: `card-title`
   * @property cardTitleClassNames
   * @type {Array}
   */
  cardTitleClassNames: 'card-title',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bind props to classes on the root component element.
   * @property classNameBindings
   * @type {Array}
 */
  classNameBindings: ['cardTitleClassNames'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

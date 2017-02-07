import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * @class Component.RadCard.Footer
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Props
  // ---------------------------------------------------------------------------

  /**
   * Bind standard core class: `card-footer`
   * @property cardFooterClassNames
   * @type {Array}
   */
  cardFooterClassNames: 'card-footer',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bind props to classes on the root component element.
   * @property classNameBindings
   * @type {Array}
 */
  classNameBindings: ['cardFooterClassNames'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

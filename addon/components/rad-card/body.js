import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * @class Component.RadCard.Body
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Props
  // ---------------------------------------------------------------------------

  /**
   * Bind standard core class: `card-body`
   * @property cardBodyClassNames
   * @type {Array}
   */
  cardBodyClassNames: 'card-body',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Bound attributes:
   * - `data-test`: for precise testing identification
   * @property attributeBindings
   * @type {Array}
   */
  attributeBindings: ['data-test'],
  /**
   * Bind props to classes on the root component element.
   * @property classNameBindings
   * @type {Array}
  */
  classNameBindings: ['cardBodyClassNames'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`{{{yield}}}`
});

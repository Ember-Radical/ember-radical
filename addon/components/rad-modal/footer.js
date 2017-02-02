import Component from 'ember-component';
import hbs from 'htmlbars-inline-precompile';

/**
 * Simple wrapper for creating a modal footer.
 * @class Component.RadModal.Footer
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * @property classNames
   * @type {Array}
   * @default ['modal-footer']
   */
  classNames: ['modal-footer'],
  /**
   * @property tagName
   * @type {string}
   * @default 'footer'
   */
  tagName: 'footer',

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{yield}}
  `
});

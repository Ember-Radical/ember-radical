import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

/**
 * Core card.
 *
 * ```
 * {{#core-card as |components|}}
 *   {{#components.title}}Card title{{/components.title}}
 *   {{#components.body}}Card body{{/components.body}}
 *   {{#components.footer}}Card body{{/components.footer}}
 * {{/core-card}}
 * ```
 * @class Component.CoreCard
 * @constructor
 * @extends Ember.Component
 */
export default Ember.Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * Pass a core brand to use in conjunction with a Title
   * @property brand
   * @type {string}
   * @default ''
   */
  brand: '',

  // Properties
  // ---------------------------------------------------------------------------

  /**
   * Computed css class for the brand bound to the component.
   * @property brandClass
   * @type {Array}
   */
  brandClass: computed(function() {
    return `card-${this.get('brand') ? this.get('brand') : 'default'}`
  }),
  /**
   * Bind standard core class: `card-footer`
   * @property classNames
   * @type {Array}
   */
  classNames: ['core-card'],
  /**
   * Bind props to classes on the root component element.
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['brandClass'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{yield (hash
      title=(component 'core-card/title')
      body=(component 'core-card/body')
      footer=(component 'core-card/footer')
    )}}
  `
});

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
 *   {{#components.footer}}Card footer{{/components.footer}}
 * {{/core-card}}
 * ```
 * @class Component.CoreCard
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Passed Properties
  // ---------------------------------------------------------------------------

  /**
   * Pass a brand to use to style the component and it's child components.
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
   * @type {String}
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

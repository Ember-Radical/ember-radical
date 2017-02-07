import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

/**
 * Core card.
 *
 * ```handlebars
 * {{#rad-card as |components|}}
 *   {{#components.title}}Card title{{/components.title}}
 *   {{#components.body}}Card body{{/components.body}}
 *   {{#components.footer}}Card footer{{/components.footer}}
 * {{/rad-card}}
 * ```
 *
 * {{#rad-card as |components|}}
 *   {{#components.title}}Party Time{{/components.title}}
 *   {{#components.body}}<img src="http://i.giphy.com/125RIkH7IluIpy.gif"/>{{/components.body}}
 * {{/rad-card}}
 *
 * @class Component.RadCard
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
  /**
   * Custom className(s) to use on the body subcomponent's root element
   * @property cardBodyClassNames
   * @type {string}
   */
  cardBodyClassNames: 'card-body',
  /**
   * Custom className(s) to use on `rad-card`'s root element
   * @property cardClassNames
   * @type {string}
   */
  cardClassNames: '',
  /**
   * Custom className(s) to use on the footer subcomponent's root element
   * @property cardFooterClassNames
   * @type {string}
   */
  cardFooterClassNames: 'card-footer',
  /**
   * Custom className(s) to use on the title subcomponent's root element
   * @property cardTitleClassNames
   * @type {string}
   */
  cardTitleClassNames: 'card-title',

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
   * Computed css class for the brand bound to the component.
   * @property brandClass
   * @type {String}
   */
  brandClass: computed(function() {
    return `card-${this.get('brand') ? this.get('brand') : 'default'}`;
  }),
  /**
   * Bind standard core class: `card-footer`
   * @property classNames
   * @type {Array}
   */
  classNames: ['rad-card'],
  /**
   * Bind props to classes on the root component element.
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['brandClass', 'cardClassNames'],

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{yield (hash
      title=(component 'rad-card/title'
        cardTitleClassNames=cardTitleClassNames)
      body=(component 'rad-card/body'
        cardBodyClassNames=cardBodyClassNames)
      footer=(component 'rad-card/footer'
        cardFooterClassNames=cardFooterClassNames)
    )}}
  `
});

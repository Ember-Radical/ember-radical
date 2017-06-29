import Component from 'ember-component';
import computed from 'ember-computed';
import hbs from 'htmlbars-inline-precompile';

import deprecated from '../utils/deprecated';

/**
 * Core card.
 *
 * ```handlebars
 * {{#rad-card as |components|}}
 *   {{#components.block}}
 *     {{#components.title}}Card title{{/components.title}}
 *     Card body
 *   {{/components.block}}
 *   {{#components.footer}}Card footer{{/components.footer}}
 * {{/rad-card}}
 * ```
 *
 * {{#rad-card as |components|}}
 *   {{#components.block}}
 *     {{#components.title}}Party Time{{/components.title}}
 *     <img src="http://i.giphy.com/125RIkH7IluIpy.gif"/>
 *   {{/components.block}}
 * {{/rad-card}}
 *
 * @class Component.RadCard
 * @constructor
 * @extends Ember.Component
 */
export default Component.extend({

  // Props
  // ---------------------------------------------------------------------------
  /**
   * Pass a brand to use to style the component and it's child components.
   * @property brand
   * @type {string}
   * @default ''
   */
  brand: '',

  // Default Component References
  // ---------------------------------------------------------------------------
  /**
   * @property blockComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-classnamed'
   */
  blockComponent: 'rad-classnamed',
  /**
   * @property bodyComponent
   * @deprecated
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-classnamed'
   */
  bodyComponent: 'rad-classnamed',
  /**
   * @property footerComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-classnamed'
   */
  footerComponent: 'rad-classnamed',
  /**
   * @property headerComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-classnamed'
   */
  headerComponent: 'rad-classnamed',
  /**
   * @property titleComponent
   * @type {string}
   * @passed
   * @optional
   * @default 'rad-classnamed'
   */
  titleComponent: 'rad-classnamed',

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * @property attributeBindings
   * @type {Array}
   * @default 'data-test'
   */
  attributeBindings: ['data-test'],
  /**
   * Computed css class for the brand bound to the component.
   * TODO: v2 remove card-default
   * @property brandClass
   * @type {String}
   */
  brandClass: computed(function() {
    return this.get('brand') ? `card-${this.get('brand')}` : 'card-default';
  }),
  /**
   * @property classNames
   * @type {Array}
   * @default 'card rad-card'
   */
  classNames: ['card', 'rad-card'],
  /**
   * Bind props to classes on the root component element.
   * @property classNameBindings
   * @type {Array}
   */
  classNameBindings: ['brandClass'],

  // Hooks
  // ---------------------------------------------------------------------------
  init() {
    this._super(...arguments);
    if (this.get('cardClassNames')) { deprecated('cardClassNames', 'classNames directly on the component'); }
    if (this.get('cardBodyClassNames')) { deprecated('cardBodyClassNames', 'classNames directly on the component'); }
    if (this.get('cardFooterClassNames')) { deprecated('cardFooterClassNames', 'classNames directly on the component'); }
    if (this.get('cardTitleClassNames')) { deprecated('cardTitleClassNames', 'classNames directly on the component'); }
  },

  // Layout
  // ---------------------------------------------------------------------------
  layout: hbs`
    {{! TODO: make title an h4 by default in v2, old titles should actually be
        headers in v2 }}
    {{yield (hash
      block=(component blockComponent
        _classNames='card-block'
        data-test=(if data-test (concat data-test '-block')))
      body=(component bodyComponent
        _classNames='card-block card-body'
        class=cardBodyClassNames
        data-test=(if data-test (concat data-test '-body')))
      footer=(component footerComponent
        _classNames='card-footer'
        class=cardFooterClassNames
        data-test=(if data-test (concat data-test '-footer')))
      header=(component headerComponent
        _classNames='card-header'
        data-test=(if data-test (concat data-test '-header')))
      title=(component titleComponent
        _classNames='card-title'
        class=cardTitleClassNames
        tagName='div'
        data-test=(if data-test (concat data-test '-title')))
    )}}
  `
});
